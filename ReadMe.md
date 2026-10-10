# wshihadeh.github.io

Personal site, hosted on GitHub Pages.

| Path | What it is |
|------|------------|
| `web/` | [Astro](https://astro.build) landing page, served at `/` |
| `docs/` | [MkDocs Material](https://squidfunk.github.io/mkdocs-material/) documentation, served at `/docs/` |

## Build

Everything runs in Docker, so only Docker and `make` are needed:

```sh
make docs        # lint, build the landing page, then build the docs into docs/site
make docs-serve  # live-reload the documentation on http://localhost:8000
```

For landing page work, run `npm install && npm run dev` inside `web/`.

## Deploy

Pushing to the `source` branch triggers `.github/workflows/source.yml`, which runs
`make docs` and publishes `docs/site` to the `master` branch.

Blog posts and projects shown on the landing page are plain data in
`web/src/data/posts.json` and `web/src/data/projects.json`.
