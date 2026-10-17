import type { Metadata } from 'next';
import Gallery from '../gallery';

export const metadata: Metadata = {
  title: 'Component playground · React Toolbox',
  robots: { index: false, follow: false },
};

export default function PlaygroundPage() {
  return <Gallery />;
}
