# MDX Linting Setup

This project includes custom linting to catch MDX/JSX syntax errors before they reach the Docusaurus dev server.

## Available Commands

### Run Linting

```bash
npm run lint
```

This runs the custom MDX linter that checks for common issues like unescaped angle brackets.

### Specific Linters

**MDX Linter** (catches JSX/MDX syntax issues):

```bash
npm run lint:mdx
```

## What Gets Checked

The MDX linter specifically catches:

- **Unescaped angle brackets followed by numbers**: `<4`, `<60%`, `<10 a.m.`
  - These break MDX/JSX parsing because `<` is interpreted as the start of a JSX tag
  - **Fix**: Use HTML entity `&lt;` instead of `<`
  - Example: `relative humidity <60%` → `relative humidity &lt;60%`

## Common Issues and Fixes

### Issue: "Unexpected character `6` before name"

This error occurs when you have an unescaped `<` followed by a number in your markdown.

**Example:**

```markdown
- Effective only when humidity <60%
```

**Fix:**

```markdown
- Effective only when humidity &lt;60%
```

### Why This Matters

MDX treats `<` as the start of a JSX component. When it sees `<60%`, it tries to parse `60%` as a component name, which fails because component names can't start with numbers.

## Integration with Development

Before committing changes, run:

```bash
npm run lint
```

This will catch issues early and prevent compilation errors in the dev server.

## Files Checked

- `blog/**/*.md` - All blog posts
- `docs-*/**/*.md` - All documentation files

## Configuration

- `.markdownlint.json` - Markdown linting rules (currently disabled for most rules)
- `scripts/lint-mdx.js` - Custom MDX syntax checker

