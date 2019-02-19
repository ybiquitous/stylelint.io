/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.
const users = [
  {
    caption: "User1",
    // You will need to prepend the image path with your baseUrl
    // if it is not '/', like: '/test-site/img/docusaurus.svg'.
    image: "/img/docusaurus.svg",
    infoLink: "https://www.facebook.com",
    pinned: true
  }
];

const siteConfig = {
  title: "stylelint", // Title for your website.
  tagline:
    "A mighty, modern linter that helps you avoid errors and enforce conventions in your styles",
  url: "https://stylelint.io", // Your website URL
  baseUrl: "/", // Base URL for your project */
  // For github.io type URLs, you would set the url and baseUrl like:
  //   url: 'https://facebook.github.io',
  //   baseUrl: '/test-site/',

  // Used for publishing and more
  projectName: "stylelint",
  organizationName: "facebook",
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'

  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    { doc: "user-guide", label: "User guide" },
    { doc: "user-guide/rules", label: "Rules" },
    { doc: "user-guide/plugins", label: "Plugins" },
    { doc: "user-guide/processors", label: "Processors" },
    { doc: "developer-guide", label: "Developer guide" },
    { doc: "demo/index", label: "Demo" }
  ],

  // If you have users set above, you add it here:
  users,

  /* path to images for header/footer */
  headerIcon: "img/logo.svg",
  footerIcon: "img/logo.svg",
  favicon: "img/favicon-192x192.png",

  /* Colors for website */
  colors: {
    primaryColor: "#263238",
    secondaryColor: "#546e7a"
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} stylelint`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: "default"
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: ["https://buttons.github.io/buttons.js"],

  // On page navigation for the current documentation page.
  onPageNav: "separate",
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: "img/docusaurus.png",
  twitterImage: "img/docusaurus.png",

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',

  docsUrl: "",
  docsSideNavCollapsible: true,
  disableHeaderTitle: true
};

module.exports = siteConfig;
