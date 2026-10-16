import type { Metadata } from 'next';
import DocsArticle, { DocsSection } from '../article';
import CodeBlock from '../code-block';
import { ActionRecipes, AvatarRecipes, FormRecipe, TableRecipe, SnackbarRecipe } from './recipes';

export const metadata: Metadata = { title: 'Recipes · React Toolbox' };

export default function RecipesPage() {
  return (
    <DocsArticle
      title="Recipes"
      description="Editable application patterns composed from Material components."
      sections={[
        { id: 'actions', title: 'Async actions' },
        { id: 'avatars', title: 'People' },
        { id: 'forms', title: 'Forms' },
        { id: 'tables', title: 'Data tables' },
        { id: 'messages', title: 'Message queue' },
      ]}
    >
      <p className="mb-6 text-toolbox-body/6">
        Install the examples as source and adapt their application behavior. Loading and destructive actions, avatar
        groups, native forms, and data operations add no dependencies to the core components.
      </p>
      <CodeBlock
        language="Terminal"
        label="Install application recipes"
        code="pnpm dlx shadcn@latest add https://react-toolbox.io/r/example-recipes.json https://react-toolbox.io/r/example-snackbar-queue.json"
      />
      <DocsSection id="actions" title="Async and destructive actions">
        <p className="mb-6 text-toolbox-body/6">
          Pending actions expose their busy state and prevent repeated submission. Confirmation focuses Cancel, keeps
          failures open for retry, and delegates persistence to your callback. These demos change only local state.
        </p>
        <ActionRecipes />
      </DocsSection>
      <DocsSection id="avatars" title="Groups and presence">
        <p className="mb-6 text-toolbox-body/6">
          Overflow members retain accessible names. Presence is announced as text as well as displayed with color.
        </p>
        <AvatarRecipes />
      </DocsSection>
      <DocsSection id="forms" title="Native form composition">
        <p className="mb-6 text-toolbox-body/6">
          Persistent help, prefix and suffix content, password reveal, validation, and reset compose around Input. The
          submit callback receives FormData; connect it to your application or form library.
        </p>
        <FormRecipe />
      </DocsSection>
      <DocsSection id="tables" title="Filter, sort, select and paginate">
        <p className="mb-6 text-toolbox-body/6">
          Selection uses stable record IDs across filtering, sorting, and pages. The header selects the current page.
          Keep remote fetching and larger data engines in the application; Table remains native markup.
        </p>
        <TableRecipe />
      </DocsSection>
      <DocsSection id="messages" title="One message at a time">
        <p className="mb-6 text-toolbox-body/6">
          The queue shows messages in arrival order and tracks a promise from pending to success or failure. It returns
          the original result or error so application control flow remains explicit.
        </p>
        <SnackbarRecipe />
      </DocsSection>
    </DocsArticle>
  );
}
