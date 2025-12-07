// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar1: [
    {
      type: 'category',
      label: 'Snowflake Foundation (Beginner Level)',
      items: [
        'snowflake-intro',
        'snowflake-architecture',
        'snowflake-virtual-warehouses',
        'snowflake-object-hierarchy',
        'snowflake-editions',
        'snowflake-costs-best-practices',
        'snowflake-vs-traditional-databases',
        'snowflake-rbac-user-roles',
        'snowflake-web-ui-tour',
        'snowflake-sql-basics',
      ],
    },
    {
      type: 'category',
      label: 'Data Loading & Staging',
      items: [
        'snowflake-internal-table-user-stages',
        'snowflake-external-stages',
        'snowflake-file-formats',
        'snowflake-copy-into-command',
        'snowflake-snowpipe',
        'snowflake-incremental-loading-cdc',
        'snowflake-tasks-cron',
        'snowflake-large-files-optimization',
      ],
    },
    {
      type: 'category',
      label: 'Core Snowflake SQL & Data Engineering Concepts',
      items: [
        'snowflake-data-types-explained',
        'snowflake-clustering-keys-explained',
        'snowflake-micro-partitions',
        'snowflake-time-travel-fail-safe',
        'snowflake-zero-copy-cloning',
        'snowflake-streams',
        'snowflake-tasks',
        'snowflake-materialized-views',
        'snowflake-secure-views',
      ],
    },
    {
      type: 'category',
      label: 'Performance Tuning & Optimization',
      items: [
        'snowflake-warehouse-sizing',
        'snowflake-automatic-query-optimization',
        'snowflake-query-profile',
        'snowflake-caching',
        'snowflake-performance-tuning',
        'snowflake-semi-structured-data',
        'snowflake-flatten-variant',
      ],
    },
    {
      type: 'category',
      label: 'Enterprise Features (Advanced Level)',
      items: [
        'snowflake-sharing-marketplace-exchange-secure-shares',
        'snowflake-governance-access-control-tags-policies',
        'snowflake-dynamic-data-masking-use-cases',
        'snowflake-row-access-policies-rls',
        'snowflake-costs-billing-dashboard-monitoring',
        'snowflake-python-pyspark-databricks-integration',
      ],
    },
  ],
};

export default sidebars;
