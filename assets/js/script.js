const body=document.body,toggle=document.querySelector('.theme-toggle');
const saved=localStorage.getItem('darya-theme'); if(saved==='dark') body.classList.add('dark');
toggle.addEventListener('click',()=>{body.classList.toggle('dark');localStorage.setItem('darya-theme',body.classList.contains('dark')?'dark':'light')});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
const testimonials=[
 {q:'قبل از داریا همیشه از اشتباه کردن می‌ترسیدم. حالا اولین نفری هستم که در جلسه‌های کاری داوطلب می‌شوم صحبت کنم.',n:'کیانا مرادی',r:'زبان‌آموز دوره مکالمه'},
 {q:'کلاس حضوری داریا تنها کلاسی بود که بعد از جلسه، دلم می‌خواست بیشتر تمرین کنم و ادامه بدهم.',n:'آرین رضایی',r:'زبان‌آموز باشگاه مکالمه'},
 {q:'برنامه‌ی خصوصی دقیقاً با زمان کاری من هماهنگ شد. در سه ماه برای مصاحبه‌ی شغلی آماده شدم.',n:'سارا نادری',r:'زبان‌آموز مسیر شخصی'}
]; let index=0;
function show(i){index=(i+testimonials.length)%testimonials.length;const t=testimonials[index];document.querySelector('#quote').textContent=t.q;document.querySelector('#person').textContent=t.n;document.querySelector('#role').textContent=t.r;document.querySelector('#count').textContent=`۰${index+1} / ۰۳`}
document.querySelector('#next').addEventListener('click',()=>show(index+1));document.querySelector('#prev').addEventListener('click',()=>show(index-1));
document.querySelector('.menu-toggle').addEventListener('click',()=>document.querySelector('.nav-links').classList.toggle('open'));
document.querySelectorAll('.course-card .course-link').forEach((link,i)=>{link.href=`pages/course-details.html?course=${['conversation','club','private'][i]}`});
const placementLink=document.querySelector('.play-link');placementLink.href='pages/placement-test.html';placementLink.innerHTML='<span class="play">✦</span> تست تعیین سطح رایگان';
const placementFab=document.createElement('a');placementFab.className='placement-fab';placementFab.href='pages/placement-test.html';placementFab.innerHTML='<span>✦</span> تست تعیین سطح رایگان';placementFab.setAttribute('aria-label','شروع تست تعیین سطح رایگان');document.body.appendChild(placementFab);
const signupForm=document.querySelector('#signup-form'),formMessage=document.querySelector('#form-message');
const normalizePhone=value=>value.replace(/[۰-۹]/g,d=>'۰۱۲۳۴۵۶۷۸۹'.indexOf(d)).replace(/[٠-٩]/g,d=>'٠١٢٣٤٥٦٧٨٩'.indexOf(d)).replace(/\D/g,'');
signupForm.addEventListener('submit',event=>{
  event.preventDefault();
  const name=document.querySelector('#full-name').value.trim(),phone=normalizePhone(document.querySelector('#phone').value),course=document.querySelector('#course').value;
  if(name.length<3||phone.length<10||!course){formMessage.textContent='لطفاً همه فیلدها را کامل وارد کنید.';formMessage.classList.add('error');return}
  formMessage.textContent=name+' عزیز، درخواست تستی شما برای «'+course+'» ثبت شد ✓';formMessage.classList.remove('error');
  localStorage.setItem('darya-student',JSON.stringify({name,phone,course,registeredAt:new Date().toISOString()}));
  localStorage.setItem('darya-signup-complete','true');
  signupForm.reset();
  window.setTimeout(()=>{window.location.href='pages/dashboard.html'},850);
});
