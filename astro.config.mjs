import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";
import starlightLinksValidator from 'starlight-links-validator'

import plantuml from './plugins/rollup-plugin-plantuml';

// https://astro.build/config
export default defineConfig({
  site: "https://7frank.github.io",
  base: "/ai-ui-playground",
  vite:{
     plugins:[plantuml()]
  },
  integrations: [
    svelte(),
    starlight({
      title: "7frank.dev",
      customCss: [
        // Relative Pfad zur eigenen CSS Datei
        "./src/styles/custom.css",
      ],
      plugins:[
                starlightLinksValidator({errorOnRelativeLinks:false })
      ],
      social: {
        github: "https://github.com/7frank/ai-ui-playground/",
      },
      sidebar: [
        {
          label: "Artificial Intelligence (AI)",
          autogenerate: {
            directory: "ai",
          },
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
          collapsed: true,
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
          collapsed: true,
        },
      ],
      lastUpdated:true
    }),
  ],
});
