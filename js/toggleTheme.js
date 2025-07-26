export function applySavedTheme() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark') {
    document.body.classList.add('dark-mode');
    const icon = document.getElementById('theme-icon');
    if (icon) {
      icon.classList.replace('bx-moon', 'bx-sun');
    }
  }
}

export function toggleTheme() {
  const isDark = document.body.classList.toggle('dark-mode');
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.classList.toggle('bx-moon', !isDark);
    icon.classList.toggle('bx-sun', isDark);
  }
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
}