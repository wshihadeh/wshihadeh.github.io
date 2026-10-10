import { defineConfig } from 'astro/config';

// The landing page is built to ../docs/site (the folder GitHub Pages deploys).
// MkDocs then writes the documentation into ../docs/site/docs.
const docsPages = [
  'Blog',
  'actions/Docker-Deployment',
  'ruby-gems/DeepHealthCheck',
  'ruby-gems/DelayedJobMetrics',
  'ruby-gems/DockerMetadata',
  'ruby-gems/EmptyKeys',
  'ruby-gems/IRBTracker',
  'ruby-gems/Key-ValueParser',
  'ruby-gems/Orca',
  'ruby-gems/RabbitMQ',
  'ruby-gems/RecordSplitter',
];

export default defineConfig({
  site: 'https://shihadeh.dev',
  outDir: '../docs/site',
  trailingSlash: 'always',
  // GitHub Pages runs Jekyll, which skips folders starting with "_" (Astro's default
  // is "_astro"), so the build assets must live in a folder with a plain name.
  build: { format: 'directory', assets: 'assets' },
  // Keep the pre-redesign URLs working now that the docs live under /docs/.
  redirects: Object.fromEntries(docsPages.map((p) => [`/${p}/`, `/docs/${p}/`])),
});
