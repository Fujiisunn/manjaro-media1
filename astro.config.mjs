import { defineConfig } from 'astro/config';

// GitHub Pages サブパス用 base。
// カスタムドメイン移行時は BASE を '/' に、site を本ドメインに差し替える。
const BASE = '/manjaro-media1';

export default defineConfig({
  site: 'https://fujiisunn.github.io',
  base: BASE,
  trailingSlash: 'always',
});
