module.exports = {
  title: "A guide for donkeys",
  description: "Where technical teams document",

  head: [
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/donkey_favicon_shortcut.ico' }],
    ["meta", { name: "theme-color", content: "#190804" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    ['meta', { property: 'og:title', content: 'A guide for donkeys' }],
    ['meta', { property: 'og:description', content: 'Picture a guide... so simple even a donkey can grasp.' }],
    ['meta', { property: 'og:image', content: '/donkey.png' }],
    ['meta', { property: 'og:url', content: 'https://donkeyguide.vercel.app' }],
    ["meta", { name: "apple-mobile-web-app-status-bar-style", content: "black" } ],
  ],

  themeConfig: {
    repo: "whoisdon/donkeyguide",
    docsRepo: "whoisdon/donkeyguide",
    docsBranch: "main",
    editLinks: true,
    lastUpdated: "Last Updated",
    sidebarDepth: 3,
    nav: [
      {
        text: "Guide",
        link: "/guide/",
      },
      {
        text: "Documentation",
        link: "https://discord.js.org/",
      },
      {
        text: "Issues",
        link: "https://github.com/whoisdon/donkeyguide/issues",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [
            "installation-preparations",
            "starting-the-application",
            "advanced-implementation.md"
          ],
        },
      ],
    },
  },

  theme: "yuu",
  plugins: [
    "@vuepress/plugin-back-to-top",
    "@vuepress/plugin-medium-zoom",
    [
      "vuepress-plugin-code-copy",
      {
        align: "bottom",
        color: "#42b983",
        backgroundColor: "#42b983",
      },
    ],
  ],
};
