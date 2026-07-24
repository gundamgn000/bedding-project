(() => {
  const root = document.documentElement;
  const storageKey = 'bedding-project-theme';

  const themes = [
    { id: 'default', label: '暖米' },
    { id: 'mist', label: '霧藍' }
  ];

  const switcher = document.createElement('div');
  switcher.className = 'theme-switcher';
  switcher.setAttribute('aria-label', '網站色系切換');

  const normalizeTheme = (theme) => theme === 'mist' ? 'mist' : 'default';

  const applyTheme = (theme, save = true) => {
    const selectedTheme = normalizeTheme(theme);

    if (selectedTheme === 'mist') {
      root.dataset.theme = 'mist';
    } else {
      root.removeAttribute('data-theme');
    }

    if (save) {
      localStorage.setItem(storageKey, selectedTheme);
    }

    switcher.querySelectorAll('button').forEach((button) => {
      const isActive = button.dataset.theme === selectedTheme;
      button.classList.toggle('is-active', isActive);
      button.setAttribute('aria-pressed', String(isActive));
    });
  };

  themes.forEach((theme) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.dataset.theme = theme.id;
    button.textContent = theme.label;
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => applyTheme(theme.id));
    switcher.appendChild(button);
  });

  const savedTheme = normalizeTheme(localStorage.getItem(storageKey));
  applyTheme(savedTheme, false);

  document.addEventListener('DOMContentLoaded', () => {
    document.body.appendChild(switcher);
    applyTheme(savedTheme, false);
  });
})();
