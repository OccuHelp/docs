# OccuHelp Documentation Static Site

The purpose of this website is to provide documentation for the OccuHelp system. It is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

Live site: <https://docs.occuhelp.com> deployed from the `main` branch on GitHub Pages using [`.github/workflows/deploy.yml`](https://github.com/OccuHelp/docs/blob/main/.github/workflows/deploy.yml)

## Commands

### `npm run docusaurus`

**Purpose:** Runs the Docusaurus CLI directly for executing Docusaurus commands
**Options:**

- `-- --help` - Display help information
- `-- --version` - Display Docusaurus version

### `npm run start`

**Purpose:** Starts a local development server with hot reloading at `http://localhost:3000`
**Options:**

- `-- --port <port>` - Specify a custom port (default: 3000)
- `-- --host <host>` - Specify a custom host (default: localhost)
- `-- --hot-only` - Do not fallback to page refresh if hot reload fails
- `-- --no-open` - Do not open the browser automatically
- `-- --poll` - Use polling instead of watching for file changes

### `npm run build`

**Purpose:** Creates an optimized production build with static HTML/CSS/JS files
**Options:**

- `-- --bundle-analyzer` - Analyze bundle size with interactive treemap
- `-- --out-dir <dir>` - Specify output directory (default: build)
- `-- --no-minify` - Build without minifying bundles
- `-- --dev` - Build in development mode

### `npm run swizzle`

**Purpose:** Customize Docusaurus theme components by ejecting them into your project
**Options:**

- `-- <theme> <component>` - Specify theme and component to swizzle
- `-- --eject` - Eject the component for full customization
- `-- --wrap` - Wrap the component for partial customization
- `-- --danger` - Allow swizzling of unsafe components

### `npm run deploy`

**Purpose:** Deploys the built site to hosting platform (typically GitHub Pages)
**Options:**

- `-- --skip-build` - Skip the build step and deploy existing build
- `-- --out-dir <dir>` - Specify the build output directory

### `npm run clear`

**Purpose:** Clears Docusaurus cache and generated files
**Options:**

- No additional options available

### `npm run serve`

**Purpose:** Serves the production build locally for testing before deployment
**Options:**

- `-- --port <port>` - Specify a custom port (default: 3000)
- `-- --host <host>` - Specify a custom host (default: localhost)
- `-- --build` - Build the site before serving
- `-- --no-open` - Do not open the browser automatically

### `npm run write-translations`

**Purpose:** Generates translation files for internationalization (i18n) support
**Options:**

- `-- --locale <locale>` - Specify the locale to write translations for
- `-- --override` - Override existing translation files
- `-- --messagePrefix <prefix>` - Add prefix to translation messages

### `npm run write-heading-ids`

**Purpose:** Automatically adds explicit IDs to headings in markdown files for stable anchor links
**Options:**

- `-- --maintain-case` - Maintain the case of heading IDs
- `-- --overwrite` - Overwrite existing heading IDs

### `npm run typecheck`

**Purpose:** Runs TypeScript type checking to catch type errors
**Options:**

- No additional options (uses TypeScript compiler options from tsconfig.json)
