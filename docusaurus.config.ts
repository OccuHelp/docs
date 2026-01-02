import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'OccuHelp Systems',
  tagline: 'Documentation for OccuHelp',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.occuhelp.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'OccuHelp', // Usually your GitHub org/user name.
  projectName: 'docs', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // SEO: Global head tags for all pages
  headTags: [
    // Verify site ownership (add your verification codes here when ready)
    // {
    //   tagName: 'meta',
    //   attributes: {
    //     name: 'google-site-verification',
    //     content: 'YOUR_GOOGLE_VERIFICATION_CODE',
    //   },
    // },
    {
      tagName: 'meta',
      attributes: {
        name: 'keywords',
        content: 'OccuHelp, workplace safety, occupational health, ergonomics, OSHA recordkeeping, injury tracking, risk analysis, job analysis, workplace wellness, employee safety, MSK rehab, incident management',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'canonical',
        href: 'https://docs.occuhelp.com',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: false, // Disable default docs
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
          // Show recent posts in sidebar (used by custom BlogSidebar)
          blogSidebarCount: 'ALL',
          blogSidebarTitle: 'Recent Posts',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
        // SEO: Sitemap configuration
        sitemap: {
          lastmod: 'date',
          changefreq: 'weekly',
          priority: 0.5,
          ignorePatterns: ['/tags/**'],
          filename: 'sitemap.xml',
        },
        // SEO: Google Tag Manager (uncomment and add ID when ready)
        // gtag: {
        //   trackingID: 'G-XXXXXXXXXX',
        //   anonymizeIP: true,
        // },
      } satisfies Preset.Options,
    ],
  ],

  plugins: [
    // Custom plugin to expose blog posts to global data
    './plugins/blog-global-data',
    // SEO: Structured data (JSON-LD) for search engines
    './plugins/seo-structured-data',
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'general',
        path: 'docs-general',
        routeBasePath: 'general',
        sidebarPath: './sidebars-general.ts',
        editUrl: 'https://github.com/OccuHelp/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'account',
        path: 'docs-account',
        routeBasePath: 'account',
        sidebarPath: './sidebars-account.ts',
        editUrl: 'https://github.com/OccuHelp/docs/tree/main/',
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'security',
        path: 'docs-security',
        routeBasePath: 'security',
        sidebarPath: './sidebars-security.ts',
        editUrl: 'https://github.com/OccuHelp/docs/tree/main/',
      },
    ],
  ],

  themeConfig: {
    // SEO: Metadata for all pages (goes in <head>)
    metadata: [
      {name: 'description', content: 'Official documentation and help center for OccuHelp - workplace safety, occupational health management, ergonomics, OSHA compliance, injury tracking, and risk analysis software.'},
      {name: 'og:type', content: 'website'},
      {name: 'og:site_name', content: 'OccuHelp Documentation'},
      {name: 'twitter:card', content: 'summary_large_image'},
      {name: 'twitter:site', content: '@occuhelp'},
      {name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'},
    ],
    // Social card image for link previews
    image: 'img/occuhelp-social-card.png',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // Disable table of contents on blog posts
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    navbar: {
      title: 'OccuHelp',
      logo: {
        alt: 'OccuHelp Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'generalSidebar',
          docsPluginId: 'general',
          position: 'left',
          label: 'General',
        },
        {
          type: 'docSidebar',
          sidebarId: 'accountSidebar',
          docsPluginId: 'account',
          position: 'left',
          label: 'Account',
        },
        {
          type: 'docSidebar',
          sidebarId: 'securitySidebar',
          docsPluginId: 'security',
          position: 'left',
          label: 'Security',
        },
        {
          to: '/blog',
          position: 'left',
          label: 'Blog',
        },
        {
          href: 'https://OccuHelp.com',
          label: 'Website',
          position: 'right',
        },
        {
          href: 'https://app.occuhelp.com',
          label: 'Login',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      // links: [
      //   {
      //     title: 'Docs',
      //     items: [
      //       {
      //         label: 'Tutorial',
      //         to: '/docs/intro',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'Community',
      //     items: [
      //       {
      //         label: 'Stack Overflow',
      //         href: 'https://stackoverflow.com/questions/tagged/docusaurus',
      //       },
      //       {
      //         label: 'Discord',
      //         href: 'https://discordapp.com/invite/docusaurus',
      //       },
      //       {
      //         label: 'X',
      //         href: 'https://x.com/docusaurus',
      //       },
      //     ],
      //   },
      //   {
      //     title: 'More',
      //     items: [
      //       {
      //         label: 'Blog',
      //         to: '/blog',
      //       },
      //       {
      //         label: 'GitHub',
      //         href: 'https://github.com/facebook/docusaurus',
      //       },
      //     ],
      //   },
      // ],
      copyright: `Copyright © ${new Date().getFullYear()} OccuHelp`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
