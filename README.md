
```markdown
<div align="center">

# 🌊 Darya (دریا)
### Interactive Farsi Learning Web Platform
### پلتفرم تعاملی و مدرن آموزش زبان فارسی

[![Live Demo](https://img.shields.io/badge/demo-live-brightgreen.svg?style=for-the-badge)](https://itworksonmypc4077.github.io/darya-learning-farsi-platform/)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](LICENSE)
[![Pure Vanilla](https://img.shields.io/badge/tech-Vanilla%20JS%20%7C%20HTML5%20%7C%20CSS3-orange.svg?style=for-the-badge)](#tech-stack)

<p align="center">
  A clean, responsive, and interactive frontend platform built to teach Farsi to non-native speakers, complete with level assessment, dashboards, and bilingual UI.
  <br />
  یک پلتفرم مدرن و واکنش‌گرا برای یادگیری زبان فارسی با قابلیت تعیین سطح هوشمند، پنل کاربری، و ساختار کاملاً دوزبانه.
</p>

[🌐 Live Preview / مشاهده آنلاین](https://itworksonmypc4077.github.io/darya-learning-farsi-platform/) • [Report Bug / گزارش مشکل](https://github.com/ItWorksOnMyPC4077/darya-learning-farsi-platform/issues)

</div>

---

## 📖 فهرست مطالب / Table of Contents
- [🇮🇷 معرفی پروژه (Farsi Overview)](#-معرفی-پروژه-farsi-overview)
- [🇬🇧 Project Overview](#-project-overview)
- [✨ قابلیت‌های کلیدی / Key Features](#-قابلیت‌های-کلیدی--key-features)
- [🛠️ تکنولوژی‌ها / Tech Stack](#️-تکنولوژی‌ها--tech-stack)
- [📁 ساختار پروژه / Project Structure](#-ساختار-پروژه--project-structure)
- [🚀 راه‌اندازی و اجرا / Quick Start](#-راه‌اندازی-و-اجرا--quick-start)
- [👤 نویسنده / Author](#-نویسنده--author)

---

## 🇮🇷 معرفی پروژه (Farsi Overview)

**«دریا» (Darya)** یک وب‌اپلیکیشن یادگیری زبان فارسی برای علاقه‌مندان به ادبیات و زبان فارسی است. این پلتفرم از صفر تا صد بدون فریم‌ورک‌های سنگین و تنها با **Vanilla JavaScript**، **HTML5** و **CSS3** طراحی شده تا سرعت لود بالا، سئوی روان و تجربه کاربری سبکی ارائه کند.

این پروژه شامل صفحاتی جامع برای تعیین سطح زبان‌آموز (`placement-test`)، جزئیات دوره‌ها (`course-details`)، لیست اساتید (`teachers`)، پیش‌نمایش درگاه پرداخت و دشبورد دانش‌آموز می‌باشد.

---

## 🇬🇧 Project Overview

**Darya** is an interactive, lightweight e-learning web platform tailored for learning the Persian (Farsi) language. Built from scratch using modern **Vanilla JavaScript**, semantic **HTML5**, and responsive **CSS3**, it aims to deliver high performance without third-party framework overhead.

The platform provides a complete student onboarding journey: from placement exams to course registration, teacher discovery, and student dashboard views.

---

## ✨ قابلیت‌های کلیدی / Key Features

- **🌐 دوزبانه و پشتیبانی RTL/LTR:** رابط کاربری منعطف با سوییچ زبان و هماهنگی کامل راست‌چین و چپ‌چین.
- **📝 آزمون تعیین سطح آنلاین (Placement Test):** ارزیابی تعاملی مهارت‌های دانشجو با جاوااسکریپت خام.
- **📊 داشبورد یادگیری (Dashboard):** محیط مدیریت دوره‌ها، تمرین‌ها و پیشرفت درسی.
- **👨‍🏫 صفحه اساتید و دوره‌ها (Teachers & Courses):** ساختار تفکیک‌شده برای معرفی اساتید، سرفصل‌ها و قیمت‌ها.
- **💳 شبیه‌ساز پرداخت (Mock Payment):** صفحات تسویه‌حساب و پرداخت دوره.
- **📱 طراحی تمام ریسپانسیو (Responsive):** بهینه‌سازی دقیق برای نمایشگرهای موبایل، تبلت و دسکتاپ.

---

## 🛠️ تکنولوژی‌ها / Tech Stack

| بخش | تکنولوژی | توضیحات |
| :--- | :--- | :--- |
| **Structure** | HTML5 Semantic Tags | ساختار استاندارد و دسترس‌پذیر (Accessibility) |
| **Styling** | Modern CSS3 (Flexbox & Grid) | چیدمان مدرن و انیمیشن‌های مینیمال |
| **Logic** | Vanilla JavaScript (ES6+) | پردازش فرم‌ها، آزمون تعیین سطح و سوییچ دوزبانه |
| **Hosting** | GitHub Pages | دیپلوی و اجرای زنده پروژه |

---

## 📁 ساختار پروژه / Project Structure

```bash
darya-learning-farsi-platform/
│
├── index.html                # صفحه اصلی پلتفرم (Landing Page)
├── dashboard.html            # پنل کاربری دانشجو
├── placement-test.html       # آزمون آنلاین تعیین سطح
├── course-details.html       # سرفصل‌ها و توضیحات تکمیلی دوره
├── teachers.html             # اساتید و مدرسان دوره
├── payment.html              # فرآیند پرداخت و ثبت‌نام
├── extras.html               # منابع و محتواهای کمکی
│
├── assets/
│   ├── css/                  # استایل‌ها و قوانین واکنش‌گرایی
│   ├── js/                   # ماژول‌های جاوااسکریپت (دوزبانه، آزمون، ...)
│   └── images/               # مدیا و آیکون‌ها
└── README.md
```

---

## 🚀 راه‌اندازی و اجرا / Quick Start

نیازی به نصب Node.js یا پکیج‌های حجیم نیست!

1. **کلون کردن ریپازیتوری:**
   ```bash
   git clone https://github.com/ItWorksOnMyPC4077/darya-learning-farsi-platform.git
   ```
2. **ورود به پوشه پروژه:**
   ```bash
   cd darya-learning-farsi-platform
   ```
3. **اجرا:**
   فایل `index.html` را در مرورگر دلخواه باز کنید یا با افزونه `Live Server` در VS Code اجرا نمایید.

---

## 👤 نویسنده / Author

**AmirAli Kahkesh**
- GitHub: [@ItWorksOnMyPC4077](https://github.com/ItWorksOnMyPC4077)
- Role: Aspiring Computer Engineer & Frontend Developer

---

<div align="center">
  <sub>ساخته شده با ❤️ و جاوااسکریپت خالص برای جامعه‌ی یادگیری فارسی</sub>
</div>
```

---

### چطور روی گیت‌هاب بذاریش؟
فایل `README.md` رو داخل همون پوشه باز کن، این متن رو بریز توش و ذخیره کن. بعد با این ۳ تا دستور پوش کن:

```bash
git add README.md
git commit -m "docs: add bilingual structured readme"
git push
```
