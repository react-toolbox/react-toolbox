import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { build } from 'esbuild';
import postcss from 'postcss';
import tailwind from '@tailwindcss/postcss';
import { componentClasses } from '../helpers/component-classes.mjs';
import { cn } from '../../src/material/foundations/styles/cn.ts';

const root = fileURLToPath(new URL('../../', import.meta.url));
/** Real ligature fonts keep synthetic fixtures representative, including accessible-name checks. */
const iconStylesUrl = new URL('../../node_modules/material-icons/iconfont/material-icons.css', import.meta.url);
let iconStyles = await readFile(iconStylesUrl, 'utf8');
for (const [, font] of iconStyles.matchAll(/url\("(.+?\.woff2)"\)/g)) {
  const bytes = await readFile(new URL(font, iconStylesUrl));
  iconStyles = iconStyles.replace(`url("${font}")`, `url("data:font/woff2;base64,${bytes.toString('base64')}")`);
}
iconStyles = iconStyles.replace(/, url\(".+?\.woff"\) format\("woff"\)/g, '');

export const css =
  (
    await postcss([tailwind()]).process(
      '@layer theme, base, components, utilities; @import "tailwindcss/theme.css" layer(theme); @import "tailwindcss/utilities.css" layer(utilities) source(none); @import "./src/material/foundations/styles/styles.css"; @import "./src/material/foundations/styles/composition.css"; @source "./src/material";',
      { from: `${root}/fixture.css` },
    )
  ).css +
  `
@layer base {${iconStyles}}`;

// Synthetic DOM fixtures use the same slot classes and merger as React. Keep
// their original markup/state assertions while exercising real generated CSS.
const slots = await componentClasses(root);
const javascript = (
  await build({
    stdin: {
      resolveDir: root,
      contents: `
    import { cn } from './src/material/foundations/styles/cn';
    const slots = ${JSON.stringify(slots)};
    function apply(element) {
      if (!(element instanceof Element)) return;
      const markers = [...element.classList].filter(name => name.startsWith('rt-'));
      if (!markers.length) return;
      const value = cn(markers.map(name => slots[name] || name));
      if (element.getAttribute('class') !== value) element.setAttribute('class', value);
    }
    document.querySelectorAll('[class*="rt-"]').forEach(apply);
    new MutationObserver(records => records.forEach(record => apply(record.target)))
      .observe(document.body, { subtree: true, attributes: true, attributeFilter: ['class'] });
  `,
    },
    bundle: true,
    write: false,
    format: 'iife',
  })
).outputFiles[0].text;

export async function setMaterialContent(page, html) {
  /** Classes must be present on first paint, just as in React, without starting unrelated transitions.
   * Escape selector quotes in the HTML attribute; setAttribute below handles them directly. */
  const styled = html.replace(
    /\bclass="([^"]*)"/g,
    (_, value) =>
      `class="${cn(value.split(/\s+/).map((name) => slots[name] || name))
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')}"`,
  );
  await page.setContent(styled);
  await page.addScriptTag({ content: javascript });
}
