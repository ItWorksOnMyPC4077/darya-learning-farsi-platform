(() => {
  if (window.__daryaBilingualLoaded) return;
  window.__daryaBilingualLoaded = true;

  // The original Persian text remains the source of truth for either direction.
  const words = {
    'د':'D','داریا':'Darya','داریا.':'Darya.','م':'M','ن':'N','س':'S','ک':'K',
    'دوره‌ها':'Courses','روش داریا':'The Darya method','تجربه زبان‌آموزها':'Student stories',
    'مدرس‌ها':'Teachers','بیشتر':'Explore','خانه':'Home','بازگشت':'Back',
    'تغییر حالت رنگی':'Toggle theme','ورود به پنل':'Student dashboard','شروع یادگیری':'Start learning',
    'باز کردن منو':'Open menu','مدرسه زبان نسل جدید':'A new kind of language school',
    'زبان را فقط':"Don't just",'یاد نگیر،':'learn a language,','زندگی کن':'live it',
    'با داریا، مکالمه از صفحه‌ی کتاب بیرون می‌آید و وارد زندگی واقعی تو می‌شود؛ آنلاین، حضوری و همیشه همراه.':'With Darya, conversation moves beyond the textbook and into your daily life, online and in person.',
    'مشاهده دوره‌ها':'View courses','داریا چطور کار می‌کند؟':'How does Darya work?',
    'زبان‌آموز در مسیر رشد':'learners making progress','کلاس مکالمه زنده':'Live conversation class',
    'اعتماد به نفس':'Confidence','تلفظ امروز':"Today's pronunciation",'✦ تمرین کوتاه امروز':"✦ Today's short practice",
    'هر روز یک قدم':'One step each day','نزدیک‌تر به روانی':'closer to fluency',
    'مسیر تو، انتخاب تو':'Your path, your choice','کدام داریا':'Which Darya course','برای توست؟':'is right for you?',
    'فرقی نمی‌کند تازه شروع کرده‌ای یا دنبال جهش هستی؛ یک مسیر دقیق برای تو طراحی کرده‌ایم.':"Whether you're just starting or ready to advance, we have a path for you.",
    'آنلاین · گروهی':'Online · Group','حضوری · تهران':'In person · Tehran','آنلاین · خصوصی':'Online · Private',
    'مکالمه':'Conversation','با اعتماد':'with confidence',
    'هشت هفته تمرین واقعی برای اینکه بدون مکث حرف بزنی.':'Eight weeks of real practice to help you speak without hesitation.',
    'شروع از ۱۸ شهریور':'Starts September 9','جزئیات دوره':'Course details','باشگاه':'Conversation',
    'باشگاه مکالمه':'Conversation club','جلسه‌های کوچک، گفت‌وگوهای بزرگ و کلی آدم هم‌مسیر.':'Small groups, meaningful conversations and people on the same journey.',
    'ظرفیت محدود':'Limited places','مسیر':'Your','شخصی تو':'personal path',
    'برنامه‌ای که بر اساس هدف، زمان و سبک یادگیری توست.':'A plan built around your goals, schedule and learning style.',
    'جلسه‌ی آشنایی رایگان':'Free introductory session','رزرو مشاوره':'Book a consultation',
    'راز داریا':'The Darya approach','کمتر حفظ کن.':'Memorize less.','بیشتر تجربه کن.':'Experience more.',
    'ما کلاس زبان را از یک وظیفه به یک عادت دوست‌داشتنی تبدیل کرده‌ایم. با محتوای کوتاه، بازخورد واقعی و آدم‌هایی که مثل تو فکر می‌کنند.':'We make learning a language an enjoyable habit with short lessons, real feedback and people who share your goals.',
    'تمرین بیشتر':'More practice','در هر هفته':'each week','رضایت':'Satisfaction','زبان‌آموزها':'among students',
    'داستان‌های واقعی را بخوان':'Read real stories','صدای زبان‌آموزها':'Student voices',
    'داریا یعنی':'Darya means','«من می‌تونم»':'“I can do it”',
    'قبل از داریا همیشه از اشتباه کردن می‌ترسیدم. حالا اولین نفری هستم که در جلسه‌های کاری داوطلب می‌شوم صحبت کنم.':'Before Darya I was afraid of making mistakes. Now I volunteer to speak in work meetings.',
    'کلاس حضوری داریا تنها کلاسی بود که بعد از جلسه، دلم می‌خواست بیشتر تمرین کنم و ادامه بدهم.':'Darya was the first class that made me want to keep practicing after the lesson.',
    'برنامه‌ی خصوصی دقیقاً با زمان کاری من هماهنگ شد. در سه ماه برای مصاحبه‌ی شغلی آماده شدم.':'The private program fit my work schedule. In three months I was ready for my job interview.',
    'کیانا مرادی':'Kiana Moradi','آرین رضایی':'Arian Rezaei','سارا نادری':'Sara Naderi',
    'زبان‌آموز دوره مکالمه':'Conversation student','زبان‌آموز باشگاه مکالمه':'Conversation club student',
    'زبان‌آموز مسیر شخصی':'Private program student','آماده‌ای؟':'Ready?',
    'اولین قدم را':'Take the first step','با هم برداریم.':'together.',
    'یک جلسه‌ی آشنایی رایگان رزرو کن و مسیر مناسب خودت را پیدا کن.':'Book a free introductory session and find your path.',
    'رزرو جلسه رایگان':'Book a free session','ثبت‌نام آزمایشی':'Demo enrollment',
    'شروع مسیر':'Start your journey','از همین‌جا':'right here',
    'نام و نام خانوادگی':'Full name','مثلاً سارا احمدی':'e.g. Sara Ahmadi',
    'شماره موبایل':'Mobile number','نوع دوره':'Course type','انتخاب دوره':'Choose a course',
    'دوره آنلاین گروهی':'Online group course','دوره حضوری':'In-person course','کلاس خصوصی':'Private lessons',
    'ثبت درخواست':'Submit request','زبان را زندگی کن.':'Live the language.','© ۱۴۰۳ داریا':'© 2024 Darya',
    'تست تعیین سطح رایگان':'Free placement test','شروع تست تعیین سطح رایگان':'Start free placement test',
    'لطفاً همه فیلدها را کامل وارد کنید.':'Please complete all fields.',

    'مدرس‌های داریا':'Darya teachers','دوره‌ها ↩':'Courses ↩','تیم آموزشی داریا':'Meet the Darya team',
    'با آدم‌هایی یاد بگیر':'Learn with people','که کنار تو هستند.':'who stand by you.',
    'مدرس‌های داریا با تمرین واقعی و بازخورد کاربردی، مسیر یادگیری را قابل‌پیگیری می‌کنند.':'Darya teachers make progress easier to track through practical exercises and useful feedback.',
    'داریا احمدی':'Darya Ahmadi','مکالمه و اعتمادبه‌نفس':'Conversation and confidence',
    'تمرکز روی عبور از ترس صحبت‌کردن و ساختن عادت تمرین روزانه.':'Build a daily practice habit and overcome the fear of speaking.',
    '۱۰ سال تجربه':'10 years of experience','رزرو کلاس با داریا ←':'Book a class with Darya ←',
    'مهدی یوسفی':'Mehdi Yousefi','میزبان جلسه‌های حضوری برای تمرین انگلیسی در موقعیت واقعی.':'In-person sessions to practice English in real situations.',
    'حضوری':'In person','رزرو باشگاه مکالمه ←':'Book the conversation club ←',
    'نیلوفر شریفی':'Niloufar Sharifi','مسیر شخصی و آزمون‌ها':'Private study and exams',
    'برنامه خصوصی برای مهاجرت، مصاحبه کاری و پیشرفت تحصیلی.':'Private programs for immigration, job interviews and academic progress.',
    'خصوصی':'Private','رزرو مسیر شخصی ←':'Book a private program ←',

    'تست تعیین سطح | داریا':'Placement test | Darya','بازگشت به سایت ←':'Back to site ←',
    'تعیین سطح اولیه داریا':'Darya placement test','سطح فعلی خودت را':'Find your current','پیدا کن.':'level.',
    'این آزمون ۱۲ سوالی گرامر و واژگان تو را ارزیابی می‌کند و در پایان، یک مسیر آموزشی مناسب پیشنهاد می‌دهد.':'This 12-question test checks your grammar and vocabulary and recommends a learning path.',
    '۱۲ سوال کوتاه':'12 short questions','حدود ۷ دقیقه':'About 7 minutes','نتیجه فوری':'Instant result',
    'شروع تست رایگان':'Start the free test','گرامر و واژگان':'Grammar and vocabulary',
    'بهترین پاسخ را انتخاب کن.':'Choose the best answer.','سوال بعدی':'Next question',
    'نتیجه اولیه تو':'Your initial result','مشاهده دوره پیشنهادی':'View recommended course',
    'رزرو جلسه تأیید سطح':'Book a level review',
    'نتیجه تست اولیه است؛ سطح مکالمه در جلسه کوتاه با مدرس تأیید می‌شود.':'This is an initial result; a teacher will confirm your speaking level in a short session.',
    'نمی‌دانم':"I don't know",'ورود به داشبورد آموزشی':'Go to learning dashboard',

    'جزئیات دوره | داریا':'Course details | Darya','بازگشت به دوره‌ها':'Back to courses',
    '← برگشت به همه دوره‌ها':'← All courses','مکالمه با':'Conversation with',
    'هشت هفته تمرین واقعی برای اینکه بدون مکث حرف بزنی و اعتمادبه‌نفست را در مکالمه‌های روزمره و کاری پیدا کنی.':'Eight weeks of practical training to speak confidently in everyday and work conversations.',
    'در این دوره چه یاد می‌گیری؟':'What will you learn?','سوالات متداول':'Frequently asked questions',
    'این دوره برای چه سطحی مناسب است؟':'What level is this course for?',
    'سطح متوسط (B1 تا B2)؛ پیش‌نیاز خاصی ندارد.':'Intermediate (B1–B2); no special prerequisites.',
    'کلاس‌ها چگونه برگزار می‌شوند؟':'How are classes held?',
    'کلاس‌ها به‌صورت آنلاین و گروه‌های کوچک برگزار می‌شوند.':'Classes meet online in small groups.',
    'آیا جلسه آزمایشی وجود دارد؟':'Is there a trial session?',
    'بله، یک جلسه آشنایی رایگان برای انتخاب مسیر مناسب در نظر گرفته‌ایم.':'Yes, we offer a free introductory session to help you choose.',
    'مکالمه با اعتماد':'Confident conversation','۸ هفته · ۱۶ جلسه':'8 weeks · 16 sessions',
    'مدرس: داریا احمدی':'Teacher: Darya Ahmadi','پشتیبانی بین جلسات':'Support between sessions',
    'گواهی پایان دوره':'Completion certificate','ثبت‌نام در دوره':'Enroll in course',

    'پرداخت آزمایشی | داریا':'Demo checkout | Darya','🔒 محیط آزمایشی':'🔒 Demo environment',
    'تکمیل ثبت‌نام':'Complete enrollment','پرداخت':'Demo','آزمایشی':'checkout',
    'این صفحه نمونه است؛ هیچ پرداخت واقعی انجام نمی‌شود و اطلاعات کارت ذخیره نخواهد شد.':'This is a demo. No real payment is made, and card details are not stored.',
    'نام دارنده کارت':'Cardholder name','۱. اطلاعات':'1. Details','۲. تأیید':'2. Confirm','۳. موفق':'3. Success',
    'نام روی کارت':'Name on card','شماره کارت':'Card number','تاریخ انقضا':'Expiry date',
    'کد تخفیف: DARYA10':'Promo code: DARYA10','اعمال':'Apply','پرداخت آزمایشی':'Demo payment',
    'خلاصه سفارش':'Order summary','دوره مکالمه با اعتماد':'Confident conversation course',
    'نوع برگزاری':'Format','آنلاین گروهی':'Online group','وضعیت تعیین سطح':'Placement status',
    'انجام نشده':'Not completed','مبلغ قابل پرداخت':'Amount due',
    'پس از پرداخت موفق، ثبت‌نام در داشبورد آزمایشی فعال می‌شود.':'After a successful demo payment, enrollment appears in the demo dashboard.',
    'کد تخفیف ۱۰٪ اعمال شد ✓':'10% discount applied ✓','کد وارد شده معتبر نیست.':'Invalid promo code.',
    'لطفاً اطلاعات کارت تستی را کامل وارد کنید.':'Please complete the test card details.',
    'در حال اتصال امن...':'Connecting securely...','در حال شبیه‌سازی پرداخت...':'Simulating payment...',
    'موفق ✓':'Success ✓'
  };

  Object.assign(words, {
    'داریا | زبان را زندگی کن':'Darya | Live the language',
    'هاب یادگیری و اطلاعیه‌ها | داریا':'Learning hub and updates | Darya',
    'هاب یادگیری داریا':'Darya learning hub','هر چیزی که برای':'Everything you need to',
    'ادامه‌دادن':'keep going','لازم داری.':'is here.',
    'تمرین کوتاه، محتوای آموزشی، رزرو جلسه و خبرهای تازه‌ی آموزشگاه؛ همه در یک صفحه.':'Short practice, lessons, bookings and the latest school news, all in one place.',
    'تابلوی اعلانات داریا':'Darya notice board','خبرهای تازه،':'Latest news,','همین‌جا.':'right here.',
    'آخرین به‌روزرسانی: ۲۴ سپتامبر ۲۰۲۶':'Last updated: September 24, 2026',
    'سپتامبر':'September','اکتبر':'October',
    'ثبت‌نام دوره مکالمه پاییز باز شد':'Fall conversation course enrollment is open',
    'کلاس آنلاین گروهی از ۴ اکتبر شروع می‌شود؛ ظرفیت هر گروه ۸ نفر است.':'Online group classes begin October 4; each group has eight places.',
    'جدید':'New','کارگاه رایگان «ترس از مکالمه»':'Free workshop: overcoming speaking anxiety',
    'یک نشست ۶۰ دقیقه‌ای آنلاین با تمرین‌های عملی برای شروع صحبت‌کردن.':'A 60-minute online session with practical speaking exercises.',
    'رایگان':'Free','تغییر ساعت باشگاه مکالمه حضوری':'In-person conversation club time changed',
    'جلسه پنجشنبه این هفته به ساعت ۱۸:۳۰ منتقل شده است.':"This week's Thursday session moves to 6:30 pm.",
    'اطلاعیه':'Notice','نمونه درس':'Sample lesson','داستان‌ها':'Stories','رزرو جلسه':'Book a session',
    'مجله داریا':'Darya journal','منابع رایگان':'Free resources',
    'نمونه درس: اصطلاح در موقعیت واقعی':'Sample lesson: an expression in context',
    'به جای حفظ‌کردن، عبارت را در یک موقعیت واقعی یاد بگیر.':'Learn an expression in a real situation instead of memorizing it.',
    'تو وارد یک کلاس جدید شده‌ای و می‌خواهی گفتگو را راحت شروع کنی. این اصطلاح چه معنایی دارد؟':"You've joined a new class and want to start a conversation. What does this expression mean?",
    'شروع صمیمانه‌ی گفتگو':'Start a friendly conversation','تمام‌کردن گفتگو':'End the conversation',
    'سردشدن هوا':'The weather getting cold','روش تمرین ۳ دقیقه‌ای':'A three-minute practice method',
    'عبارت را با صدای بلند دو بار بخوان.':'Read the phrase aloud twice.',
    'یک جمله شخصی با آن بساز:':'Make your own sentence with it:',
    'همان جمله را برای خودت ضبط کن و یک بار گوش بده.':'Record yourself saying it, then listen once.',
    'داستان زبان‌آموزها':'Student stories','نتیجه‌ی تمرین مداوم، بازخورد و هدف‌گذاری کوچک.':'The results of steady practice, feedback and small goals.',
    'مکالمه با اعتماد':'Confident conversation','۲ ماه':'2 months','۸ جلسه':'8 sessions','۳ ماه':'3 months',
    'بعد از دو ماه توانستم ارائه انگلیسی‌ام را بدون استرس انجام دهم و برای اولین بار داوطلب صحبت‌کردن شدم.':'After two months I presented in English without stress and volunteered to speak for the first time.',
    'تمرین برایم از یک وظیفه به یک قرار هفتگی جذاب تبدیل شد؛ حالا برای شروع مکالمه مکث نمی‌کنم.':'Practice became a weekly highlight; now I start conversations without hesitation.',
    'مسیر شخصی':'Personal path',
    'با برنامه‌ای متناسب با زمان کاری‌ام برای مصاحبه شغلی آماده شدم و نتیجه دلخواهم را گرفتم.':'A plan that fit my work schedule helped me prepare for a job interview.',
    'تقویم رزرو جلسه آشنایی':'Introductory session calendar',
    'جلسه ۲۰ دقیقه‌ای برای مرور نتیجه تعیین سطح و انتخاب مسیر مناسب. رزرو در این نسخه فقط در مرورگر ذخیره می‌شود.':'A 20-minute session to review your placement result and choose a path. Demo bookings are saved only in this browser.',
    'یکشنبه ۲۷ سپتامبر':'Sunday, September 27','دوشنبه ۲۸ سپتامبر':'Monday, September 28',
    'سه‌شنبه ۲۹ سپتامبر':'Tuesday, September 29','چهارشنبه ۳۰ سپتامبر':'Wednesday, September 30',
    'ثبت رزرو آزمایشی ↗':'Save demo booking ↗','مطلب هفته':'This week’s article',
    'چطور مکالمه را شروع کنیم، حتی وقتی لغت کم داریم؟':'How do you start a conversation with limited vocabulary?',
    'برای شروع مکالمه لازم نیست جمله کامل و بی‌نقص داشته باشی. سه ابزار ساده کمک می‌کند: سؤال درباره موقعیت مشترک، بازگویی بخشی از حرف طرف مقابل، و درخواست توضیح کوتاه. مثلاً به‌جای سکوت، بگو:':'You do not need a perfect sentence. Ask about a shared situation, echo something the other person said or ask for a short explanation. For example, say:',
    'یا':'or','تمرین امروز':"Today's practice",
    'سه سؤال باز بنویس که بتوانی در کلاس یا محل کار از آنها استفاده کنی. هدف فقط شروع گفتگوست، نه استفاده از کلمات پیچیده.':'Write three open questions to use in class or at work. Focus on starting a conversation.',
    'Present Perfect در یک دقیقه':'Present Perfect in one minute',
    'وقتی نتیجه‌ی کاری تا الان مهم است از این زمان استفاده کن:':'Use this tense when the present result matters:',
    'اشتباه مفید چیست؟':'How can mistakes help?',
    'هر اشتباه را به یک فلش‌کارت تبدیل کن: جمله اشتباه، نسخه درست و یک مثال شخصی.':'Turn every mistake into a flashcard with the original sentence, a correction and your own example.',
    'واژگان را با موضوع یاد بگیر':'Learn vocabulary by topic',
    'به‌جای فهرست بلند لغت، یک موضوع مثل سفر انتخاب کن و فقط ۸ کلمه کاربردی را در جمله تمرین کن.':'Choose one topic, such as travel, and practice eight useful words in sentences.',
    'منابع رایگان هفته':"This week's free resources",'چک‌لیست مکالمه ۵ دقیقه‌ای':'Five-minute conversation checklist',
    'PDF نمونه':'Sample PDF','سه مرحله برای گرم‌کردن قبل از هر مکالمه.':'Three steps to warm up before a conversation.',
    'فلش‌کارت اصطلاحات کاری':'Workplace expression flashcards','۱۲ کارت':'12 cards',
    'عبارت‌های کاربردی برای جلسه و ایمیل.':'Useful phrases for meetings and emails.',
    'فایل تمرین تلفظ':'Pronunciation exercise audio','۴ دقیقه':'4 minutes',
    'تمرین ریتم جمله در انگلیسی با مثال‌های کوتاه.':'Practice English sentence rhythm with short examples.',
    'درست است! یعنی شروع‌کردن یک گفت‌وگوی صمیمی. ✓':'Correct! It means starting a friendly conversation. ✓',
    'پاسخ درست نیست؛ به موقعیت کلاس جدید فکر کن و دوباره تلاش کن.':'Try again. Think about the new-class situation.',
    'لطفاً روز و ساعت را انتخاب کن.':'Please choose a day and time.',
    'رزرو آزمایشی با موفقیت ثبت شد ✓':'Demo booking saved ✓'
  });

  Object.assign(words, {
    'داشبورد آموزشی | داریا':'Learning dashboard | Darya',
    'بازگشت به صفحه اصلی داریا':'Back to Darya home','ناوبری داشبورد':'Dashboard navigation',
    'یادگیری من':'My learning','جعبه لایتنر':'Leitner box','تمرین شنیداری':'Listening practice',
    'تمرین تلفظ':'Pronunciation practice','مدرک دوره':'Course certificate','صفحه اصلی':'Home',
    'فضای یادگیری شخصی تو':'Your personal learning space','سلام':'Hello','زبان‌آموز':'learner',
    '، آماده‌ای ادامه بدهی؟':', ready to continue?',
    'امروز فقط یک تمرین کوتاه کافی است تا یک قدم به مکالمهٔ روان‌تر نزدیک شوی.':'One short exercise today takes you a step closer to fluent conversation.',
    'رکورد تمرین امروز':"Today's practice streak",'۰ روز':'0 days','امروز شروع کن':'Start today',
    'برای دریافت پیشنهاد دقیق‌تر، آزمون تعیین سطح را کامل کن.':'Complete the placement test for a more accurate recommendation.',
    'شروع آزمون':'Start test','درس امروز':"Today's lesson",'مکالمه در موقعیت‌های واقعی':'Conversation in real situations',
    'درس ۰۴ از ۱۲':'Lesson 04 of 12','جایگاه ویدیو آموزشی':'Lesson video area',
    'جلسهٔ آموزشی داریا':'Darya lesson','پخش پیش‌نمایش ویدیو':'Play video preview',
    'ویدیو آموزشی شما در این بخش قرار می‌گیرد':'Your lesson video appears here',
    'با شروع پخش، روند درس به‌صورت خودکار ثبت می‌شود.':'Lesson progress is recorded when playback starts.',
    'آمادهٔ پخش':'Ready to play','کنترل‌های ویدیو':'Video controls','سرعت پخش':'Playback speed',
    'تغییر حالت شب/روز ویدیو':'Toggle video theme','یادداشت‌برداری لحظه‌ای':'Take notes as you watch',
    'نکته را دقیقاً در همان لحظه ثبت کن':'Capture a point at the right moment','یادداشت جدید':'New note',
    'مثلاً: عبارت I’d rather را در گفت‌وگوهای کاری تمرین کنم.':'e.g. Practice “I’d rather” in work conversations.',
    'افزودن یادداشت':'Add note','مسیر آموزشی تو':'Your learning path','پیشرفت این هفته':"This week's progress",
    'کل مسیر':'Overall path','فعالیت‌های تو هنوز ثبت نشده‌اند؛ با یک تمرین کوتاه شروع کن.':'No activity recorded yet; start with a short exercise.',
    'مکالمهٔ روزمره':'Everyday conversation','بر اساس زمان ویدیو و تمرین چت':'Based on video time and chat practice',
    'گرامر کاربردی':'Practical grammar','بر اساس یادداشت‌ها و مرور واژه‌ها':'Based on notes and vocabulary review',
    'شنیدار و تلفظ':'Listening and pronunciation','بر اساس تمرین صوتی و ضبط تلفظ':'Based on audio practice and recordings',
    'مرور امروز را شروع کن':"Start today's review",'زنجیره تمرین':'Practice streak',
    'هر روز یک مربع سبزتر.':'One greener square every day.','۷۰ روز اخیر':'Last 70 days',
    'تقویم فعالیت روزانه':'Daily activity calendar','فعالیت روزانه':'Daily activity','۰ روز فعال':'0 active days',
    'ش':'Sa','ی':'Su','چ':'We','پ':'Th','ج':'Fr','فعالیت ۷۰ روز اخیر':'Activity in the past 70 days',
    'کم':'Less','زیاد':'More','خلاصهٔ فعالیت':'Activity summary','بازخورد زنده':'Live feedback',
    'امروز را به زنجیره‌ات اضافه کن.':'Add today to your streak.',
    'هر یادداشت، مرور لغت، ضبط صدا یا پیام چت یک خانه از این تقویم را روشن می‌کند.':'Every note, vocabulary review, recording or chat message lights up one square.',
    'روز فعال':'active days','تمرین ثبت‌شده':'exercises logged','آزمایشگاه تلفظ':'Pronunciation lab',
    'صدای خودت را ضبط کن و دوباره گوش بده.':'Record your voice and listen again.',
    'کلاینت‌ساید · بدون سرور':'Local in your browser · no server','جملهٔ نمونه:':'Sample sentence:',
    '🎙️ شروع ضبط صدا':'🎙️ Start recording','⏹️ توقف ضبط صدا':'⏹️ Stop recording',
    '🗑️ حذف صدای ضبط‌شده':'🗑️ Delete recording',
    'برای شروع، اجازهٔ میکروفون را تأیید کن.':'Allow microphone access to begin.',
    'جعبه لایتنر هوشمند':'Smart Leitner box','لغت را ببین، بشنو و به خاطر بسپار.':'See, hear and remember each word.',
    'روی کارت کلیک کن یا کلید Space را بزن تا معنی و مثال باز شود.':'Click the card or press Space to show its meaning and example.',
    '＋ افزودن کلمهٔ اختصاصی':'＋ Add your own word','کلمهٔ انگلیسی':'English word',
    'مثلاً mindful':'e.g. mindful','معنی فارسی':'Persian meaning','مثلاً آگاه و متمرکز':'e.g. aware and focused',
    'مثال انگلیسی':'English example','افزودن به جعبه':'Add to box',
    'کارت واژگان؛ با کلیک یا Space بچرخانید':'Vocabulary card; click or press Space to flip',
    '۱ از ۴':'1 of 4','جعبه ۱':'Box 1','شنیدن تلفظ کلمه':'Hear word pronunciation',
    'تلفظ':'Pronunciation','برای دیدن معنی، کارت را برگردان.':'Flip the card to see the meaning.',
    'معنی و مثال':'Meaning and example','تاب‌آور، انعطاف‌پذیر':'Resilient, adaptable',
    'او تاب‌آور است و از هر چالش یاد می‌گیرد.':'She is resilient and learns from every challenge.',
    'مرور مجدد':'Review again','بلدم':'I know it','وضعیت الگوریتم لایتنر':'Leitner progress',
    'وضعیت مرور':'Review status','هر «بلدم» یک جعبه جلوتر':'Every “I know it” moves a card forward',
    'این کارت در جعبهٔ ۱ است؛ مرور دوباره باعث می‌شود دوباره زودتر آن را ببینی.':'This card is in box 1; review it again soon.',
    'پنج جعبه لایتنر':'Five Leitner boxes','واژهٔ تثبیت‌شده':'Mastered word',
    'بشنو، بخوان و با ریتم جمله همراه شو.':'Listen, read and follow the rhythm of the sentence.',
    'فایل تمرین مکالمه':'Conversation practice audio','پلیر تمرین صوتی':'Audio practice player',
    'تمرین مکالمه — حدود ۳۲ ثانیه':'Conversation practice — about 32 seconds',
    'پخش تمرین صوتی':'Play audio practice','موقعیت تمرین صوتی':'Audio practice position',
    'متن هم‌زمان':'Synchronized transcript','روی هر بخش بزن تا از همان‌جا شروع شود.':'Click a section to start from there.',
    'دریافت مدرک دوره':'Get course certificate','گواهی پیشرفتت را با نام خودت بساز.':'Create a progress certificate with your name.',
    'مدرک در همین مرورگر ساخته می‌شود و هیچ اطلاعاتی به سرور ارسال نمی‌شود.':'The certificate is made in this browser; no data is sent to a server.',
    'تنظیمات گواهی‌نامه':'Certificate settings','نام درج‌شده روی گواهی‌نامه':'Name on certificate',
    'مثلاً امیرعلی رضایی':'e.g. Amirali Rezaei','ساخت گواهی‌نامه':'Create certificate',
    'دانلود PNG':'Download PNG','دانلود PDF':'Download PDF',
    'دانلود کارنامهٔ پیشرفت':'Download progress report',
    'برای PDF از دانلود مستقیم استفاده می‌شود؛ اگر کتابخانه در دسترس نباشد، پنجرهٔ چاپ مرورگر باز خواهد شد.':'PDF downloads directly when available; otherwise the browser print window opens.',
    'پیش‌نمایش گواهی‌نامه داریا':'Darya certificate preview','پیش‌نمایش گواهی‌نامهٔ شخصی شما':'Your personalized certificate preview',
    'یار تمرین':'Practice partner','چت‌بات تمرین مکالمه':'Conversation practice chatbot',
    'یار مکالمهٔ داریا':'Darya conversation partner','سناریو: سفارش در کافه':'Scenario: ordering at a café',
    'بستن چت':'Close chat','پاسخ‌های سریع':'Quick replies','پیام شما':'Your message',
    'یک پاسخ انگلیسی بنویس…':'Write a reply in English…','ارسال پیام':'Send message',
    'یادگیری کوچک امروز، مکالمهٔ بزرگ فردا.':'A little learning today, a bigger conversation tomorrow.'
  });

  Object.assign(words, {
    'اعتماد':'confidence','جلسه‌های کوچک، گفت‌وگوهای بزرگ و کلی آدم هم‌مسیر برای تمرین مداوم و لذت‌بخش.':'Small groups and meaningful conversations for enjoyable, steady practice.',
    'برنامه‌ای اختصاصی که بر اساس هدف، زمان و سبک یادگیری خودت طراحی می‌شود.':'A personal plan designed around your goals, schedule and learning style.',
    'از ۹۸۰,۰۰۰ تومان':'From 980,000 toman','سطح متوسط تا پیشرفته (B1 تا C1).':'Intermediate to advanced (B1–C1).',
    'تمام سطوح؛ پس از جلسه تعیین سطح.':'All levels, after a placement session.',
    'کلاس آنلاین زنده، دو جلسه در هفته و گروه‌های حداکثر ۸ نفر.':'Live online classes twice a week, with up to eight students.',
    'جلسه‌های حضوری در تهران، هر هفته یک نشست ۹۰ دقیقه‌ای.':'Weekly 90-minute in-person sessions in Tehran.',
    'جلسه‌های خصوصی آنلاین با برنامه زمانی منعطف.':'Private online sessions with a flexible schedule.',
    '۸ هفته · ۸ جلسه':'8 weeks · 8 sessions','قابل تنظیم · از ۴ جلسه':'Flexible · from 4 sessions',
    'شروع مکالمه بدون استرس':'Start conversations without anxiety',
    'واژگان کاربردی برای زندگی واقعی':'Useful vocabulary for everyday life',
    'تلفظ و ریتم طبیعی جمله‌ها':'Natural pronunciation and sentence rhythm',
    'مکالمه در موقعیت‌های کاری':'Conversation at work',
    'بحث آزاد و داستان‌گویی':'Open discussion and storytelling','اصطلاحات روزمره':'Everyday expressions',
    'بازخورد تلفظ در لحظه':'Immediate pronunciation feedback',
    'شبکه‌سازی با زبان‌آموزها':'Connect with other learners',
    'تعیین هدف و نقشه راه':'Set goals and a learning plan',
    'برنامه تمرینی اختصاصی':'Personal practice plan',
    'تمرکز روی نیاز شغلی یا تحصیلی':'Focus on work or study needs',
    'گزارش پیشرفت ماهانه':'Monthly progress report',
    'گرامر':'Grammar','واژگان':'Vocabulary','درک مطلب':'Reading comprehension',
    'شروع از پایه':'Start with the basics','پایه تا مکالمه':'From basics to conversation',
    'مکالمه پیشرفته':'Advanced conversation','مسیر شخصی تو':'Your personal path',
    'ثبت‌نام و پرداخت آزمایشی':'Enroll with demo payment','بازگشت به صفحه اصلی':'Back to home',
    '۲,۹۸۰,۰۰۰ تومان':'2,980,000 toman','۱,۸۵۰,۰۰۰ تومان':'1,850,000 toman',
    '۹۸۰,۰۰۰ تومان':'980,000 toman','خصوصی آنلاین':'Online private',
    'مسیر مکالمهٔ داریا':'Darya conversation path','مشاهده مسیر پیشنهادی':'View recommended path',
    'توقف پیش‌نمایش ویدیو':'Pause video preview','تغییر به حالت شب ویدیو':'Switch video to dark mode',
    'تغییر به حالت روز ویدیو':'Switch video to light mode','حذف یادداشت':'Delete note',
    'شیوا و روشن صحبت کردن':'Speaking clearly and fluently',
    'او می‌تواند ایده‌هایش را با اعتمادبه‌نفس و روشن بیان کند.':'She can express her ideas clearly and confidently.',
    'تفاوت ظریف، نکتهٔ دقیق':'Subtle difference or fine point',
    'لحن مناسب می‌تواند نکتهٔ ظریف یک جمله را تغییر دهد.':'The right tone can change the nuance of a sentence.',
    'بداهه، خودجوش':'Spontaneous','به‌جای ترجمهٔ قبلی، یک پاسخ خودجوش را امتحان کن.':'Try a spontaneous reply instead of translating first.',
    'مثال اختصاصی تو':'Your own example',
    'آفرین، این واژه به جعبهٔ پنجم رسیده و فاصلهٔ مرورش طولانی‌تر است.':'Well done! This word has reached box five and needs less frequent review.',
    'تلفظ در این مرورگر در دسترس نیست':'Pronunciation is unavailable in this browser',
    'کلمه، معنی و مثال را کامل وارد کن.':'Enter the word, meaning and example.',
    'این کلمه قبلاً در جعبهٔ تو هست.':'This word is already in your box.',
    'توقف تمرین صوتی':'Pause audio practice','گواهی‌نامهٔ پایان مسیر آموزشی':'Learning path completion certificate',
    'زبان‌آموز داریا':'Darya learner','مدرس داریا':'Darya teacher',
    'داریا · زبان را زندگی کن':'Darya · Live the language',
    'گواهی‌نامه ساخته شد':'Certificate created','ساخت گواهی‌نامه':'Create certificate',
    'گواهی‌نامه داریا':'Darya certificate','رکورد تمرین پیوسته':'Consecutive practice streak',
    'امروز هم ثبت شد':'Today has been logged','امروز را به زنجیره‌ات اضافه کردی.':'You added today to your streak.',
    'هر فعالیت کوچک ثبت شده؛ همین ریتم آرام، پیشرفت ماندگار می‌سازد.':'Every small activity counts toward lasting progress.',
    'با ثبت فعالیت‌های بیشتر، این درصد زنده به‌روز می‌شود.':'This percentage updates as you practice more.',
    'صدای قابل پخش ساخته نشد؛ دوباره تلاش کن.':'No playable audio was created. Try again.',
    '✅ صدای شما آماده است؛ گوش بده و ارزیابی کن.':'✅ Your recording is ready; listen and assess it.',
    'مرورگر شما از ضبط صدا پشتیبانی نمی‌کند.':'Your browser does not support audio recording.',
    'در حال درخواست دسترسی به میکروفون…':'Requesting microphone access…',
    'خطا در ضبط صدا؛ دوباره تلاش کن.':'Recording failed. Try again.',
    '⏺ ضبط صدا در حال انجام…':'⏺ Recording…',
    'خطا: دسترسی به میکروفون داده نشد.':'Microphone access was denied.',
    'در حال آماده‌سازی صدای ضبط‌شده…':'Preparing your recording…',
    'نمونهٔ صوتی حذف شد.':'Recording deleted.','ثبت نشده':'Not recorded',
    'آزمون هنوز ثبت نشده':'No test result yet','کارنامهٔ پیشرفت یادگیری':'Learning progress report',
    'اطلاعات آزمایشی داریا پاک شد؛ سایت ریست می‌شود.':'Darya demo data cleared; the site is resetting.'
  });

  Object.assign(words, {
    'ثبت‌نام':'Enroll',
    'ثبت‌نام در دوره | داریا':'Course registration | Darya',
    'ثبت‌نام آزمایشی داریا':'Darya demo enrollment',
    'مسیر یادگیری تو':'Your learning journey',
    'از اینجا شروع می‌شود.':'starts here.',
    'اطلاعاتت را وارد کن و دوره مناسب خودت را انتخاب کن. بعد از ثبت درخواست، به صفحه پرداخت آزمایشی می‌روی.':'Enter your details and choose a course. After submitting, you will continue to the demo checkout.',
    'مراحل ثبت‌نام':'Enrollment steps',
    'انتخاب دوره':'Choose a course',
    'دوره‌ای هماهنگ با هدف تو':'A course that fits your goals',
    'ثبت اطلاعات':'Enter your details',
    'فقط نام و شماره تماس':'Just your name and phone number',
    'پرداخت آزمایشی و ورود به داشبورد':'Demo checkout and dashboard access',
    'فرم ثبت‌نام':'Registration form',
    'چند قدم کوتاه تا شروع مسیرت باقی مانده است.':'Just a few short steps before you begin.',
    'این نسخه آزمایشی است و پرداخت واقعی انجام نمی‌شود.':'This is a demo; no real payment is made.'
  });

  const sourceText = new WeakMap();
  const sourceAttrs = new WeakMap();
  const attrs = ['placeholder', 'aria-label', 'title'];
  const originalTitle = document.title;
  let language = 'fa';
  const digits = '۰۱۲۳۴۵۶۷۸۹';
  const translate = value => {
    const key = value.trim();
    if (!key) return value;
    if (words[key]) return value.replace(key, words[key]);
    let match = key.match(/^سوال ([۰-۹0-9]+) از ([۰-۹0-9]+)$/);
    if (match) return `Question ${normalizeDigits(match[1])} of ${normalizeDigits(match[2])}`;
    match = key.match(/^سطح (A1|A2|B1|B2|C1)$/);
    if (match) return `Level ${match[1]}`;
    match = key.match(/^نتیجه اولیه تو (A1|A2|B1|B2|C1) است\. مسیر پیشنهادی داریا: «(.+)»\.$/);
    if (match) return `Your initial level is ${match[1]}. Darya recommends: “${words[match[2]] || match[2]}”.`;
    match = key.match(/^([۰-۹,]+) تومان$/);
    if (match) return `${normalizeDigits(match[1])} toman`;
    match = key.match(/^(.+?) عزیز، درخواست تستی شما برای «(.+)» ثبت شد ✓$/);
    if (match) return `${match[1]}, your demo request for “${words[match[2]] || match[2]}” was saved ✓`;
    match = key.match(/^جلسه آشنایی: (.+)، ساعت (.+)\. برای نهایی‌شدن، مدرس با شما هماهنگ می‌کند\.$/);
    if (match) return `Introductory session: ${words[match[1]] || match[1]} at ${normalizeDigits(match[2])}. A teacher will contact you to confirm.`;
    match = key.match(/^پرداخت آزمایشی موفق بود؛ کد پیگیری (.+)$/);
    if (match) return `Demo payment successful; reference ${match[1]}`;
    return normalizeDigits(value);
  };
  const normalizeDigits = value => value.replace(/[۰-۹]/g, digit => String(digits.indexOf(digit))).replace(/٪/g, '%');

  function updateNode(node) {
    if (node.nodeType !== Node.TEXT_NODE || !node.nodeValue.trim() ||
        node.parentElement?.closest('script,style,[data-no-translate],.language-toggle')) return;
    const saved = sourceText.get(node);
    if (!saved || node.nodeValue !== saved.displayed) {
      sourceText.set(node, { original: node.nodeValue, displayed: node.nodeValue });
    }
    const entry = sourceText.get(node);
    const value = language === 'en' ? translate(entry.original) : entry.original;
    if (node.nodeValue !== value) node.nodeValue = value;
    entry.displayed = value;
  }

  function updateElement(element) {
    if (element.matches('script,style,[data-no-translate],.language-toggle')) return;
    let saved = sourceAttrs.get(element);
    if (!saved) { saved = {}; sourceAttrs.set(element, saved); }
    for (const attr of attrs) {
      if (!element.hasAttribute(attr)) continue;
      const current = element.getAttribute(attr);
      if (!saved[attr] || current !== saved[attr].displayed) {
        saved[attr] = { original: current, displayed: current };
      }
      const entry = saved[attr];
      const value = language === 'en' ? translate(entry.original) : entry.original;
      if (current !== value) element.setAttribute(attr, value);
      entry.displayed = value;
    }
  }

  function refresh(root = document.body) {
    if (!root) return;
    if (root.nodeType === Node.TEXT_NODE) { updateNode(root); return; }
    if (root.nodeType !== Node.ELEMENT_NODE || root.matches('script,style,[data-no-translate]')) return;
    updateElement(root);
    root.querySelectorAll('*').forEach(updateElement);
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (walker.nextNode()) updateNode(walker.currentNode);
    document.title = language === 'en' ? (words[originalTitle] || originalTitle) : originalTitle;
  }

  function apply(next) {
    language = next;
    document.documentElement.lang = next;
    document.documentElement.dir = next === 'en' ? 'ltr' : 'rtl';
    document.body.classList.toggle('english', next === 'en');
    refresh();
    const button = document.querySelector('.language-toggle');
    button.textContent = next === 'en' ? 'FA' : 'EN';
    button.setAttribute('aria-label', next === 'en' ? 'Switch to Persian' : 'تغییر زبان به انگلیسی');
    button.title = next === 'en' ? 'فارسی' : 'English';
    try { localStorage.setItem('darya-language', next); } catch (_) { /* storage may be blocked */ }
  }

  function init() {
    const target = document.querySelector('.header-actions,.dashboard-header-actions,.t-actions,.payment-actions,.test-actions,.xh .actions,.site-header,.dashboard-header,.t-head,.payment-header,.test-head,.xh') || document.body;
    let button = document.querySelector('.language-toggle');
    if (!button) {
      button = document.createElement('button');
      button.type = 'button';
      button.className = 'language-toggle';
      target.appendChild(button);
    }
    button.addEventListener('click', () => apply(language === 'en' ? 'fa' : 'en'));
    let saved = 'fa';
    try { saved = localStorage.getItem('darya-language') === 'en' ? 'en' : 'fa'; } catch (_) { /* storage may be blocked */ }
    apply(saved);
    const observer = new MutationObserver(records => {
      if (records.length) refresh();
    });
    observer.observe(document.body, { subtree: true, childList: true, characterData: true, attributes: true, attributeFilter: attrs });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
