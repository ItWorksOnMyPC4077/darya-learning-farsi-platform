(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const faDigits = value => String(value).replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);
  const parseStored = (key, fallback) => {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : fallback;
    } catch (error) {
      return fallback;
    }
  };
  const store = (key, value) => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (error) { /* storage may be blocked */ }
  };
  const storeText = (key, value) => {
    try { localStorage.setItem(key, value); } catch (error) { /* storage may be blocked */ }
  };
  const getText = key => {
    try { return localStorage.getItem(key) || ''; } catch (error) { return ''; }
  };

  const localDateKey = (date = new Date()) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  let activityData = parseStored('darya-activity', {});
  if (!activityData || typeof activityData !== 'object' || Array.isArray(activityData)) activityData = {};
 let renderActivity = () => {};
  let renderProgress = () => {};
  const trackActivity = (kind = 'activity') => {
    const key = localDateKey();
    const entry = activityData[key] && typeof activityData[key] === 'object' ? activityData[key] : { count: 0, actions: [] };
    entry.count = Math.min(9, Number(entry.count || 0) + 1);
    entry.actions = Array.from(new Set([...(Array.isArray(entry.actions) ? entry.actions : []), kind])).slice(-8);
    activityData[key] = entry;
    store('darya-activity', activityData);
    const progress = parseStored('daryaProgress', {});
    if (progress && typeof progress === 'object') {
      progress.lastActivity = new Date().toISOString();
      store('daryaProgress', progress);
    }
   renderActivity();
    renderProgress();
 };
  window.daryaTrackActivity = trackActivity;

  const body = document.body;
  const themeButton = $('#globalThemeToggle');
  if (getText('darya-theme') === 'dark') body.classList.add('dark');
  themeButton?.addEventListener('click', () => {
    body.classList.toggle('dark');
    storeText('darya-theme', body.classList.contains('dark') ? 'dark' : 'light');
  });

  // Profile and placement result ------------------------------------------------
  const profileValue = parseStored('darya-student', {});
  const profileName = typeof profileValue === 'string' ? profileValue : (profileValue.name || '');
  const firstName = profileName.trim().split(/\s+/)[0] || 'زبان‌آموز';
  $('#studentName').textContent = firstName;
  const placement = parseStored('darya-placement-result', null);
  const placementText = $('#placementText');
  const placementAction = $('#placementAction');
  if (placement && placement.level) {
    const level = String(placement.level).toUpperCase();
    const recommendation = placement.recommendation || placement.courseName || 'مسیر مکالمهٔ داریا';
    placementText.textContent = `${firstName} عزیز، طبق آزمون اخیر، سطح شما ${level} تشخیص داده شد. دوره پیشنهاد شده: ${recommendation}.`;
    placementAction.href = placement.course ? `course-details.html?course=${encodeURIComponent(placement.course)}` : '#learning';
    placementAction.innerHTML = 'مشاهده مسیر پیشنهادی <span>↗</span>';
  }

  // Custom video placeholder ----------------------------------------------------
  const videoStage = $('#videoStage');
  const videoPlayButton = $('#videoPlayButton');
  const videoPlayIcon = $('#videoPlayIcon');
  const videoLiveStatus = $('#videoLiveStatus');
  const lessonClock = $('#lessonClock');
  const noteTimestamp = $('#noteTimestamp');
  let videoSeconds = Number(getText('darya-video-time')) || (12 * 60 + 34);
  let videoSpeed = Number(getText('darya-video-speed')) || 1;
  let videoPlaying = false;
  let videoTotalSeconds = Number(getText('darya-video-total')) || 0;

  const formatClock = seconds => {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    const minutes = Math.floor(safeSeconds / 60);
    const remainder = String(safeSeconds % 60).padStart(2, '0');
    return `${faDigits(String(minutes).padStart(2, '0'))}:${faDigits(remainder)}`;
  };
  const updateVideoClock = () => {
    const formatted = formatClock(videoSeconds);
    lessonClock.textContent = formatted;
    noteTimestamp.textContent = formatted;
  };
  const setVideoPlaying = playing => {
    videoPlaying = playing;
    videoStage.classList.toggle('is-active', playing);
    videoPlayIcon.textContent = playing ? 'Ⅱ' : '▶';
    videoLiveStatus.textContent = playing ? `در حال پخش · ${videoSpeed}×` : 'آمادهٔ پخش';
    videoPlayButton.setAttribute('aria-label', playing ? 'توقف پیش‌نمایش ویدیو' : 'پخش پیش‌نمایش ویدیو');
  };
  videoPlayButton.addEventListener('click', () => {
    setVideoPlaying(!videoPlaying);
    if (videoPlaying) trackActivity('video-play');
  });
  videoStage.addEventListener('click', event => {
    if (!event.target.closest('button')) videoStage.classList.add('is-revealed');
  });
  setInterval(() => {
    if (!videoPlaying) return;
    videoSeconds += videoSpeed;
    videoTotalSeconds += videoSpeed;
    if (videoSeconds > (24 * 60 + 59)) videoSeconds = 0;
    updateVideoClock();
    if (Math.round(videoSeconds) % 5 === 0) storeText('darya-video-time', String(Math.round(videoSeconds)));
   storeText('darya-video-total', String(Math.round(videoTotalSeconds)));
    renderProgress();
 }, 1000);
  updateVideoClock();

  $$('#speedButtons button').forEach(button => {
    if (Number(button.dataset.speed) === videoSpeed) button.classList.add('is-selected');
    button.addEventListener('click', () => {
      $$('#speedButtons button').forEach(item => item.classList.remove('is-selected'));
      button.classList.add('is-selected');
      videoSpeed = Number(button.dataset.speed);
      storeText('darya-video-speed', String(videoSpeed));
      if (videoPlaying) videoLiveStatus.textContent = `در حال پخش · ${videoSpeed}×`;
    });
  });

  const videoModeButton = $('#videoModeButton');
  if (getText('darya-video-mode') === 'day') videoStage.classList.add('video-day-mode');
  const updateVideoModeLabel = () => {
    const isDay = videoStage.classList.contains('video-day-mode');
    videoModeButton.innerHTML = `<span aria-hidden="true">${isDay ? '◐' : '☼'}</span> ${isDay ? 'تغییر به حالت شب ویدیو' : 'تغییر به حالت روز ویدیو'}`;
    videoModeButton.setAttribute('aria-pressed', String(isDay));
  };
  videoModeButton.addEventListener('click', () => {
    videoStage.classList.toggle('video-day-mode');
    storeText('darya-video-mode', videoStage.classList.contains('video-day-mode') ? 'day' : 'night');
    updateVideoModeLabel();
  });
  updateVideoModeLabel();

  // Timestamp notes -------------------------------------------------------------
  const noteInput = $('#noteInput');
  const saveNoteButton = $('#saveNoteButton');
  const notesList = $('#notesList');
  let notes = parseStored('darya-timestamp-notes', []);
  if (!Array.isArray(notes)) notes = [];
  const renderNotes = () => {
    notesList.replaceChildren();
    notes.slice().sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)).forEach(note => {
      const item = document.createElement('li');
      item.className = 'note-item';
      const time = document.createElement('span');
      time.className = 'note-item-time';
      time.textContent = formatClock(note.time);
      const text = document.createElement('span');
      text.className = 'note-item-text';
      text.textContent = note.text;
      const remove = document.createElement('button');
      remove.className = 'note-delete';
      remove.type = 'button';
      remove.setAttribute('aria-label', 'حذف یادداشت');
      remove.textContent = '×';
      remove.addEventListener('click', () => {
        notes = notes.filter(entry => entry.id !== note.id);
        store('darya-timestamp-notes', notes);
        renderNotes();
      });
      item.append(time, text, remove);
      notesList.append(item);
    });
  };
  const saveNote = () => {
    const text = noteInput.value.trim();
    if (text.length < 2) {
      noteInput.focus();
      return;
    }
    notes.push({ id: `${Date.now()}-${Math.random().toString(16).slice(2)}`, text, time: Math.floor(videoSeconds), createdAt: Date.now() });
    store('darya-timestamp-notes', notes);
    trackActivity('note');
    noteInput.value = '';
    renderNotes();
  };
  saveNoteButton.addEventListener('click', saveNote);
  noteInput.addEventListener('keydown', event => {
    if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') saveNote();
  });
  renderNotes();

  // Flashcards and Leitner algorithm -------------------------------------------
  const defaultCards = [
    { id: 'resilient', word: 'resilient', meaning: 'تاب‌آور، انعطاف‌پذیر', example: 'She is resilient and learns from every challenge.', translation: 'او تاب‌آور است و از هر چالش یاد می‌گیرد.' },
    { id: 'articulate', word: 'articulate', meaning: 'شیوا و روشن صحبت کردن', example: 'He can articulate his ideas with confidence.', translation: 'او می‌تواند ایده‌هایش را با اعتمادبه‌نفس و روشن بیان کند.' },
    { id: 'nuance', word: 'nuance', meaning: 'تفاوت ظریف، نکتهٔ دقیق', example: 'The right tone can change the nuance of a sentence.', translation: 'لحن مناسب می‌تواند نکتهٔ ظریف یک جمله را تغییر دهد.' },
    { id: 'spontaneous', word: 'spontaneous', meaning: 'بداهه، خودجوش', example: 'Try a spontaneous answer instead of translating first.', translation: 'به‌جای ترجمهٔ قبلی، یک پاسخ خودجوش را امتحان کن.' }
  ];
  let customCards = parseStored('darya-custom-flashcards', []);
  if (!Array.isArray(customCards)) customCards = [];
  customCards = customCards.filter(card => card && card.id && card.word && card.meaning && card.example).map(card => ({ ...card, translation: card.translation || 'مثال اختصاصی تو' }));
  let cards = [...defaultCards, ...customCards];
  const flashcard = $('#flashcard');
  const cardWord = $('#cardWord');
  const cardMeaning = $('#cardMeaning');
  const cardExample = $('#cardExample');
  const cardTranslation = $('#cardTranslation');
  const cardCount = $('#cardCount');
  const cardBoxLabel = $('#cardBoxLabel');
  const cardBoxLabelBack = $('#cardBoxLabelBack');
  const leitnerBoxes = $('#leitnerBoxes');
  const leitnerDescription = $('#leitnerDescription');
  const knownWordsCount = $('#knownWordsCount');
  const speakCardButton = $('#speakCardButton');
  let cardIndex = 0;
  let leitnerState = parseStored('darya-leitner', {});
  if (!leitnerState || typeof leitnerState !== 'object' || Array.isArray(leitnerState)) leitnerState = {};
  const currentCard = () => cards[cardIndex];
  const cardKey = card => card.id || card.word;
  const currentState = () => {
    const card = currentCard();
    const key = cardKey(card);
    if (!leitnerState[key]) leitnerState[key] = { box: 1, reviews: 0, lastReviewed: null };
    return leitnerState[key];
  };
  const boxLabel = box => `جعبه ${faDigits(box)}`;
  const renderLeitnerBoxes = box => {
    leitnerBoxes.replaceChildren();
    for (let index = 1; index <= 5; index += 1) {
      const item = document.createElement('span');
      item.className = `leitner-box${index === box ? ' is-current' : ''}${index < box ? ' is-done' : ''}`;
      item.textContent = faDigits(index);
      item.setAttribute('aria-label', boxLabel(index));
      leitnerBoxes.append(item);
    }
  };
  const renderCard = () => {
    const card = currentCard();
    const state = currentState();
    flashcard.classList.remove('is-flipped');
    flashcard.setAttribute('aria-pressed', 'false');
    cardWord.textContent = card.word;
    cardMeaning.textContent = card.meaning;
    cardExample.textContent = card.example;
    cardTranslation.textContent = card.translation;
    cardCount.textContent = `${faDigits(cardIndex + 1)} از ${faDigits(cards.length)}`;
    cardBoxLabel.textContent = boxLabel(state.box);
    cardBoxLabelBack.textContent = boxLabel(state.box);
    leitnerDescription.textContent = state.box >= 5
      ? 'آفرین، این واژه به جعبهٔ پنجم رسیده و فاصلهٔ مرورش طولانی‌تر است.'
      : `این کارت در ${boxLabel(state.box)} است؛ پاسخ «بلدم» آن را یک مرحله جلو می‌برد.`;
    const stableCount = cards.filter(card => leitnerState[cardKey(card)] && leitnerState[cardKey(card)].box >= 4).length;
    knownWordsCount.textContent = faDigits(stableCount);
    renderLeitnerBoxes(state.box);
  };
  const flipCard = () => {
    flashcard.classList.toggle('is-flipped');
    flashcard.setAttribute('aria-pressed', String(flashcard.classList.contains('is-flipped')));
  };
  flashcard.addEventListener('click', event => {
    if (event.target.closest('button')) return;
    flipCard();
  });
  flashcard.addEventListener('keydown', event => {
    if (event.code === 'Space' || event.key === 'Enter') {
      event.preventDefault();
      flipCard();
    }
  });
  const moveToNextCard = () => {
    cardIndex = (cardIndex + 1) % cards.length;
    renderCard();
  };
  $('#reviewCardButton').addEventListener('click', () => {
    const state = currentState();
    state.box = 1;
    state.reviews = (state.reviews || 0) + 1;
    state.lastReviewed = new Date().toISOString();
    store('darya-leitner', leitnerState);
    trackActivity('leitner-review');
    moveToNextCard();
  });
  $('#knowCardButton').addEventListener('click', () => {
    const state = currentState();
    state.box = Math.min(5, (state.box || 1) + 1);
    state.reviews = (state.reviews || 0) + 1;
    state.lastReviewed = new Date().toISOString();
    store('darya-leitner', leitnerState);
    trackActivity('leitner-known');
    moveToNextCard();
  });
  speakCardButton.addEventListener('click', event => {
    event.stopPropagation();
    if (!('speechSynthesis' in window)) {
      speakCardButton.setAttribute('aria-label', 'تلفظ در این مرورگر در دسترس نیست');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentCard().word);
    utterance.lang = 'en-US';
    utterance.rate = .86;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  });
  renderCard();

  // Custom flashcards -----------------------------------------------------------
  const customCardForm = $('#customCardForm');
  if (customCardForm) {
    const customWord = $('#customWord');
    const customMeaning = $('#customMeaning');
    const customExample = $('#customExample');
    const customCardStatus = $('#customCardStatus');
    customCardForm.addEventListener('submit', event => {
      event.preventDefault();
      const word = customWord.value.trim();
      const meaning = customMeaning.value.trim();
      const example = customExample.value.trim();
      if (word.length < 2 || meaning.length < 2 || example.length < 5) {
        customCardStatus.textContent = 'کلمه، معنی و مثال را کامل وارد کن.';
        return;
      }
      if (customCards.some(card => card.word.toLowerCase() === word.toLowerCase())) {
        customCardStatus.textContent = 'این کلمه قبلاً در جعبهٔ تو هست.';
        return;
      }
      const newCard = { id: `custom-${Date.now()}`, word, meaning, example, translation: 'مثال اختصاصی تو', createdAt: new Date().toISOString() };
      customCards.push(newCard);
      cards = [...defaultCards, ...customCards];
      store('darya-custom-flashcards', customCards);
      cardIndex = cards.length - 1;
      renderCard();
      customCardForm.reset();
      customCardStatus.textContent = `«${word}» به جعبهٔ لایتنر اضافه شد.`;
      trackActivity('flashcard-add');
    });
  }

  // Simulated audio practice with clickable transcript -------------------------
  const transcriptWords = [
    ['When', 0, 1.1], ['you', 1.1, 1.8], ['speak', 1.8, 2.9], ['a', 2.9, 3.3], ['little', 3.3, 4.4], ['every', 4.4, 5.3], ['day,', 5.3, 6.5], ['your', 6.5, 7.2], ['confidence', 7.2, 8.9], ['grows.', 8.9, 10.2], ['Do', 10.2, 11], ['not', 11, 11.7], ['wait', 11.7, 12.6], ['for', 12.6, 13.1], ['perfect', 13.1, 14.3], ['grammar.', 14.3, 15.8], ['Take', 15.8, 16.6], ['a', 16.6, 17], ['breath,', 17, 18], ['choose', 18, 19], ['simple', 19, 20], ['words,', 20, 21.1], ['and', 21.1, 21.8], ['keep', 21.8, 22.8], ['the', 22.8, 23.2], ['conversation', 23.2, 25], ['moving.', 25, 27]
  ];
  const transcriptText = $('#transcriptText');
  transcriptWords.forEach(([word, start, end], index) => {
    const span = document.createElement('span');
    span.className = 'transcript-word';
    span.textContent = word;
    span.dataset.index = String(index);
    span.dataset.start = String(start);
    span.dataset.end = String(end);
    span.tabIndex = 0;
    span.setAttribute('role', 'button');
    span.addEventListener('click', () => { audioTime = start; updateAudioDisplay(true); });
    span.addEventListener('keydown', event => {
      if (event.key === 'Enter' || event.code === 'Space') { event.preventDefault(); audioTime = start; updateAudioDisplay(true); }
    });
    transcriptText.append(span);
    if (index < transcriptWords.length - 1) transcriptText.append(document.createTextNode(' '));
  });
  const audioPlayer = $('#audioPlayer');
  const audioPlayButton = $('#audioPlayButton');
  const audioPlayIcon = $('#audioPlayIcon');
  const audioTimeline = $('#audioTimeline');
  const audioCurrent = $('#audioCurrent');
  let audioTime = 0;
  let audioPlaying = false;
  let activeTranscriptIndex = -1;
  const formatAudioTime = seconds => `${faDigits(Math.floor(seconds / 60))}:${faDigits(String(Math.floor(seconds % 60)).padStart(2, '0'))}`;
  const updateAudioDisplay = shouldScroll => {
    const safeTime = Math.max(0, Math.min(32, audioTime));
    audioTime = safeTime;
    audioTimeline.value = String(safeTime);
    audioCurrent.textContent = formatAudioTime(safeTime);
    let nextIndex = transcriptWords.findIndex(([, start, end]) => safeTime >= start && safeTime < end);
    if (nextIndex < 0 && safeTime >= transcriptWords[transcriptWords.length - 1][1]) nextIndex = transcriptWords.length - 1;
    if (nextIndex !== activeTranscriptIndex) {
      $$('.transcript-word').forEach(word => { word.classList.remove('is-active'); word.removeAttribute('aria-current'); });
      const activeWord = $(`.transcript-word[data-index="${nextIndex}"]`);
      if (activeWord) {
        activeWord.classList.add('is-active');
        activeWord.setAttribute('aria-current', 'true');
        if (shouldScroll) activeWord.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'nearest' });
      }
      activeTranscriptIndex = nextIndex;
    }
  };
  const setAudioPlaying = playing => {
    audioPlaying = playing;
    audioPlayer.classList.toggle('is-playing', playing);
    audioPlayIcon.textContent = playing ? 'Ⅱ' : '▶';
    audioPlayButton.setAttribute('aria-label', playing ? 'توقف تمرین صوتی' : 'پخش تمرین صوتی');
  };
  audioPlayButton.addEventListener('click', () => {
    if (!audioPlaying && audioTime >= 32) audioTime = 0;
    setAudioPlaying(!audioPlaying);
    updateAudioDisplay(false);
    if (audioPlaying) trackActivity('audio-play');
  });
  audioTimeline.addEventListener('input', () => { audioTime = Number(audioTimeline.value); updateAudioDisplay(true); });
  setInterval(() => {
    if (!audioPlaying) return;
    audioTime += .25;
    if (audioTime >= 32) { audioTime = 32; setAudioPlaying(false); }
    updateAudioDisplay(false);
  }, 250);
  updateAudioDisplay(false);

  // Canvas certificate generator -----------------------------------------------
  const canvas = $('#certificateCanvas');
  const ctx = canvas.getContext('2d');
  const certificateName = $('#certificateName');
  const generateCertificateButton = $('#generateCertificateButton');
  const downloadPngButton = $('#downloadPngButton');
  const downloadPdfButton = $('#downloadPdfButton');
  const savedCertificateName = getText('darya-certificate-name') || profileName;
  if (savedCertificateName) certificateName.value = savedCertificateName;
  let certificateReady = false;
  const certificateDate = () => {
    try {
      return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date());
    } catch (error) {
      return new Date().toLocaleDateString('fa-IR');
    }
  };
  const drawCertificate = name => {
    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = '#fffaf0';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#101a3c';
    ctx.lineWidth = 12;
    ctx.strokeRect(34, 34, width - 68, height - 68);
    ctx.strokeStyle = '#f4773d';
    ctx.lineWidth = 3;
    ctx.strokeRect(55, 55, width - 110, height - 110);
    ctx.fillStyle = '#f4c96b';
    ctx.globalAlpha = .28;
    ctx.beginPath(); ctx.arc(126, 130, 115, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(width - 130, height - 115, 145, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    ctx.strokeStyle = '#f4773d';
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.arc(width / 2, 115, 34, Math.PI * .1, Math.PI * .9); ctx.stroke();
    ctx.direction = 'rtl';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#101a3c';
    ctx.font = '800 54px Estedad, Arial, sans-serif';
    ctx.fillText('داریا', width / 2, 150);
    ctx.fillStyle = '#f4773d';
    ctx.font = '700 18px Arial, sans-serif';
    ctx.letterSpacing = '5px';
    ctx.fillText('D A R Y A  ·  LANGUAGE STUDIO', width / 2, 196);
    ctx.letterSpacing = '0px';
    ctx.fillStyle = '#65708c';
    ctx.font = '400 28px Estedad, Arial, sans-serif';
    ctx.fillText('گواهی‌نامهٔ پایان مسیر آموزشی', width / 2, 345);
    ctx.fillStyle = '#101a3c';
    ctx.font = '800 70px Estedad, Arial, sans-serif';
    ctx.fillText(name || 'زبان‌آموز داریا', width / 2, 490);
    ctx.strokeStyle = '#f4c96b';
    ctx.lineWidth = 5;
    ctx.beginPath(); ctx.moveTo(width / 2 - 270, 525); ctx.lineTo(width / 2 + 270, 525); ctx.stroke();
    ctx.fillStyle = '#65708c';
    ctx.font = '400 25px Estedad, Arial, sans-serif';
    ctx.fillText('با پشتکار در تمرین مکالمه و مهارت‌های ارتباطی داریا', width / 2, 590);
    ctx.font = '400 22px Estedad, Arial, sans-serif';
    ctx.fillText(`تاریخ صدور: ${certificateDate()}`, width / 2, 700);
    ctx.fillStyle = '#101a3c';
    ctx.font = '700 23px Estedad, Arial, sans-serif';
    ctx.fillText('مدرس داریا', 360, 820);
    ctx.fillText('داریا · زبان را زندگی کن', width - 360, 820);
    ctx.strokeStyle = '#dfe5ef';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(220, 835); ctx.lineTo(500, 835); ctx.moveTo(width - 500, 835); ctx.lineTo(width - 220, 835); ctx.stroke();
    certificateReady = true;
    downloadPngButton.disabled = false;
    downloadPdfButton.disabled = false;
  };
  const currentCertificateName = () => certificateName.value.trim();
  generateCertificateButton.addEventListener('click', () => {
    const name = currentCertificateName();
    if (!name) { certificateName.focus(); return; }
    storeText('darya-certificate-name', name);
    drawCertificate(name);
    generateCertificateButton.innerHTML = 'گواهی‌نامه ساخته شد <span>✓</span>';
    window.setTimeout(() => { generateCertificateButton.innerHTML = 'ساخت گواهی‌نامه <span>✦</span>'; }, 1800);
  });
  certificateName.addEventListener('input', () => {
    if (!certificateReady) return;
    if (currentCertificateName()) drawCertificate(currentCertificateName());
    else { certificateReady = false; downloadPngButton.disabled = true; downloadPdfButton.disabled = true; }
  });
  const fileStem = () => (currentCertificateName() || 'darya-certificate').replace(/[^\w\u0600-\u06FF-]+/g, '-').replace(/^-|-$/g, '').slice(0, 48) || 'darya-certificate';
  downloadPngButton.addEventListener('click', () => {
    if (!certificateReady) return;
    const link = document.createElement('a');
    link.download = `${fileStem()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  });
  downloadPdfButton.addEventListener('click', () => {
    if (!certificateReady) return;
    const image = canvas.toDataURL('image/jpeg', .95);
    if (window.jspdf && window.jspdf.jsPDF) {
      const pdf = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      pdf.addImage(image, 'JPEG', 0, 0, 297, 210);
      pdf.save(`${fileStem()}.pdf`);
      return;
    }
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;
    printWindow.document.write(`<html lang="fa" dir="rtl"><head><title>گواهی‌نامه داریا</title><style>html,body{margin:0;background:#fff}img{display:block;width:100%;height:auto}</style></head><body><img src="${image}" alt="گواهی‌نامه داریا"></body></html>`);
    printWindow.document.close();
    printWindow.focus();
    window.setTimeout(() => printWindow.print(), 450);
  });
  if (savedCertificateName) {
    drawCertificate(savedCertificateName);
  } else {
    drawCertificate('زبان‌آموز داریا');
    certificateReady = false;
    downloadPngButton.disabled = true;
    downloadPdfButton.disabled = true;
  }

  // Activity heatmap and streak ------------------------------------------------
  const activityGrid = $('#activityGrid');
  const activityTotal = $('#activityTotal');
  const activityRange = $('#activityRange');
  const activitySummaryTitle = $('#activitySummaryTitle');
  const activitySummaryText = $('#activitySummaryText');
  const activityCount = $('#activityCount');
  const activityActions = $('#activityActions');
  const streakDays = $('#streakDays');
  const streakCaption = $('#streakCaption');
  const activityDateLabel = date => {
    try {
      return new Intl.DateTimeFormat('fa-IR', { month: 'short', day: 'numeric' }).format(date);
    } catch (error) {
      return localDateKey(date);
    }
  };
  const activityEntry = key => {
    const entry = activityData[key];
    if (!entry || typeof entry !== 'object') return { count: 0, actions: [] };
    return { count: Math.max(0, Number(entry.count) || 0), actions: Array.isArray(entry.actions) ? entry.actions : [] };
  };
  const activityLevel = count => count <= 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count <= 4 ? 3 : 4;
  renderActivity = () => {
    if (!activityGrid) return;
    activityGrid.replaceChildren();
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    let activeDays = 0;
    let actionTotal = 0;
    for (let offset = 69; offset >= 0; offset -= 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      const key = localDateKey(date);
      const entry = activityEntry(key);
      if (entry.count > 0) activeDays += 1;
      actionTotal += entry.count;
      const cell = document.createElement('span');
      cell.className = 'activity-cell level-' + activityLevel(entry.count);
      cell.setAttribute('role', 'gridcell');
      cell.setAttribute('aria-label', activityDateLabel(date) + ': ' + faDigits(entry.count) + ' فعالیت');
      cell.title = activityDateLabel(date) + ' · ' + faDigits(entry.count) + ' فعالیت';
      activityGrid.append(cell);
    }
    let streak = 0;
    for (let offset = 0; offset < 70; offset += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() - offset);
      if (activityEntry(localDateKey(date)).count > 0) streak += 1;
      else break;
    }
    if (streakDays) streakDays.textContent = faDigits(streak) + ' روز';
    if (streakCaption) streakCaption.textContent = streak > 1 ? 'رکورد تمرین پیوسته' : streak === 1 ? 'امروز هم ثبت شد' : 'امروز شروع کن';
    if (activityRange) activityRange.textContent = faDigits(70) + ' روز اخیر';
    if (activityTotal) activityTotal.textContent = faDigits(activeDays) + ' روز فعال';
    if (activityCount) activityCount.textContent = faDigits(activeDays);
    if (activityActions) activityActions.textContent = faDigits(actionTotal);
    if (activitySummaryTitle) {
      activitySummaryTitle.textContent = streak > 1
        ? faDigits(streak) + ' روز است که ادامه می‌دهی!'
        : streak === 1
          ? 'امروز را به زنجیره‌ات اضافه کردی.'
          : 'امروز را به زنجیره‌ات اضافه کن.';
    }
    if (activitySummaryText) {
      activitySummaryText.textContent = actionTotal
        ? 'هر فعالیت کوچک ثبت شده؛ همین ریتم آرام، پیشرفت ماندگار می‌سازد.'
        : 'هر یادداشت، مرور لغت، ضبط صدا یا پیام چت یک خانه از این تقویم را روشن می‌کند.';
    }
  };
  const progressValues = { overall: $('#overallProgressValue'), conversation: $('#conversationProgressValue'), grammar: $('#grammarProgressValue'), audio: $('#audioProgressValue') };
  const progressCopies = { overall: $('#overallProgressCopy'), conversation: $('#conversationProgressCopy'), grammar: $('#grammarProgressCopy'), audio: $('#audioProgressCopy') };
  const progressPercent = value => Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
  const countActivityActions = kind => Object.values(activityData).reduce((total, entry) => total + (entry && Array.isArray(entry.actions) && entry.actions.includes(kind) ? 1 : 0), 0);
  const renderProgressCards = () => {
    const storedVideoSeconds = Number(getText('darya-video-total')) || 0;
    const videoSeconds = Math.max(videoTotalSeconds, storedVideoSeconds);
    const noteCount = Array.isArray(notes) ? notes.length : 0;
    const reviewCount = countActivityActions('leitner-review') + countActivityActions('leitner-known');
    const chatCount = countActivityActions('chat');
    const audioCount = countActivityActions('audio-play') + countActivityActions('speech-record');
    const conversation = progressPercent((videoSeconds / (15 * 60)) * 70 + Math.min(30, chatCount * 10));
    const grammar = progressPercent(((noteCount * 2 + reviewCount) / 12) * 100);
    const audio = progressPercent((audioCount / 8) * 100);
    const overall = progressPercent((conversation + grammar + audio) / 3);
    const values = { overall, conversation, grammar, audio };
    Object.keys(values).forEach(key => {
      const ring = document.querySelector('.progress-ring[data-progress-key="' + key + '"]');
      if (ring) ring.style.setProperty('--progress', values[key] + '%');
      if (progressValues[key]) progressValues[key].textContent = faDigits(values[key]) + '٪';
    });
    if (progressCopies.overall) progressCopies.overall.textContent = overall ? 'با ثبت فعالیت‌های بیشتر، این درصد زنده به‌روز می‌شود.' : 'فعالیت‌های تو هنوز ثبت نشده‌اند؛ با یک تمرین کوتاه شروع کن.';
    if (progressCopies.conversation) progressCopies.conversation.textContent = faDigits(conversation) + '٪ بر اساس زمان ویدیو و تمرین چت';
    if (progressCopies.grammar) progressCopies.grammar.textContent = faDigits(grammar) + '٪ بر اساس یادداشت‌ها و مرور واژه‌ها';
    if (progressCopies.audio) progressCopies.audio.textContent = faDigits(audio) + '٪ بر اساس تمرین صوتی و ضبط تلفظ';
  };
  renderProgress = renderProgressCards;
  renderProgressCards();
  trackActivity('visit');

  // Client-side pronunciation recorder ----------------------------------------
  const recStatus = $('#recStatus');
  const playbackEl = $('#playback');
  const startRecButton = $('#startRecBtn');
  const stopRecButton = $('#stopRecBtn');
  const deleteClipButton = $('#deleteClipBtn');
  const recTimer = $('#recTimer');
  const recordingProgressBar = $('#recordingProgressBar');
  let mediaRecorder = null;
  let mediaStream = null;
  let recordingChunks = [];
  let recordingUrl = '';
  let recordingStartedAt = 0;
  let recordingTimer = null;
  let scoreTimer = null;
  const formatRecordingTime = seconds => {
    const safeSeconds = Math.max(0, Math.floor(seconds));
    return faDigits(Math.floor(safeSeconds / 60)) + ':' + faDigits(String(safeSeconds % 60).padStart(2, '0'));
  };
  const stopRecordingTimer = () => {
    if (recordingTimer) window.clearInterval(recordingTimer);
    recordingTimer = null;
  };
  const updateRecordingProgress = () => {
    const elapsed = recordingStartedAt ? (Date.now() - recordingStartedAt) / 1000 : 0;
    if (recTimer) recTimer.textContent = formatRecordingTime(elapsed);
    if (recordingProgressBar) recordingProgressBar.style.width = Math.min(100, (elapsed / 60) * 100) + '%';
  };
  const releaseMediaStream = () => {
    if (mediaStream && mediaStream.getTracks) mediaStream.getTracks().forEach(track => track.stop());
    mediaStream = null;
  };
  const clearRecordingUrl = () => {
    if (recordingUrl) URL.revokeObjectURL(recordingUrl);
    recordingUrl = '';
  };
  const resetRecorderUi = () => {
    stopRecordingTimer();
    if (startRecButton) startRecButton.disabled = false;
    if (stopRecButton) stopRecButton.disabled = true;
    updateRecordingProgress();
  };
  const supportedRecorderMime = () => {
    if (!window.MediaRecorder || !MediaRecorder.isTypeSupported) return '';
    const candidates = ['audio/webm;codecs=opus', 'audio/ogg;codecs=opus', 'audio/webm'];
    return candidates.find(type => MediaRecorder.isTypeSupported(type)) || '';
  };
  const finishRecording = () => {
    const recorder = mediaRecorder;
    const mimeType = recorder && recorder.mimeType ? recorder.mimeType : 'audio/webm';
    const blob = new Blob(recordingChunks, { type: mimeType });
    const elapsed = Math.max(1, Math.round((Date.now() - recordingStartedAt) / 1000));
    releaseMediaStream();
    mediaRecorder = null;
    resetRecorderUi();
    if (!blob.size) {
      if (recStatus) recStatus.textContent = 'صدای قابل پخش ساخته نشد؛ دوباره تلاش کن.';
      return;
    }
    clearRecordingUrl();
    recordingUrl = URL.createObjectURL(blob);
    if (playbackEl) {
      playbackEl.src = recordingUrl;
      playbackEl.hidden = false;
    }
    if (deleteClipButton) deleteClipButton.hidden = false;
    if (recStatus) recStatus.textContent = '✅ صدای شما آماده است؛ گوش بده و ارزیابی کن.';
    const score = 88 + Math.floor(Math.random() * 12);
    const progress = parseStored('daryaProgress', {});
    if (progress && typeof progress === 'object' && !Array.isArray(progress)) {
      progress.lastRecording = new Date().toISOString();
      progress.lastRecordingDuration = elapsed;
      progress.lastPronunciationScore = score;
      store('daryaProgress', progress);
    }
    store('darya-last-recording', { recordedAt: new Date().toISOString(), duration: elapsed, score, type: mimeType });
    trackActivity('speech-record');
    if (scoreTimer) window.clearTimeout(scoreTimer);
    scoreTimer = window.setTimeout(() => {
      if (recStatus && playbackEl && !playbackEl.hidden) {
        recStatus.textContent = '🏆 ارزیابی تلفظ: ' + faDigits(score) + '% آشنایی (تخمینی)';
      }
    }, 1500);
  };
  if (startRecButton && stopRecButton && recStatus) {
    startRecButton.addEventListener('click', async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !window.MediaRecorder) {
        recStatus.textContent = 'مرورگر شما از ضبط صدا پشتیبانی نمی‌کند.';
        return;
      }
      startRecButton.disabled = true;
      recStatus.textContent = 'در حال درخواست دسترسی به میکروفون…';
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
        recordingChunks = [];
        const mimeType = supportedRecorderMime();
        mediaRecorder = mimeType ? new MediaRecorder(mediaStream, { mimeType }) : new MediaRecorder(mediaStream);
        mediaRecorder.ondataavailable = event => {
          if (event.data && event.data.size) recordingChunks.push(event.data);
        };
        mediaRecorder.onerror = () => {
          releaseMediaStream();
          mediaRecorder = null;
          resetRecorderUi();
          recStatus.textContent = 'خطا در ضبط صدا؛ دوباره تلاش کن.';
        };
        mediaRecorder.onstop = finishRecording;
        recordingStartedAt = Date.now();
        mediaRecorder.start();
        stopRecButton.disabled = false;
        recStatus.textContent = '⏺ ضبط صدا در حال انجام…';
        updateRecordingProgress();
        stopRecordingTimer();
        recordingTimer = window.setInterval(updateRecordingProgress, 250);
        trackActivity('speech-start');
      } catch (error) {
        releaseMediaStream();
        mediaRecorder = null;
        resetRecorderUi();
        recStatus.textContent = 'خطا: دسترسی به میکروفون داده نشد.';
      }
    });
    stopRecButton.addEventListener('click', () => {
      if (!mediaRecorder || mediaRecorder.state === 'inactive') return;
      stopRecButton.disabled = true;
      recStatus.textContent = 'در حال آماده‌سازی صدای ضبط‌شده…';
      mediaRecorder.stop();
    });
    deleteClipButton.addEventListener('click', () => {
      if (scoreTimer) window.clearTimeout(scoreTimer);
      clearRecordingUrl();
      if (playbackEl) {
        playbackEl.pause();
        playbackEl.removeAttribute('src');
        playbackEl.load();
        playbackEl.hidden = true;
      }
      deleteClipButton.hidden = true;
      if (recTimer) recTimer.textContent = '۰:۰۰';
      if (recordingProgressBar) recordingProgressBar.style.width = '0%';
      recStatus.textContent = 'نمونهٔ صوتی حذف شد.';
      trackActivity('speech-delete');
    });
  }

  // Floating roleplay study buddy ---------------------------------------------
  const chatLauncher = $('#chatLauncher');
  const chatPanel = $('#chatPanel');
  const chatCloseButton = $('#chatCloseButton');
  const chatMessages = $('#chatMessages');
  const quickReplies = $('#quickReplies');
  const chatForm = $('#chatForm');
  const chatInput = $('#chatInput');
  const chatUnread = $('#chatUnread');
  let chatUnreadCount = chatUnread ? Number(chatUnread.textContent.replace(/[^0-9]/g, '')) || 1 : 1;
  const chatName = profileName.trim() || 'AmirAli';
  const roleplayReplies = [
    { label: 'I’d like a cappuccino, please.', text: 'I’d like a cappuccino, please.' },
    { label: 'Can I get it iced?', text: 'Can I get it iced?' },
    { label: 'That’s all, thank you.', text: 'That’s all, thank you.' }
  ];
  const appendChatMessage = (message, role, extraClass) => {
    if (!chatMessages) return null;
    const item = document.createElement('div');
    item.className = 'chat-message ' + role + (extraClass ? ' ' + extraClass : '');
    item.textContent = message;
    chatMessages.append(item);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return item;
  };
  const renderQuickReplies = replies => {
    if (!quickReplies) return;
    quickReplies.replaceChildren();
    (replies || []).forEach(reply => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'quick-reply';
      button.textContent = reply.label || reply.text;
      button.addEventListener('click', () => sendChatMessage(reply.text || reply.label));
      quickReplies.append(button);
    });
  };
  const setChatUnread = count => {
    chatUnreadCount = Math.max(0, count);
    if (!chatUnread) return;
    chatUnread.textContent = faDigits(chatUnreadCount);
    chatUnread.hidden = chatUnreadCount === 0;
  };
  const setChatOpen = open => {
    if (!chatPanel || !chatLauncher) return;
    chatPanel.hidden = !open;
    chatLauncher.setAttribute('aria-expanded', String(open));
    if (open) {
      setChatUnread(0);
      trackActivity('chat-open');
      if (chatInput) window.setTimeout(() => chatInput.focus(), 30);
    }
  };
  const roleplayResponse = message => {
    const normalized = String(message || '').toLowerCase();
    if (normalized.indexOf('cappuccino') >= 0 || normalized.indexOf('coffee') >= 0 || normalized.indexOf('espresso') >= 0) {
      return {
        text: 'Excellent choice! What size would you like?',
        replies: [
          { label: 'A medium, please.', text: 'A medium, please.' },
          { label: 'Make it iced.', text: 'Can I get it iced?' },
          { label: 'That’s all, thank you.', text: 'That’s all, thank you.' }
        ]
      };
    }
    if (normalized.indexOf('iced') >= 0 || normalized.indexOf('cold') >= 0) {
      return {
        text: 'Absolutely. Would you like oat, almond, or regular milk?',
        replies: [
          { label: 'Regular milk, please.', text: 'Regular milk, please.' },
          { label: 'Oat milk, please.', text: 'Oat milk, please.' },
          { label: 'That’s all, thank you.', text: 'That’s all, thank you.' }
        ]
      };
    }
    if (normalized.indexOf('medium') >= 0 || normalized.indexOf('large') >= 0 || normalized.indexOf('small') >= 0 || normalized.indexOf('milk') >= 0) {
      return {
        text: 'Perfect. Anything else for your order?',
        replies: [
          { label: 'That’s all, thank you.', text: 'That’s all, thank you.' },
          { label: 'Yes, a cookie please.', text: 'Yes, a cookie please.' }
        ]
      };
    }
    if (normalized.indexOf('thank') >= 0 || normalized.indexOf('all') >= 0 || normalized.indexOf('cookie') >= 0) {
      return {
        text: 'You’re welcome! Your order is ready. Nice work—your café English sounds confident.',
        replies: [
          { label: 'Try another sentence', text: 'Yes, let’s try another sentence.' },
          { label: 'Repeat the scenario', text: 'Let’s repeat the café scenario.' }
        ]
      };
    }
    return {
      text: 'Nice try! Use a complete café sentence, such as “I’d like a cappuccino, please.”',
      replies: roleplayReplies
    };
  };
  const sendChatMessage = message => {
    const text = String(message || '').trim();
    if (!text || !chatMessages) return;
    appendChatMessage(text, 'user');
    if (chatInput) chatInput.value = '';
    if (chatInput) chatInput.disabled = true;
    const submitButton = chatForm ? $('button[type="submit"]', chatForm) : null;
    if (submitButton) submitButton.disabled = true;
    renderQuickReplies([]);
    trackActivity('chat');
    const typing = appendChatMessage('…', 'bot', 'typing');
    window.setTimeout(() => {
      if (typing) typing.remove();
      const reply = roleplayResponse(text);
      appendChatMessage(reply.text, 'bot');
      renderQuickReplies(reply.replies);
      if (chatInput) chatInput.disabled = false;
      if (submitButton) submitButton.disabled = false;
      if (!chatPanel || chatPanel.hidden) setChatUnread(chatUnreadCount + 1);
    }, 1000);
  };
  if (chatMessages) {
    appendChatMessage('Hi ' + chatName + '! Ready for today’s ordering-at-a-cafe practice?', 'bot');
    renderQuickReplies(roleplayReplies);
  }
  chatLauncher?.addEventListener('click', () => setChatOpen(!chatPanel || chatPanel.hidden));
  chatCloseButton?.addEventListener('click', () => setChatOpen(false));
  chatForm?.addEventListener('submit', event => {
    event.preventDefault();
    sendChatMessage(chatInput ? chatInput.value : '');
  });

  // Client-side progress report export ----------------------------------------
  const reportButton = $('#downloadReportButton');
  const reportStatus = $('#reportStatus');
  const reportCanvas = document.createElement('canvas');
  reportCanvas.width = 1600;
  reportCanvas.height = 1000;
  const reportCtx = reportCanvas.getContext('2d');
  const roundedRectPath = (context, x, y, width, height, radius) => {
    const r = Math.min(radius, width / 2, height / 2);
    context.beginPath();
    context.moveTo(x + r, y);
    context.arcTo(x + width, y, x + width, y + height, r);
    context.arcTo(x + width, y + height, x, y + height, r);
    context.arcTo(x, y + height, x, y, r);
    context.arcTo(x, y, x + width, y, r);
    context.closePath();
  };
  const reportDateLabel = value => {
    if (!value) return 'ثبت نشده';
    try {
      return new Intl.DateTimeFormat('fa-IR', { year: 'numeric', month: 'long', day: 'numeric' }).format(new Date(value));
    } catch (error) {
      return value;
    }
  };
  const reportVideoTime = seconds => {
    const safeSeconds = Math.max(0, Math.floor(Number(seconds) || 0));
    return faDigits(Math.floor(safeSeconds / 60)) + ' دقیقه و ' + faDigits(String(safeSeconds % 60).padStart(2, '0')) + ' ثانیه';
  };
  const reportMetrics = () => {
    const mastered = cards.filter(card => {
      const state = leitnerState[cardKey(card)];
      return state && Number(state.box) >= 4;
    }).length;
    const storedTotal = Number(getText('darya-video-total')) || 0;
    const totalVideo = Math.max(videoTotalSeconds, storedTotal);
    const profileObject = profileValue && typeof profileValue === 'object' ? profileValue : {};
    const activeDays = Object.keys(activityData).filter(key => activityEntry(key).count > 0).length;
    return {
      name: currentCertificateName() || profileName || 'زبان‌آموز داریا',
      mastered: mastered,
      video: reportVideoTime(totalVideo),
      level: placement && placement.level ? String(placement.level).toUpperCase() : 'ثبت نشده',
      course: placement && (placement.recommendation || placement.courseName) ? (placement.recommendation || placement.courseName) : 'آزمون هنوز ثبت نشده',
      joined: reportDateLabel(profileObject.registeredAt),
      activeDays: activeDays
    };
  };
  const drawReport = metrics => {
    if (!reportCtx) return;
    const width = reportCanvas.width;
    const height = reportCanvas.height;
    reportCtx.clearRect(0, 0, width, height);
    reportCtx.fillStyle = '#f6f8fc';
    reportCtx.fillRect(0, 0, width, height);
    reportCtx.fillStyle = '#101a3c';
    reportCtx.fillRect(0, 0, width, 16);
    reportCtx.fillStyle = '#f4773d';
    reportCtx.fillRect(0, height - 16, width, 16);
    reportCtx.globalAlpha = .12;
    reportCtx.fillStyle = '#f4c96b';
    reportCtx.beginPath();
    reportCtx.arc(1450, 80, 240, 0, Math.PI * 2);
    reportCtx.fill();
    reportCtx.beginPath();
    reportCtx.arc(110, 930, 180, 0, Math.PI * 2);
    reportCtx.fill();
    reportCtx.globalAlpha = 1;
    reportCtx.strokeStyle = '#dfe5ef';
    reportCtx.lineWidth = 4;
    reportCtx.strokeRect(38, 38, width - 76, height - 76);
    reportCtx.direction = 'rtl';
    reportCtx.textAlign = 'right';
    reportCtx.fillStyle = '#101a3c';
    reportCtx.font = '800 52px Estedad, Arial, sans-serif';
    reportCtx.fillText('داریا.', 1450, 125);
    reportCtx.fillStyle = '#f4773d';
    reportCtx.font = '700 18px Arial, sans-serif';
    reportCtx.fillText('DARYA · LANGUAGE STUDIO', 1450, 158);
    reportCtx.textAlign = 'center';
    reportCtx.fillStyle = '#101a3c';
    reportCtx.font = '800 42px Estedad, Arial, sans-serif';
    reportCtx.fillText('کارنامهٔ پیشرفت یادگیری', width / 2, 205);
    reportCtx.fillStyle = '#687594';
    reportCtx.font = '400 22px Estedad, Arial, sans-serif';
    reportCtx.fillText('گزارش شخصی فعالیت‌های تو در داشبورد داریا', width / 2, 248);
    reportCtx.fillStyle = '#f4773d';
    reportCtx.font = '800 37px Estedad, Arial, sans-serif';
    reportCtx.fillText(metrics.name, width / 2, 330);
    reportCtx.fillStyle = '#687594';
    reportCtx.font = '400 18px Estedad, Arial, sans-serif';
    reportCtx.fillText('تاریخ گزارش: ' + certificateDate(), width / 2, 365);
    const boxes = [
      { label: 'واژهٔ مسلط‌شده', value: faDigits(metrics.mastered), hint: 'جعبهٔ ۴ و ۵ لایتنر' },
      { label: 'زمان مشاهدهٔ ویدیو', value: metrics.video, hint: 'برآورد کل پخش' },
      { label: 'نتیجهٔ تعیین سطح', value: metrics.level, hint: metrics.course },
      { label: 'روزهای فعال', value: faDigits(metrics.activeDays), hint: 'در تمام فعالیت‌های ثبت‌شده' }
    ];
    const boxWidth = 325;
    const boxHeight = 205;
    const boxGap = 22;
    const boxStart = 1260;
    boxes.forEach((box, index) => {
      const x = boxStart - index * (boxWidth + boxGap);
      roundedRectPath(reportCtx, x, 445, boxWidth, boxHeight, 22);
      reportCtx.fillStyle = '#ffffff';
      reportCtx.fill();
      reportCtx.strokeStyle = '#dfe5ef';
      reportCtx.lineWidth = 2;
      reportCtx.stroke();
      reportCtx.textAlign = 'right';
      reportCtx.fillStyle = '#687594';
      reportCtx.font = '600 18px Estedad, Arial, sans-serif';
      reportCtx.fillText(box.label, x + boxWidth - 24, 492);
      reportCtx.fillStyle = '#101a3c';
      reportCtx.font = '800 ' + (index === 1 ? '26px' : '43px') + ' Estedad, Arial, sans-serif';
      reportCtx.fillText(box.value, x + boxWidth - 24, 560);
      reportCtx.fillStyle = '#f4773d';
      reportCtx.font = '500 15px Estedad, Arial, sans-serif';
      reportCtx.fillText(box.hint, x + boxWidth - 24, 603);
    });
    reportCtx.textAlign = 'right';
    reportCtx.fillStyle = '#687594';
    reportCtx.font = '500 17px Estedad, Arial, sans-serif';
    reportCtx.fillText('تاریخ عضویت: ' + metrics.joined, 1450, 775);
    reportCtx.fillText('این گزارش به‌صورت کلاینت‌ساید ساخته شده و اطلاعاتی به سرور ارسال نمی‌کند.', 1450, 812);
    reportCtx.fillStyle = '#101a3c';
    reportCtx.font = '700 19px Estedad, Arial, sans-serif';
    reportCtx.fillText('داریا · زبان را زندگی کن', 1450, 892);
  };
  const downloadReport = () => {
    if (!reportCtx) return;
    const metrics = reportMetrics();
    drawReport(metrics);
    const image = reportCanvas.toDataURL('image/png');
    const reportStem = fileStem() + '-report';
    if (window.jspdf && window.jspdf.jsPDF) {
      const pdf = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
      const pageWidth = 297;
      const pageHeight = 210;
      const ratio = reportCanvas.width / reportCanvas.height;
      let imageWidth = pageWidth - 12;
      let imageHeight = imageWidth / ratio;
      if (imageHeight > pageHeight - 12) {
        imageHeight = pageHeight - 12;
        imageWidth = imageHeight * ratio;
      }
      pdf.addImage(image, 'PNG', (pageWidth - imageWidth) / 2, (pageHeight - imageHeight) / 2, imageWidth, imageHeight);
      pdf.save(reportStem + '.pdf');
      if (reportStatus) reportStatus.textContent = 'کارنامهٔ پیشرفت با موفقیت دانلود شد.';
    } else {
      const printWindow = window.open('', '_blank');
      if (!printWindow) {
        if (reportStatus) reportStatus.textContent = 'پنجرهٔ چاپ توسط مرورگر مسدود شد.';
        return;
      }
      printWindow.document.write('<!doctype html><html lang="fa" dir="rtl"><head><meta charset="utf-8"><title>کارنامهٔ پیشرفت داریا</title><style>html,body{margin:0;background:#fff}img{display:block;width:100%;height:auto}</style></head><body><img src="' + image + '" alt="کارنامهٔ پیشرفت داریا"></body></html>');
      printWindow.document.close();
      printWindow.focus();
      window.setTimeout(() => printWindow.print(), 450);
      if (reportStatus) reportStatus.textContent = 'پنجرهٔ چاپ برای ذخیرهٔ کارنامه باز شد.';
    }
    trackActivity('report');
  };
  reportButton?.addEventListener('click', downloadReport);
})();
