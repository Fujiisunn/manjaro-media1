import { defineConfig } from 'astro/config';

// カスタムドメイン (glp-navi.com) 配下、ルート配信
const BASE = '/';

export default defineConfig({
  site: 'https://glp-navi.com',
  base: BASE,
  trailingSlash: 'always',
});
