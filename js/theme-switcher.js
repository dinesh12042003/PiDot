document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeStyle = document.getElementById('theme-style');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme') || 'light';
    body.classList.add(`${currentTheme}-theme`);
    
    // Set initial theme icon
    updateThemeIcon(currentTheme);
    
    themeToggle.addEventListener('click', function() {
      if (body.classList.contains('light-theme')) {
        body.classList.remove('light-theme');
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        updateThemeIcon('dark');
      } else {
        body.classList.remove('dark-theme');
        body.classList.add('light-theme');
        localStorage.setItem('theme', 'light');
        updateThemeIcon('light');
      }
    });
    
    function updateThemeIcon(theme) {
      const themeIcon = themeToggle.querySelector('.theme-icon');
      if (theme === 'light') {
        themeIcon.textContent = '🌙';
        themeIcon.title = 'Switch to dark mode';
      } else {
        themeIcon.textContent = '☀️';
        themeIcon.title = 'Switch to light mode';
      }
    }
  });