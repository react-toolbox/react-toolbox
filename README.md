# React Toolbox

The original Material Design 1 components for modern React, TypeScript, and Tailwind CSS, installed as editable source through the shadcn registry.

**Documentation:** https://react-toolbox.io

## Install

Start with React 19, TypeScript, and Tailwind CSS 4. Initialize shadcn once, then add a component:

```sh
pnpm dlx shadcn@latest init
pnpm dlx shadcn@latest add https://react-toolbox.io/r/button.json
```

```tsx
import { Button } from '@/components/ui/material/button';

export function Save() {
  return <Button primary raised label="Save" />;
}
```

Replace `button` with another family name, or `all`. The copied source, styles, and fonts belong to your application: edit them freely, and review the diff when you add a family again. The [source registry guide](docs/source-registry.md) covers available items, framework setup, theming, migration, and updates.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development, verification, repository layout, and maintainer guides.

## License

[MIT](LICENSE). Original project and design implementation by Javier Velasco Arjona and the React Toolbox contributors.
