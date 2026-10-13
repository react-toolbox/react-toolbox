import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import 'react-toolbox/styles.css';
import './globals.css';

export const metadata = {
  title: 'React Toolbox · The original, renewed',
  description: 'The original React Toolbox Material Design components, running with modern React, Next.js, and Tailwind CSS.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
