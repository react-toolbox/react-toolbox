import { ImageResponse } from 'next/og';
import { ToolboxMark } from './brand-icons';

export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#3f51b5',
      }}
    >
      <ToolboxMark width={126} height={115} fill="white" />
    </div>,
    size,
  );
}
