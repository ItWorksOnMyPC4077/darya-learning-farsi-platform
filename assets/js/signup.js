(() => {
  const form = document.querySelector('#signup-form');
  if (!form) return;
  const message = document.querySelector('#form-message');
  const themeButton = document.querySelector('.registration-theme');
  if (themeButton) {
    if (localStorage.getItem('darya-theme') === 'dark') document.body.classList.add('dark');
    themeButton.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      localStorage.setItem('darya-theme', document.body.classList.contains('dark') ? 'dark' : 'light');
    });
  }
  const normalizePhone = value => value
    .replace(/[۰-۹]/g, digit => '۰۱۲۳۴۵۶۷۸۹'.indexOf(digit))
    .replace(/[٠-٩]/g, digit => '٠١٢٣٤٥٦٧٨٩'.indexOf(digit))
    .replace(/\D/g, '');

  const requestedCourse = new URLSearchParams(location.search).get('course');
  if (['conversation', 'club', 'private'].includes(requestedCourse)) form.elements.course.value = requestedCourse;

  form.addEventListener('submit', event => {
    event.preventDefault();
    const name = form.querySelector('#full-name').value.trim();
    const phone = normalizePhone(form.querySelector('#phone').value);
    const courseSelect = form.querySelector('#course');
    const course = courseSelect.value;
    if (name.length < 3 || phone.length < 10 || !course) {
      message.textContent = 'لطفاً همه فیلدها را کامل وارد کنید.';
      message.classList.add('error');
      return;
    }
    const courseName = courseSelect.selectedOptions[0].textContent;
    message.textContent = `${name} عزیز، درخواست تستی شما برای «${courseName}» ثبت شد ✓`;
    message.classList.remove('error');
    localStorage.setItem('darya-student', JSON.stringify({ name, phone, course, registeredAt: new Date().toISOString() }));
    localStorage.setItem('darya-signup-complete', 'true');
    form.reset();
    window.setTimeout(() => {
      window.location.href = `${form.dataset.paymentPath}?course=${encodeURIComponent(course)}`;
    }, 850);
  });
})();
