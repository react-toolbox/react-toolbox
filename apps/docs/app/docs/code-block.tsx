import { Fragment } from 'react';
import { createHighlighterCore, type ThemeRegistration } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import tsx from 'shiki/langs/tsx.mjs';
import json from 'shiki/langs/json.mjs';
import shell from 'shiki/langs/shellscript.mjs';
import css from 'shiki/langs/css.mjs';
import CopyCodeButton from './copy-code-button';

// Syntax roles are a docs convention, using dark M1 palette shades with at
// least 4.5:1 contrast on Grey 50. M1 does not prescribe a syntax color scheme.
const materialCodeTheme: ThemeRegistration = {
  name: 'material-docs',
  type: 'light',
  colors: { 'editor.background': '#FAFAFA', 'editor.foreground': '#212121' },
  tokenColors: [
    { scope: ['comment', 'punctuation.definition.comment'], settings: { foreground: '#616161' } },
    { scope: ['keyword', 'storage'], settings: { foreground: '#512DA8' } },
    { scope: ['string'], settings: { foreground: '#00695C' } },
    { scope: ['constant.numeric', 'constant.language'], settings: { foreground: '#BF360C' } },
    { scope: ['entity.name.function', 'support.function'], settings: { foreground: '#1565C0' } },
    { scope: ['entity.name.type', 'entity.name.tag', 'support.class'], settings: { foreground: '#303F9F' } },
    { scope: ['entity.other.attribute-name', 'support.type.property-name'], settings: { foreground: '#37474F' } },
  ],
};

// Only Server Components import this module. Code tabs receive rendered React
// content, keeping the highlighter and its grammars out of client bundles.
const highlighter = createHighlighterCore({
  themes: [materialCodeTheme],
  langs: [tsx, json, shell, css],
  engine: createJavaScriptRegexEngine(),
});

export default async function CodeBlock({
  code,
  label = 'Code',
  language = 'tsx',
}: {
  code: string;
  label?: string;
  language?: 'tsx' | 'Terminal' | 'components.json' | 'css';
}) {
  const lang = language === 'Terminal' ? 'shellscript' : language === 'components.json' ? 'json' : language;
  const { tokens } = (await highlighter).codeToTokens(code, { lang, theme: 'material-docs' });
  return (
    <div className="min-w-0 overflow-hidden rounded-toolbox border border-toolbox-divider bg-(--palette-grey-50)">
      <div className="flex min-h-toolbox-touch items-center justify-between border-b border-toolbox-divider pr-2 pl-4 text-xs text-toolbox-text-secondary">
        <span>{language}</span>
        <CopyCodeButton code={code} label={label} />
      </div>
      <pre className="m-0 overflow-x-auto p-4 text-toolbox-body-desktop/6" aria-label={label} tabIndex={0}>
        <code>
          {tokens.map((line, lineIndex) => (
            <Fragment key={lineIndex}>
              {line.map((token, tokenIndex) => (
                <span key={tokenIndex} style={{ color: token.color }}>
                  {token.content}
                </span>
              ))}
              {lineIndex < tokens.length - 1 ? '\n' : null}
            </Fragment>
          ))}
        </code>
      </pre>
    </div>
  );
}
