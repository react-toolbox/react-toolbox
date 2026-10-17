import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './globals.css';
import { siteUrl } from './site-metadata';

export const metadata = {
  metadataBase: siteUrl,
  applicationName: 'React Toolbox',
  title: 'React Toolbox · The original, renewed',
  description:
    'The original React Toolbox Material Design components, running with modern React, Next.js, and Tailwind CSS.',
  authors: [{ name: 'Javi Velasco', url: 'https://github.com/javivelasco' }],
  creator: 'Javi Velasco',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
