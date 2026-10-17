import { socialCard } from '../social-card';

export const alt = 'React Toolbox documentation — Build with Material Design.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return socialCard('docs');
}
