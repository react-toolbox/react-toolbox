# React Toolbox

**Original Material Design. Modern React.**

The familiar colors, typography, ripples, and motion of Material Design 1, rebuilt with React 19, TypeScript, and Tailwind CSS 4. Install components through the shadcn CLI and make the source your own.

[Documentation](https://react-toolbox.io/docs) · [Browse components](https://react-toolbox.io/docs/components) · [Theming](https://react-toolbox.io/docs/theming) · [The story](#why-i-brought-it-back)

## Get started

Start with a React 19 project using TypeScript and Tailwind CSS 4. Initialize shadcn if you haven't already:

```sh
pnpm dlx shadcn@latest init
```

Add a component:

```sh
pnpm dlx shadcn@latest add https://react-toolbox.io/r/button.json
```

Then use it:

```tsx
import { Button } from '@/components/ui/material/button';

export function Example() {
  return <Button primary raised label="Hello, Material" />;
}
```

Use your configured UI alias if it differs from `@/components/ui`. The CLI includes the required dependencies, styles, and local fonts. Material components live in their own `material/` directory, alongside any existing shadcn components.

Replace `button` with another [component family](https://react-toolbox.io/docs/components), or `all` for the full collection. The installed source belongs to your application: customize it freely, and review the diff when updating it.

See the [installation guide](https://react-toolbox.io/docs/installation) for framework setup and updates, and the [theming guide](https://react-toolbox.io/docs/theming) for CSS variables and Tailwind customization.

This is the **3.0 preview**. If you're returning from an older version, the [migration notes](docs/releases/3.0.0-next.0.md) explain what's changed.

## Why I brought it back

*A note from [Javi Velasco](https://javivelasco.com).*

Some things are worth revisiting, especially when they hold a special place in your heart.

In 2014, I fell in love with React. In early 2015, I started React Toolbox to dive deeper into it. My goal was to craft a set of components implementing Material Design.

Things were messy back then. JavaScript fatigue was real, component theming and distribution were still unsolved problems, there were countless styling libraries, and configuring Webpack required a degree in astrophysics. There was no Next.js, and SPAs were the default for modern web apps. It was a beautiful time to be a frontend engineer.

Then I got tired of open source. Maintaining the library no longer gave me the same opportunities to learn. Some major companies started using it, but they didn't even send stickers. I wasn't finding much joy in working on it anymore, and I didn't have the time to keep it going. Eventually, I abandoned it.

But React Toolbox always held a special place in my heart. It gave me a way to showcase my work and meet so many amazing people. One of them was [@rauchg](https://x.com/rauchg), who later gave me the opportunity of a lifetime: joining Vercel, after we'd met in person and I'd chased him through Twitter DMs.

For a long time, I felt bad about abandoning something I'd built with so much care. Fast-forward to today: AI made it possible to revisit the project and do work that would once have been out of reach with the time I had:

- Bring the components to React 19 and TypeScript.
- Move component styling to Tailwind CSS.
- Use Radix UI and Base UI primitives for core interactions.
- Support theming through CSS variables and Tailwind.
- Distribute editable source through the shadcn CLI.

There is no grand ambition behind this revival. It's my way of paying tribute to a project that gave me so much throughout my career.

If you feel like building something with that vintage Material Design look, give it a try.

## Contributing

Want to explore the code or contribute? The [contributing guide](CONTRIBUTING.md) covers local development, the repository layout, and verification commands.

## License

[MIT](LICENSE). Made by Javi Velasco and the React Toolbox contributors.
