# Push Liquid theme to `tway-liquid` GitHub repo

Lovable's built-in GitHub sync is tied to this project's React codebase, so it can't push a subfolder to a different repo. We'll use the GitHub connector instead to upload the contents of `shopify-theme/` into your existing `tway-liquid` repo.

## What I need from you

1. The GitHub **owner/org name** for the repo (e.g. `yourusername/tway-liquid`).
2. Confirm the repo is currently **empty** (or say if I should overwrite/branch).
3. Target branch — default `main` unless you say otherwise.

## Steps

1. **Connect GitHub** via the connector (`standard_connectors--connect` → `github`). You'll authorize a personal access token with `repo` scope so I can write to `tway-liquid`.
2. **Verify the repo** exists and read its default branch via the GitHub REST API through the connector gateway.
3. **Upload the theme files** — walk every file under `shopify-theme/` (assets, config, layout, sections, snippets, templates, locales) and PUT each one to `repos/{owner}/tway-liquid/contents/{path}` with base64 content. Binary assets (PNG/JPG/WebP) are uploaded the same way.
4. **Commit message**: `Initial Shopify theme import from Lovable`.
5. **Verify** by listing the repo tree and confirming file count matches the local `shopify-theme/` folder.

## After it's pushed

You'll have two workflows available:

- **Shopify GitHub integration** — in Shopify admin → Online Store → Themes → Add theme → Connect from GitHub → pick `tway-liquid`. Shopify then auto-syncs commits to that theme.
- **Shopify CLI locally** — `git clone` the repo, run `shopify theme dev --store=tway-motorsports-8sf51j39` for a true live preview against your dev store.

Future edits: I can either commit directly to `tway-liquid` from here via the connector, or you can edit locally and push — both work with Shopify's GitHub sync.

## Notes / limitations

- GitHub Contents API has a 100 MB per-file limit; all bundled images are well under that.
- If the repo already has files, tell me whether to overwrite, create a new branch, or bail.
- The React project in this Lovable workspace stays untouched — it continues to sync to its own repo via Lovable's built-in Git sync.
