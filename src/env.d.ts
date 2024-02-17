/// <reference types="astro/client" />

interface Window {
  Alpine: import('alpinejs').Alpine;
}

// https://docs.astro.build/en/guides/environment-variables/#intellisense-for-typescript
interface ImportMetaEnv {
  readonly PB_USERNAME: string;
  readonly PB_PASSWORD: string;
  readonly PB_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
