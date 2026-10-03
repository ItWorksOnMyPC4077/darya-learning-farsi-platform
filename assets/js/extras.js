(() => {
  const $ = selector => document.querySelector(selector);
  const theme = $('#theme');
  try {
    if (localStorage.getItem('darya-theme') === 'dark') document.body.classList.add('dark');
  } catch (_) { /* Storage may be unavailable. */ }
  theme.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    try { localStorage.setItem('darya-theme', document.body.classList.contains('dark') ? 'dark' : 'light'); } catch (_) { /* Storage may be unavailable. */ }
  });

  const answerButtons = [...document.querySelectorAll('.answers button')];
  answerButtons.forEach(button => button.addEventListener('click', () => {
    answerButtons.forEach(item => {
      item.classList.toggle('selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    $('#feedback').textContent = button.hasAttribute('data-ok')
      ? 'درست است! یعنی شروع‌کردن یک گفت‌وگوی صمیمی. ✓'
      : 'پاسخ درست نیست؛ به موقعیت کلاس جدید فکر کن و دوباره تلاش کن.';
  }));

  const days = $('#days');
  const times = [...document.querySelectorAll('#times button')];
  const status = $('#booking-status');
  const result = $('#book-result');
  let selectedDay = '';
  let selectedTime = '';

  // Dates are based on Tehran's calendar day, so the choices never become stale.
  const todayParts = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
    timeZone: 'Asia/Tehran', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date()).filter(part => part.type !== 'literal').map(part => [part.type, part.value]));
  const today = `${todayParts.year}-${todayParts.month}-${todayParts.day}`;
  const base = new Date(Date.UTC(Number(todayParts.year), Number(todayParts.month) - 1, Number(todayParts.day), 12));
  const availableDays = Array.from({ length: 4 }, (_, index) => {
    const date = new Date(base);
    date.setUTCDate(date.getUTCDate() + index + 1);
    return date.toISOString().slice(0, 10);
  });
  const isEnglish = () => document.documentElement.lang === 'en';
  const dateLabel = iso => new Intl.DateTimeFormat(isEnglish() ? 'en-US' : 'fa-IR', {
    timeZone: 'UTC', weekday: 'long', day: 'numeric', month: 'long'
  }).format(new Date(`${iso}T12:00:00Z`));
  const timeLabel = time => isEnglish() ? time : time.replace(/[0-9]/g, digit => '۰۱۲۳۴۵۶۷۸۹'[digit]);

  function renderDays() {
    days.replaceChildren(...availableDays.map(iso => {
      const button = document.createElement('button');
      button.type = 'button';
      button.dataset.date = iso;
      button.textContent = dateLabel(iso);
      button.classList.toggle('selected', iso === selectedDay);
      button.setAttribute('aria-pressed', String(iso === selectedDay));
      button.addEventListener('click', () => {
        selectedDay = iso;
        days.querySelectorAll('button').forEach(item => {
          item.classList.toggle('selected', item === button);
          item.setAttribute('aria-pressed', String(item === button));
        });
        result.textContent = '';
      });
      return button;
    }));
  }

  times.forEach(button => button.addEventListener('click', () => {
    selectedTime = button.dataset.time;
    times.forEach(item => {
      item.classList.toggle('selected', item === button);
      item.setAttribute('aria-pressed', String(item === button));
    });
    result.textContent = '';
  }));

  function showBooking(booking) {
    const day = booking.dateISO ? dateLabel(booking.dateISO) : booking.day;
    const time = booking.time ? timeLabel(booking.time.replace(/[۰-۹]/g, digit => String('۰۱۲۳۴۵۶۷۸۹'.indexOf(digit)))) : '';
    status.textContent = isEnglish()
      ? `Introductory session: ${day} at ${time}. A teacher will contact you to confirm.`
      : `جلسه آشنایی: ${day}، ساعت ${time}. برای نهایی‌شدن، مدرس با شما هماهنگ می‌کند.`;
    status.hidden = false;
  }

  let savedBooking = null;
  try { savedBooking = JSON.parse(localStorage.getItem('darya-booking') || 'null'); } catch (_) { /* Ignore invalid or unavailable storage. */ }
  if (savedBooking?.dateISO && savedBooking.dateISO >= today && savedBooking.time) showBooking(savedBooking);

  $('#book').addEventListener('click', () => {
    if (!selectedDay || !selectedTime) {
      result.textContent = 'لطفاً روز و ساعت را انتخاب کن.';
      return;
    }
    const booking = { dateISO: selectedDay, day: dateLabel(selectedDay), time: selectedTime, createdAt: new Date().toISOString() };
    try { localStorage.setItem('darya-booking', JSON.stringify(booking)); } catch (_) { /* The visible demo result still works. */ }
    savedBooking = booking;
    result.textContent = 'رزرو آزمایشی با موفقیت ثبت شد ✓';
    showBooking(booking);
  });

  renderDays();
  window.addEventListener('darya:languagechange', () => {
    renderDays();
    if (savedBooking?.dateISO && savedBooking.dateISO >= today) showBooking(savedBooking);
  });

  const navLinks = [...document.querySelectorAll('.extras-nav a')];
  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.hash === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-20% 0px -60% 0px' });
    document.querySelectorAll('.extras-section').forEach(section => sectionObserver.observe(section));
  }
})();
