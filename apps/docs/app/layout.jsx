import './globals.css';
import { materialIcons, siteRoboto } from './fonts';
import { siteUrl } from './site-metadata';

export const metadata = {
  metadataBase: siteUrl,
  applicationName: 'React Toolbox',
  title: 'React Toolbox · The original, renewed',
  description:
    'The original React Toolbox Material Design components, running with modern React, Next.js, and Tailwind CSS.',
  authors: [{ name: 'Javi Velasco', url: 'https://javivelasco.com' }],
  creator: 'Javi Velasco',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${siteRoboto.variable} ${materialIcons.variable}`}>
      <body>{children}</body>
    </html>
  );
}
