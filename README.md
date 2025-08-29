# DentalOS • V60 (GitHub Pages Ready)

- PWA کامل (manifest + service-worker)
- Router قفل + Anchors ثابت (#sec-…)
- RBAC: manager / reception / doctor / assistant
- IndexedDB + Seed
- Update Center (Stable/Beta – استاب)
- Health Check و دکمه‌ی پاک‌سازی کش

## اجرای آنلاین
1) تمام فایل‌ها را در root ریپو آپلود کن.
2) Settings → Pages → Deploy from a branch → main / (root).
3) health.html را باز کن و وضعیت SW/Cache را چک کن.

## نصب روی موبایل
Safari/Chrome → Add to Home Screen.

## به‌روزرسانی
نسخه را در service-worker (نام CACHE) و update-center بالا ببر، commit کن.
کاربر با Refresh نسخه جدید می‌گیرد. اگر کش قدیمی ماند: دکمه‌ی پاک‌سازی کش در تنظیمات.
