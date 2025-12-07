// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

const config = {
  title: 'InsightFul Saga',
  tagline: 'Story-driven learning that helps you truly understand the modern data stack',
  favicon: 'static/img/favicon.ico',

  url: 'https://www.insightfulsaga.com',
  baseUrl: '/',

  organizationName: 'facebook',
  projectName: 'docusaurus',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  

  presets: [
    [
      'classic',
      ({
        docs: false,
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        sitemap: {
          changefreq: 'weekly',
          priority: 0.5,
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],
  

  plugins: [

    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'pyspark',
        path: 'docs-pyspark',
        routeBasePath: 'pyspark',
        sidebarPath: require.resolve('./sidebars-pyspark.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'snowflake',
        path: 'docs-snowflake',
        routeBasePath: 'snowflake',
        sidebarPath: require.resolve('./sidebars-snowflake.js'),
      },
    ],
    [
      '@docusaurus/plugin-content-docs',
      {
        id: 'databricks',
        path: 'docs-databricks',
        routeBasePath: 'databricks',
        sidebarPath: require.resolve('./sidebars-databricks.js'),
      },
    ],
    [
      require.resolve('docusaurus-plugin-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexPages: true,
        indexBlog: false,
        docsRouteBasePath: ['pyspark','snowflake', 'databricks'],
        highlightSearchTermsOnTargetPage: true,
      },
    ],
  ],

  themeConfig: ({
      image: 'https://www.insightfulsaga.com/img/logo.svg',
      navbar: {
        //title: 'InsightFul Saga',
        logo: {
          alt: 'My Site Logo',
          src: 'img/logo.svg',
        },
        items: [
          // removed pyspark / snowflake / databricks 
         // { to: '/resume-templates', label: 'Resume Templates', position: 'right' },
          
          { type: 'search', position: 'right' },
        ],
        scripts: [
    // Example: add Google CSE loader (replace with the exact src Google gave you)
      {
      src: 'https://cse.google.com/cse.js?cx=c0e34643454d64093',
      async: true,
      defer: true
    }
  ],
      },

      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Pyspark',
                to: '/pyspark/pyspark-intro',
              },
              {
                label: 'Snowflake',
                to: '/snowflake/snowflake-intro',
              },
              {
                label: 'Databricks',
                to: '/databricks/databricks-intro',
              },
            ],
          },
          {
            title: 'Explore',
            items: [
              {
                label: 'About',
                to: '/about',
              },
              {
                label: 'Contact',
                to: '/contact',
              },
              {
                label: 'FAQs',
                to: '/faq',
              },
            ],
          },
          {
            title: 'Legal',
            items: [
              {
                label: 'Cookie Policy',
                to: '/cookie-policy',
              },
              {
                label: 'Terms of use',
                to: '/terms-of-use',
              },
              {
                label: 'Privacy Policy',
                to: '/privacy-policy',
              },
              {
                label: 'Disclaimer',
                to: '/disclaimer',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Insightful Saga — — Where Data Meets Narrative. Crafted with clarity. One Chapter at a Time`,
      },

      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
