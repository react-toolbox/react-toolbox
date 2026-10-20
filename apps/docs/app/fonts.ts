import localFont from 'next/font/local';

export const siteRoboto = localFont({
  src: [
    { path: '../node_modules/@fontsource/roboto/files/roboto-latin-300-normal.woff2', weight: '300' },
    { path: '../node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff2', weight: '400' },
    { path: '../node_modules/@fontsource/roboto/files/roboto-latin-500-normal.woff2', weight: '500' },
    { path: '../node_modules/@fontsource/roboto/files/roboto-latin-700-normal.woff2', weight: '700' },
  ],
  variable: '--font-roboto',
  fallback: ['Helvetica', 'Arial', 'sans-serif'],
  /** Keep the initial font for this visit if downloading it would cause a late swap. */
  display: 'optional',
});

export const materialIcons = localFont({
  src: '../node_modules/material-icons/iconfont/material-icons.woff2',
  variable: '--font-material-icons',
  display: 'block',
  preload: false,
  adjustFontFallback: false,
});
