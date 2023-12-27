import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://7frank.github.io",
  base: "/ai-ui-playground",
  integrations: [
    starlight({
      title: "My Docs",
      social: {
        github: "https://github.com/withastro/starlight",
      },
      sidebar: [
        {
          label: "AI Overview",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "start here for now", link: "/ai/overview/" },
            { label: "Lesson2 Code", link: "/ai/lesson2/" },
            {
              label: "for ai topics in the medical field",
              link: "/ai/medical/",
            },
          ],
        },
        {
          label: "Guides",
          items: [
            // Each item here is one entry in the navigation menu.
            { label: "Example Guide", link: "/guides/example/" },
          ],
        },
        {
          label: "Reference",
          autogenerate: { directory: "reference" },
        },
      ],
    }),
  ],
});
