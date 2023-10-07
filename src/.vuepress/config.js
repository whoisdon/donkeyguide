module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "A guide for donkeys",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "Where technical teams document",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['link', { rel: "icon", type: "image/png", sizes: "32x24", href: "/donkey_favicon_32_24.png" }],
    ['link', { rel: "icon", type: "image/png", sizes: "16x12", href: "/donkey_favicon_16_12.png" }],
    ['link', { rel: 'shortcut icon', type: 'image/x-icon', href: '/donkey_favicon_shortcut.ico' }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: "whoisdon/CommunityStructure",
    docsRepo: "whoisdon/CommunityStructure",
    docsBranch: "Kuruminha",
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
        link: "https://github.com/whoisdon/communitystructure/issues",
      },
    ],
    sidebar: {
      "/guide/": [
        {
          title: "Guide",
          collapsable: false,
          children: [
            "installation-preparations"
          ],
        },
      ],
    },
  },

  theme: "yuu",

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
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
