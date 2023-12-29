import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: "https://7frank.github.io",
  base: "/ai-ui-playground",
  integrations: [
    svelte(),
    starlight({
      title: "7frank.dev",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "AI Overview",
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
    }),
  ],
});
