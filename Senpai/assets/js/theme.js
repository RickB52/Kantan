/* ============================================================
   Senpai — theme.js
   Dark mode toggle, lưu preference vào LocalStorage
   ============================================================ */

const THEME_KEY = 'senpai_theme';

/** Áp dụng theme (light/dark) */
function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

/** Toggle giữa light và dark */
function toggleTheme() {
  const current = localStorage.getItem(THEME_KEY) || 'light';
  const next    = current === 'dark' ? 'light' : 'dark';
  localStorage.setItem(THEME_KEY, next);
  applyTheme(next);
}

/** Khởi tạo theme khi tải trang */
function initTheme() {
  const saved  = localStorage.getItem(THEME_KEY);
  const prefer = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  applyTheme(saved || prefer);
}

// Chạy ngay khi script load
initTheme();
