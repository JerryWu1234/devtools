import { component$, useSignal, useTask$, useVisibleTask$, $, isBrowser } from '@qwik.dev/core';

const THEME_STORAGE_KEY = 'vite-plugin-devtools-theme';

export const ThemeSwitcher = component$(() => {
  const themeSignal = useSignal<'light' | 'dark'>('light'); // Default for SSR, will be updated by useVisibleTask$

  // Task to initialize theme from localStorage or system preference on client-side
  useVisibleTask$(() => {
    // This block runs only in the browser
    let currentTheme: 'light' | 'dark';
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      currentTheme = storedTheme;
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      currentTheme = 'dark';
    } else {
      currentTheme = 'light';
    }
    themeSignal.value = currentTheme;
  });

  // Task to apply theme changes to DOM and localStorage
  useTask$(({ track }) => {
    track(() => themeSignal.value); // Re-run this task when themeSignal.value changes

    if (isBrowser) { // Ensure this logic runs only in the browser
      if (themeSignal.value === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem(THEME_STORAGE_KEY, themeSignal.value);
    }
  });

  // QRL for toggling the theme
  const toggleTheme = $(() => {
    themeSignal.value = themeSignal.value === 'light' ? 'dark' : 'light';
  });

  // Basic button styling using CSS variables
  const buttonStyle = {
    background: 'var(--color-card)',
    color: 'var(--color-foreground)',
    border: '1px solid var(--color-border)',
    padding: '8px',
    borderRadius: '6px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  return (
    <button
      onClick$={toggleTheme}
      title={`Switch to ${themeSignal.value === 'light' ? 'Dark' : 'Light'} Mode`}
      style={buttonStyle}
      type="button" // Good practice for buttons not submitting forms
    >
      {themeSignal.value === 'light' ? (
        // Moon Icon SVG
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      ) : (
        // Sun Icon SVG
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="5"></circle>
          <line x1="12" y1="1" x2="12" y2="3"></line>
          <line x1="12" y1="21" x2="12" y2="23"></line>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
          <line x1="1" y1="12" x2="3" y2="12"></line>
          <line x1="21" y1="12" x2="23" y2="12"></line>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
        </svg>
      )}
    </button>
  );
});

// For potential use in an index.ts file later
// export { ThemeSwitcher } from './ThemeSwitcher';
