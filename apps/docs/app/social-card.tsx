import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';
import { ToolboxMark } from './brand-icons';

const roboto = readFile(join(process.cwd(), 'node_modules/@fontsource/roboto/files/roboto-latin-400-normal.woff'));
const robotoLight = readFile(join(process.cwd(), 'node_modules/@fontsource/roboto/files/roboto-latin-300-normal.woff'));

export async function socialCard(section: 'landing' | 'docs') {
  const documentation = section === 'docs';

  return new ImageResponse(
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        background: '#ffffff',
        color: '#212121',
        fontFamily: 'Roboto',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', width: 780, padding: '56px 60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, fontSize: 30 }}>
          <ToolboxMark width={48} height={44} fill="#3f51b5" />
          <span>React Toolbox</span>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 68,
            color: '#3f51b5',
            fontSize: 18,
            letterSpacing: 3,
            textTransform: 'uppercase',
          }}
        >
          {documentation ? 'Documentation' : 'Original Material. Modern React.'}
        </div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 22,
            fontSize: 76,
            fontWeight: 300,
            lineHeight: 1.08,
            letterSpacing: -3,
          }}
        >
          <span>{documentation ? 'Build with' : 'The details'}</span>
          <div style={{ display: 'flex' }}>
            {documentation ? (
              <span style={{ color: '#3f51b5' }}>Material Design.</span>
            ) : (
              <span style={{ display: 'flex' }}>
                make the <span style={{ color: '#3f51b5', marginLeft: 16 }}>design.</span>
              </span>
            )}
          </div>
        </div>
        <div style={{ display: 'flex', marginTop: 28, color: '#757575', fontSize: 23 }}>
          {documentation
            ? 'Guides. Components. Code to make your own.'
            : 'Familiar motion. Thoughtful details. Yours to shape.'}
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 'auto',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: '#757575',
            fontSize: 18,
          }}
        >
          <span>{documentation ? 'react-toolbox.io/docs' : 'react-toolbox.io'}</span>
          <span>React · TypeScript · Tailwind CSS</span>
        </div>
      </div>
      <div
        style={{
          display: 'flex',
          position: 'relative',
          width: 420,
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#3f51b5',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 270,
            height: 310,
            background: '#7986cb',
            transform: 'rotate(-12deg)',
            borderRadius: 4,
            boxShadow: '0 12px 28px rgba(0, 0, 0, 0.18)',
          }}
        />
        <div
          style={{
            display: 'flex',
            width: 270,
            height: 310,
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 32,
            background: '#ffffff',
            borderRadius: 4,
            boxShadow: '0 16px 32px rgba(0, 0, 0, 0.24)',
          }}
        >
          <ToolboxMark width={166} height={151} fill="#3f51b5" />
          <div style={{ display: 'flex', width: 166, height: 4, background: '#c5cae9', alignItems: 'center' }}>
            <div style={{ width: 112, height: 4, background: '#3f51b5' }} />
            <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#3f51b5' }} />
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            right: 42,
            top: 435,
            width: 72,
            height: 72,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%',
            background: '#ff4081',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.28)',
          }}
        >
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14m-6-6 6 6-6 6" stroke="white" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Roboto', data: await roboto, style: 'normal', weight: 400 },
        { name: 'Roboto', data: await robotoLight, style: 'normal', weight: 300 },
      ],
    },
  );
}
