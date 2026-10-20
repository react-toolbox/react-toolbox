import { socialCard } from './social-card';

export const alt = 'React Toolbox — The details make the design.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return socialCard('landing');
}
