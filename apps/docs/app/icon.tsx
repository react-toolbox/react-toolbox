import { ImageResponse } from 'next/og';
import { ToolboxMark } from './brand-icons';

export const size = { width: 48, height: 48 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#3f51b5',
        borderRadius: 8,
      }}
    >
      <ToolboxMark width={38} height={35} fill="white" />
    </div>,
    size,
  );
}
