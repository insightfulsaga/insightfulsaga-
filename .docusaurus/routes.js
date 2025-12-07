import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/about/',
    component: ComponentCreator('/about/', 'fdd'),
    exact: true
  },
  {
    path: '/contact',
    component: ComponentCreator('/contact', 'b83'),
    exact: true
  },
  {
    path: '/cookie-policy',
    component: ComponentCreator('/cookie-policy', '358'),
    exact: true
  },
  {
    path: '/disclaimer',
    component: ComponentCreator('/disclaimer', '76d'),
    exact: true
  },
  {
    path: '/faq',
    component: ComponentCreator('/faq', '0a0'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '3d7'),
    exact: true
  },
  {
    path: '/privacy-policy',
    component: ComponentCreator('/privacy-policy', '524'),
    exact: true
  },
  {
    path: '/purpose/',
    component: ComponentCreator('/purpose/', 'c6e'),
    exact: true
  },
  {
    path: '/resume-templates',
    component: ComponentCreator('/resume-templates', '131'),
    exact: true
  },
  {
    path: '/resume-templates/data-engineer-senior',
    component: ComponentCreator('/resume-templates/data-engineer-senior', '2ba'),
    exact: true
  },
  {
    path: '/roadmap',
    component: ComponentCreator('/roadmap', '610'),
    exact: true
  },
  {
    path: '/search',
    component: ComponentCreator('/search', '044'),
    exact: true
  },
  {
    path: '/terms-of-use',
    component: ComponentCreator('/terms-of-use', 'f42'),
    exact: true
  },
  {
    path: '/databricks',
    component: ComponentCreator('/databricks', '7f2'),
    routes: [
      {
        path: '/databricks',
        component: ComponentCreator('/databricks', '6f3'),
        routes: [
          {
            path: '/databricks/tags',
            component: ComponentCreator('/databricks/tags', 'a6b'),
            exact: true
          },
          {
            path: '/databricks/tags/ai-analytics',
            component: ComponentCreator('/databricks/tags/ai-analytics', 'b7c'),
            exact: true
          },
          {
            path: '/databricks/tags/dashboards',
            component: ComponentCreator('/databricks/tags/dashboards', '724'),
            exact: true
          },
          {
            path: '/databricks/tags/databricks',
            component: ComponentCreator('/databricks/tags/databricks', '420'),
            exact: true
          },
          {
            path: '/databricks/tags/m-lflow',
            component: ComponentCreator('/databricks/tags/m-lflow', '7e3'),
            exact: true
          },
          {
            path: '/databricks/tags/machine-learning',
            component: ComponentCreator('/databricks/tags/machine-learning', '1df'),
            exact: true
          },
          {
            path: '/databricks',
            component: ComponentCreator('/databricks', '809'),
            routes: [
              {
                path: '/databricks/auditing-monitoring-logs-events-access-monitoring',
                component: ComponentCreator('/databricks/auditing-monitoring-logs-events-access-monitoring', '7c1'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/autoloader-cloudfiles-ingestion',
                component: ComponentCreator('/databricks/autoloader-cloudfiles-ingestion', '0fb'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/cluster-vs-sql-warehouse',
                component: ComponentCreator('/databricks/cluster-vs-sql-warehouse', '0f1'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-alerts-email-slack',
                component: ComponentCreator('/databricks/databricks-alerts-email-slack', '504'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-architecture',
                component: ComponentCreator('/databricks/databricks-architecture', '585'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-caching-best-practices',
                component: ComponentCreator('/databricks/databricks-caching-best-practices', '144'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-catalog-schema-table-permissions-rbac',
                component: ComponentCreator('/databricks/databricks-catalog-schema-table-permissions-rbac', '228'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-cluster-policies',
                component: ComponentCreator('/databricks/databricks-cluster-policies', '657'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-cluster-sizing',
                component: ComponentCreator('/databricks/databricks-cluster-sizing', '2ee'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-dataflow',
                component: ComponentCreator('/databricks/databricks-dataflow', 'd94'),
                exact: true
              },
              {
                path: '/databricks/databricks-dbfs',
                component: ComponentCreator('/databricks/databricks-dbfs', '4bd'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-editions',
                component: ComponentCreator('/databricks/databricks-editions', '8a4'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-end-to-end-demo',
                component: ComponentCreator('/databricks/databricks-end-to-end-demo', '51b'),
                exact: true
              },
              {
                path: '/databricks/databricks-file-compaction',
                component: ComponentCreator('/databricks/databricks-file-compaction', '823'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-governance-tags-classifications-policies',
                component: ComponentCreator('/databricks/databricks-governance-tags-classifications-policies', '1c2'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-interview-part1',
                component: ComponentCreator('/databricks/databricks-interview-part1', '58c'),
                exact: true
              },
              {
                path: '/databricks/databricks-interview-part2',
                component: ComponentCreator('/databricks/databricks-interview-part2', '66d'),
                exact: true
              },
              {
                path: '/databricks/databricks-interview-part3',
                component: ComponentCreator('/databricks/databricks-interview-part3', 'ecb'),
                exact: true
              },
              {
                path: '/databricks/databricks-interview-part4',
                component: ComponentCreator('/databricks/databricks-interview-part4', 'f95'),
                exact: true
              },
              {
                path: '/databricks/databricks-interview-part5',
                component: ComponentCreator('/databricks/databricks-interview-part5', 'c02'),
                exact: true
              },
              {
                path: '/databricks/databricks-intro',
                component: ComponentCreator('/databricks/databricks-intro', '7f8'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-jobs-scheduling-batch-processing',
                component: ComponentCreator('/databricks/databricks-jobs-scheduling-batch-processing', '707'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-login-guide',
                component: ComponentCreator('/databricks/databricks-login-guide', 'b57'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-managed-vs-external-tables',
                component: ComponentCreator('/databricks/databricks-managed-vs-external-tables', 'f42'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-materialized-views',
                component: ComponentCreator('/databricks/databricks-materialized-views', '63a'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-ml-ai-dashboards',
                component: ComponentCreator('/databricks/databricks-ml-ai-dashboards', 'cbe'),
                exact: true
              },
              {
                path: '/databricks/databricks-monitoring-dashboard',
                component: ComponentCreator('/databricks/databricks-monitoring-dashboard', '7b4'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-multi-task-job-workflows',
                component: ComponentCreator('/databricks/databricks-multi-task-job-workflows', 'ff3'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-notebooks-basics',
                component: ComponentCreator('/databricks/databricks-notebooks-basics', '86e'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-optimize-zorder',
                component: ComponentCreator('/databricks/databricks-optimize-zorder', 'c1c'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-photon-engine',
                component: ComponentCreator('/databricks/databricks-photon-engine', '38c'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-pricing',
                component: ComponentCreator('/databricks/databricks-pricing', '8be'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-real-world-project',
                component: ComponentCreator('/databricks/databricks-real-world-project', '9a7'),
                exact: true
              },
              {
                path: '/databricks/databricks-repos-ci-cd',
                component: ComponentCreator('/databricks/databricks-repos-ci-cd', '753'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-security-basics',
                component: ComponentCreator('/databricks/databricks-security-basics', '244'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-sql-endpoint-tuning',
                component: ComponentCreator('/databricks/databricks-sql-endpoint-tuning', '764'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-sql-n-dashboards',
                component: ComponentCreator('/databricks/databricks-sql-n-dashboards', '532'),
                exact: true
              },
              {
                path: '/databricks/databricks-workflows-production-orchestration',
                component: ComponentCreator('/databricks/databricks-workflows-production-orchestration', '5ed'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/databricks-workspace-ui-tour',
                component: ComponentCreator('/databricks/databricks-workspace-ui-tour', 'cdc'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/dbsql-dashboards-and-alerts',
                component: ComponentCreator('/databricks/dbsql-dashboards-and-alerts', 'add'),
                exact: true
              },
              {
                path: '/databricks/delta-lake-core',
                component: ComponentCreator('/databricks/delta-lake-core', 'ebf'),
                exact: true
              },
              {
                path: '/databricks/delta-lake-overview',
                component: ComponentCreator('/databricks/delta-lake-overview', 'bac'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/delta-live-tables-dlt-pipelines',
                component: ComponentCreator('/databricks/delta-live-tables-dlt-pipelines', 'cc3'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/improving-lakehouse-performance',
                component: ComponentCreator('/databricks/improving-lakehouse-performance', '389'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/lakehouse-concept',
                component: ComponentCreator('/databricks/lakehouse-concept', 'f05'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/lakehouse-federation-query-external-cloud-databases',
                component: ComponentCreator('/databricks/lakehouse-federation-query-external-cloud-databases', 'c04'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/lakehouse-medallion-model',
                component: ComponentCreator('/databricks/lakehouse-medallion-model', '4a6'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/mounting-cloud-storage',
                component: ComponentCreator('/databricks/mounting-cloud-storage', 'cfd'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/organize-projects-databricks',
                component: ComponentCreator('/databricks/organize-projects-databricks', 'eec'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/performance-optimization',
                component: ComponentCreator('/databricks/performance-optimization', 'e4c'),
                exact: true
              },
              {
                path: '/databricks/performance-optimization1',
                component: ComponentCreator('/databricks/performance-optimization1', '9f7'),
                exact: true
              },
              {
                path: '/databricks/secret-scopes-secure-credential-management',
                component: ComponentCreator('/databricks/secret-scopes-secure-credential-management', '05e'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/service-principals-machine-identity-for-automation',
                component: ComponentCreator('/databricks/service-principals-machine-identity-for-automation', 'd7f'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/table-column-lineage-data-tracking',
                component: ComponentCreator('/databricks/table-column-lineage-data-tracking', '573'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/unity-catalog-central-governance',
                component: ComponentCreator('/databricks/unity-catalog-central-governance', '039'),
                exact: true,
                sidebar: "tutorialSidebar2"
              },
              {
                path: '/databricks/unity-catalog-data-quality',
                component: ComponentCreator('/databricks/unity-catalog-data-quality', 'd9f'),
                exact: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/pyspark',
    component: ComponentCreator('/pyspark', '885'),
    routes: [
      {
        path: '/pyspark',
        component: ComponentCreator('/pyspark', '0a9'),
        routes: [
          {
            path: '/pyspark/tags',
            component: ComponentCreator('/pyspark/tags', '43a'),
            exact: true
          },
          {
            path: '/pyspark/tags/aggregations',
            component: ComponentCreator('/pyspark/tags/aggregations', '494'),
            exact: true
          },
          {
            path: '/pyspark/tags/apache-spark',
            component: ComponentCreator('/pyspark/tags/apache-spark', '1b1'),
            exact: true
          },
          {
            path: '/pyspark/tags/arrays',
            component: ComponentCreator('/pyspark/tags/arrays', '516'),
            exact: true
          },
          {
            path: '/pyspark/tags/avro',
            component: ComponentCreator('/pyspark/tags/avro', '0cd'),
            exact: true
          },
          {
            path: '/pyspark/tags/aws-emr',
            component: ComponentCreator('/pyspark/tags/aws-emr', 'c55'),
            exact: true
          },
          {
            path: '/pyspark/tags/azure-synapse',
            component: ComponentCreator('/pyspark/tags/azure-synapse', '0e2'),
            exact: true
          },
          {
            path: '/pyspark/tags/beginner',
            component: ComponentCreator('/pyspark/tags/beginner', 'a2a'),
            exact: true
          },
          {
            path: '/pyspark/tags/big-data',
            component: ComponentCreator('/pyspark/tags/big-data', '426'),
            exact: true
          },
          {
            path: '/pyspark/tags/broadcast-join',
            component: ComponentCreator('/pyspark/tags/broadcast-join', 'e43'),
            exact: true
          },
          {
            path: '/pyspark/tags/bucketing',
            component: ComponentCreator('/pyspark/tags/bucketing', '84b'),
            exact: true
          },
          {
            path: '/pyspark/tags/catalyst-optimizer',
            component: ComponentCreator('/pyspark/tags/catalyst-optimizer', 'cf2'),
            exact: true
          },
          {
            path: '/pyspark/tags/checkpoints',
            component: ComponentCreator('/pyspark/tags/checkpoints', 'a6d'),
            exact: true
          },
          {
            path: '/pyspark/tags/classification',
            component: ComponentCreator('/pyspark/tags/classification', '10e'),
            exact: true
          },
          {
            path: '/pyspark/tags/cluster-computing',
            component: ComponentCreator('/pyspark/tags/cluster-computing', '566'),
            exact: true
          },
          {
            path: '/pyspark/tags/cluster-manager',
            component: ComponentCreator('/pyspark/tags/cluster-manager', '574'),
            exact: true
          },
          {
            path: '/pyspark/tags/clustering',
            component: ComponentCreator('/pyspark/tags/clustering', '12b'),
            exact: true
          },
          {
            path: '/pyspark/tags/coalesce',
            component: ComponentCreator('/pyspark/tags/coalesce', '730'),
            exact: true
          },
          {
            path: '/pyspark/tags/column-operations',
            component: ComponentCreator('/pyspark/tags/column-operations', 'f85'),
            exact: true
          },
          {
            path: '/pyspark/tags/complex-data-types',
            component: ComponentCreator('/pyspark/tags/complex-data-types', 'd7f'),
            exact: true
          },
          {
            path: '/pyspark/tags/configuration',
            component: ComponentCreator('/pyspark/tags/configuration', '2d5'),
            exact: true
          },
          {
            path: '/pyspark/tags/csv',
            component: ComponentCreator('/pyspark/tags/csv', '582'),
            exact: true
          },
          {
            path: '/pyspark/tags/data-frame',
            component: ComponentCreator('/pyspark/tags/data-frame', '345'),
            exact: true
          },
          {
            path: '/pyspark/tags/data-frame-api',
            component: ComponentCreator('/pyspark/tags/data-frame-api', '7b6'),
            exact: true
          },
          {
            path: '/pyspark/tags/data-frame-joins',
            component: ComponentCreator('/pyspark/tags/data-frame-joins', 'aee'),
            exact: true
          },
          {
            path: '/pyspark/tags/data-frames',
            component: ComponentCreator('/pyspark/tags/data-frames', 'fa0'),
            exact: true
          },
          {
            path: '/pyspark/tags/data-i-o',
            component: ComponentCreator('/pyspark/tags/data-i-o', 'c15'),
            exact: true
          },
          {
            path: '/pyspark/tags/data-pipelines',
            component: ComponentCreator('/pyspark/tags/data-pipelines', '143'),
            exact: true
          },
          {
            path: '/pyspark/tags/data-processing',
            component: ComponentCreator('/pyspark/tags/data-processing', '451'),
            exact: true
          },
          {
            path: '/pyspark/tags/data-quality',
            component: ComponentCreator('/pyspark/tags/data-quality', '0e6'),
            exact: true
          },
          {
            path: '/pyspark/tags/databricks',
            component: ComponentCreator('/pyspark/tags/databricks', '807'),
            exact: true
          },
          {
            path: '/pyspark/tags/delta-lake',
            component: ComponentCreator('/pyspark/tags/delta-lake', 'ea8'),
            exact: true
          },
          {
            path: '/pyspark/tags/driver-program',
            component: ComponentCreator('/pyspark/tags/driver-program', 'd44'),
            exact: true
          },
          {
            path: '/pyspark/tags/etl',
            component: ComponentCreator('/pyspark/tags/etl', 'bde'),
            exact: true
          },
          {
            path: '/pyspark/tags/executors',
            component: ComponentCreator('/pyspark/tags/executors', 'aaf'),
            exact: true
          },
          {
            path: '/pyspark/tags/explode',
            component: ComponentCreator('/pyspark/tags/explode', '65b'),
            exact: true
          },
          {
            path: '/pyspark/tags/feature-engineering',
            component: ComponentCreator('/pyspark/tags/feature-engineering', '5ab'),
            exact: true
          },
          {
            path: '/pyspark/tags/filtering',
            component: ComponentCreator('/pyspark/tags/filtering', '071'),
            exact: true
          },
          {
            path: '/pyspark/tags/functions',
            component: ComponentCreator('/pyspark/tags/functions', '692'),
            exact: true
          },
          {
            path: '/pyspark/tags/gcp-dataproc',
            component: ComponentCreator('/pyspark/tags/gcp-dataproc', 'dfe'),
            exact: true
          },
          {
            path: '/pyspark/tags/group-by',
            component: ComponentCreator('/pyspark/tags/group-by', 'a88'),
            exact: true
          },
          {
            path: '/pyspark/tags/hive',
            component: ComponentCreator('/pyspark/tags/hive', 'e64'),
            exact: true
          },
          {
            path: '/pyspark/tags/house-price-linear-regression',
            component: ComponentCreator('/pyspark/tags/house-price-linear-regression', '458'),
            exact: true
          },
          {
            path: '/pyspark/tags/join-optimization',
            component: ComponentCreator('/pyspark/tags/join-optimization', '590'),
            exact: true
          },
          {
            path: '/pyspark/tags/json',
            component: ComponentCreator('/pyspark/tags/json', 'b72'),
            exact: true
          },
          {
            path: '/pyspark/tags/kafka',
            component: ComponentCreator('/pyspark/tags/kafka', 'b02'),
            exact: true
          },
          {
            path: '/pyspark/tags/key-value-rdd',
            component: ComponentCreator('/pyspark/tags/key-value-rdd', 'd75'),
            exact: true
          },
          {
            path: '/pyspark/tags/linear-regression-math',
            component: ComponentCreator('/pyspark/tags/linear-regression-math', 'd52'),
            exact: true
          },
          {
            path: '/pyspark/tags/linear-regression-model',
            component: ComponentCreator('/pyspark/tags/linear-regression-model', '6d5'),
            exact: true
          },
          {
            path: '/pyspark/tags/logistic-regression-mini-project',
            component: ComponentCreator('/pyspark/tags/logistic-regression-mini-project', 'cfb'),
            exact: true
          },
          {
            path: '/pyspark/tags/logistic-regression-model',
            component: ComponentCreator('/pyspark/tags/logistic-regression-model', 'b9e'),
            exact: true
          },
          {
            path: '/pyspark/tags/logistic-regression-query',
            component: ComponentCreator('/pyspark/tags/logistic-regression-query', '191'),
            exact: true
          },
          {
            path: '/pyspark/tags/m-llib',
            component: ComponentCreator('/pyspark/tags/m-llib', '51d'),
            exact: true
          },
          {
            path: '/pyspark/tags/machine-learning',
            component: ComponentCreator('/pyspark/tags/machine-learning', 'cb2'),
            exact: true
          },
          {
            path: '/pyspark/tags/memory-management',
            component: ComponentCreator('/pyspark/tags/memory-management', '9da'),
            exact: true
          },
          {
            path: '/pyspark/tags/missing-data-handling',
            component: ComponentCreator('/pyspark/tags/missing-data-handling', '64e'),
            exact: true
          },
          {
            path: '/pyspark/tags/narrow-vs-wide-transformations',
            component: ComponentCreator('/pyspark/tags/narrow-vs-wide-transformations', '9ba'),
            exact: true
          },
          {
            path: '/pyspark/tags/pandas-ud-fs',
            component: ComponentCreator('/pyspark/tags/pandas-ud-fs', '2da'),
            exact: true
          },
          {
            path: '/pyspark/tags/parquet',
            component: ComponentCreator('/pyspark/tags/parquet', '3f8'),
            exact: true
          },
          {
            path: '/pyspark/tags/partitioning',
            component: ComponentCreator('/pyspark/tags/partitioning', '3c8'),
            exact: true
          },
          {
            path: '/pyspark/tags/performance-tuning',
            component: ComponentCreator('/pyspark/tags/performance-tuning', '7e5'),
            exact: true
          },
          {
            path: '/pyspark/tags/pivot',
            component: ComponentCreator('/pyspark/tags/pivot', '15b'),
            exact: true
          },
          {
            path: '/pyspark/tags/production-pipelines',
            component: ComponentCreator('/pyspark/tags/production-pipelines', 'fd1'),
            exact: true
          },
          {
            path: '/pyspark/tags/py-spark',
            component: ComponentCreator('/pyspark/tags/py-spark', 'b1c'),
            exact: true
          },
          {
            path: '/pyspark/tags/py-spark-interview-questions',
            component: ComponentCreator('/pyspark/tags/py-spark-interview-questions', '8e4'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-aggregation',
            component: ComponentCreator('/pyspark/tags/pyspark-aggregation', '90d'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-dataframe-basics',
            component: ComponentCreator('/pyspark/tags/pyspark-dataframe-basics', 'cc5'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-dataframe-basics-2',
            component: ComponentCreator('/pyspark/tags/pyspark-dataframe-basics-2', 'da7'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-dates',
            component: ComponentCreator('/pyspark/tags/pyspark-dates', '620'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-filtering',
            component: ComponentCreator('/pyspark/tags/pyspark-filtering', '00f'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-interview-questions-part-1',
            component: ComponentCreator('/pyspark/tags/pyspark-interview-questions-part-1', 'eec'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-interview-questions-part-2',
            component: ComponentCreator('/pyspark/tags/pyspark-interview-questions-part-2', '40d'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-interview-questions-part-3',
            component: ComponentCreator('/pyspark/tags/pyspark-interview-questions-part-3', 'f7a'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-interview-questions-part-4',
            component: ComponentCreator('/pyspark/tags/pyspark-interview-questions-part-4', '558'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-interview-questions-part-5',
            component: ComponentCreator('/pyspark/tags/pyspark-interview-questions-part-5', 'b0a'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-intro',
            component: ComponentCreator('/pyspark/tags/pyspark-intro', 'd14'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-joins',
            component: ComponentCreator('/pyspark/tags/pyspark-joins', 'bfe'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-missing',
            component: ComponentCreator('/pyspark/tags/pyspark-missing', '01c'),
            exact: true
          },
          {
            path: '/pyspark/tags/pyspark-one-liners',
            component: ComponentCreator('/pyspark/tags/pyspark-one-liners', '19c'),
            exact: true
          },
          {
            path: '/pyspark/tags/rdd',
            component: ComponentCreator('/pyspark/tags/rdd', 'b05'),
            exact: true
          },
          {
            path: '/pyspark/tags/rdd-actions',
            component: ComponentCreator('/pyspark/tags/rdd-actions', 'aa8'),
            exact: true
          },
          {
            path: '/pyspark/tags/rdd-caching',
            component: ComponentCreator('/pyspark/tags/rdd-caching', '642'),
            exact: true
          },
          {
            path: '/pyspark/tags/rdd-transformations',
            component: ComponentCreator('/pyspark/tags/rdd-transformations', '40b'),
            exact: true
          },
          {
            path: '/pyspark/tags/real-time-data',
            component: ComponentCreator('/pyspark/tags/real-time-data', 'a53'),
            exact: true
          },
          {
            path: '/pyspark/tags/recommendation-systems',
            component: ComponentCreator('/pyspark/tags/recommendation-systems', 'a3c'),
            exact: true
          },
          {
            path: '/pyspark/tags/regression',
            component: ComponentCreator('/pyspark/tags/regression', 'b87'),
            exact: true
          },
          {
            path: '/pyspark/tags/repartition',
            component: ComponentCreator('/pyspark/tags/repartition', '5d0'),
            exact: true
          },
          {
            path: '/pyspark/tags/sampling',
            component: ComponentCreator('/pyspark/tags/sampling', '422'),
            exact: true
          },
          {
            path: '/pyspark/tags/semi-structured-data',
            component: ComponentCreator('/pyspark/tags/semi-structured-data', 'c44'),
            exact: true
          },
          {
            path: '/pyspark/tags/setup',
            component: ComponentCreator('/pyspark/tags/setup', '41e'),
            exact: true
          },
          {
            path: '/pyspark/tags/shuffle',
            component: ComponentCreator('/pyspark/tags/shuffle', 'e9d'),
            exact: true
          },
          {
            path: '/pyspark/tags/snowflake',
            component: ComponentCreator('/pyspark/tags/snowflake', '1c2'),
            exact: true
          },
          {
            path: '/pyspark/tags/sorting',
            component: ComponentCreator('/pyspark/tags/sorting', '3f4'),
            exact: true
          },
          {
            path: '/pyspark/tags/spark-architecture',
            component: ComponentCreator('/pyspark/tags/spark-architecture', '605'),
            exact: true
          },
          {
            path: '/pyspark/tags/spark-basics',
            component: ComponentCreator('/pyspark/tags/spark-basics', '237'),
            exact: true
          },
          {
            path: '/pyspark/tags/spark-context',
            component: ComponentCreator('/pyspark/tags/spark-context', '4da'),
            exact: true
          },
          {
            path: '/pyspark/tags/spark-session',
            component: ComponentCreator('/pyspark/tags/spark-session', '5bc'),
            exact: true
          },
          {
            path: '/pyspark/tags/spark-sql',
            component: ComponentCreator('/pyspark/tags/spark-sql', 'ea6'),
            exact: true
          },
          {
            path: '/pyspark/tags/spark-sql-functions',
            component: ComponentCreator('/pyspark/tags/spark-sql-functions', '3ab'),
            exact: true
          },
          {
            path: '/pyspark/tags/spark-ui',
            component: ComponentCreator('/pyspark/tags/spark-ui', 'e8b'),
            exact: true
          },
          {
            path: '/pyspark/tags/sql',
            component: ComponentCreator('/pyspark/tags/sql', '351'),
            exact: true
          },
          {
            path: '/pyspark/tags/streaming',
            component: ComponentCreator('/pyspark/tags/streaming', 'e6e'),
            exact: true
          },
          {
            path: '/pyspark/tags/streaming-sinks',
            component: ComponentCreator('/pyspark/tags/streaming-sinks', '075'),
            exact: true
          },
          {
            path: '/pyspark/tags/struct-type',
            component: ComponentCreator('/pyspark/tags/struct-type', '003'),
            exact: true
          },
          {
            path: '/pyspark/tags/structured-streaming',
            component: ComponentCreator('/pyspark/tags/structured-streaming', '8a6'),
            exact: true
          },
          {
            path: '/pyspark/tags/temp-views',
            component: ComponentCreator('/pyspark/tags/temp-views', 'bf1'),
            exact: true
          },
          {
            path: '/pyspark/tags/tungsten',
            component: ComponentCreator('/pyspark/tags/tungsten', '8b7'),
            exact: true
          },
          {
            path: '/pyspark/tags/ud-fs',
            component: ComponentCreator('/pyspark/tags/ud-fs', 'dad'),
            exact: true
          },
          {
            path: '/pyspark/tags/udaf',
            component: ComponentCreator('/pyspark/tags/udaf', 'ce4'),
            exact: true
          },
          {
            path: '/pyspark/tags/udf',
            component: ComponentCreator('/pyspark/tags/udf', '5f1'),
            exact: true
          },
          {
            path: '/pyspark/tags/unpivot',
            component: ComponentCreator('/pyspark/tags/unpivot', 'd7f'),
            exact: true
          },
          {
            path: '/pyspark/tags/use-cases',
            component: ComponentCreator('/pyspark/tags/use-cases', 'bd1'),
            exact: true
          },
          {
            path: '/pyspark/tags/watermarking',
            component: ComponentCreator('/pyspark/tags/watermarking', '4df'),
            exact: true
          },
          {
            path: '/pyspark/tags/window-functions',
            component: ComponentCreator('/pyspark/tags/window-functions', '234'),
            exact: true
          },
          {
            path: '/pyspark/tags/workflow-automation',
            component: ComponentCreator('/pyspark/tags/workflow-automation', '30b'),
            exact: true
          },
          {
            path: '/pyspark',
            component: ComponentCreator('/pyspark', '5b8'),
            routes: [
              {
                path: '/pyspark/complex-sql',
                component: ComponentCreator('/pyspark/complex-sql', 'e12'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/df-aggregations',
                component: ComponentCreator('/pyspark/df-aggregations', 'ab7'),
                exact: true
              },
              {
                path: '/pyspark/df-api',
                component: ComponentCreator('/pyspark/df-api', 'b8a'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/df-create-csv',
                component: ComponentCreator('/pyspark/df-create-csv', 'c94'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/df-missing-data',
                component: ComponentCreator('/pyspark/df-missing-data', 'fa5'),
                exact: true
              },
              {
                path: '/pyspark/df-vs-spark-sql',
                component: ComponentCreator('/pyspark/df-vs-spark-sql', 'd9e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/df-window-functions',
                component: ComponentCreator('/pyspark/df-window-functions', '141'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/house-price-linear-regression',
                component: ComponentCreator('/pyspark/house-price-linear-regression', '3a0'),
                exact: true
              },
              {
                path: '/pyspark/linear-regression-math',
                component: ComponentCreator('/pyspark/linear-regression-math', '520'),
                exact: true
              },
              {
                path: '/pyspark/linear-regression-model',
                component: ComponentCreator('/pyspark/linear-regression-model', '38d'),
                exact: true
              },
              {
                path: '/pyspark/logistic-regression-mini-project',
                component: ComponentCreator('/pyspark/logistic-regression-mini-project', '49d'),
                exact: true
              },
              {
                path: '/pyspark/logistic-regression-model',
                component: ComponentCreator('/pyspark/logistic-regression-model', 'd69'),
                exact: true
              },
              {
                path: '/pyspark/logistic-regression-query',
                component: ComponentCreator('/pyspark/logistic-regression-query', 'a63'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-architecture',
                component: ComponentCreator('/pyspark/pyspark-architecture', 'f2e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark-first-job',
                component: ComponentCreator('/pyspark/pyspark-first-job', '8e6'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark-installation',
                component: ComponentCreator('/pyspark/pyspark-installation', 'e0f'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark-interview-questions-part1',
                component: ComponentCreator('/pyspark/pyspark-interview-questions-part1', '4e8'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-interview-questions-part2',
                component: ComponentCreator('/pyspark/pyspark-interview-questions-part2', '393'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-interview-questions-part3',
                component: ComponentCreator('/pyspark/pyspark-interview-questions-part3', 'fe5'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-interview-questions-part4',
                component: ComponentCreator('/pyspark/pyspark-interview-questions-part4', '45f'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-interview-questions-part5',
                component: ComponentCreator('/pyspark/pyspark-interview-questions-part5', 'a3a'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-interview-questions-part6',
                component: ComponentCreator('/pyspark/pyspark-interview-questions-part6', '853'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-intro',
                component: ComponentCreator('/pyspark/pyspark-intro', '831'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark-mllib-overview',
                component: ComponentCreator('/pyspark/pyspark-mllib-overview', '87a'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-one-liners',
                component: ComponentCreator('/pyspark/pyspark-one-liners', 'fed'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-rdd-vs-dataframe',
                component: ComponentCreator('/pyspark/pyspark-rdd-vs-dataframe', 'fe2'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark-spark-session-context',
                component: ComponentCreator('/pyspark/pyspark-spark-session-context', '841'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark-streaming-intro',
                component: ComponentCreator('/pyspark/pyspark-streaming-intro', 'bb4'),
                exact: true
              },
              {
                path: '/pyspark/pyspark-streaming-kafka',
                component: ComponentCreator('/pyspark/pyspark-streaming-kafka', 'b96'),
                exact: true
              },
              {
                path: '/pyspark/pyspark/aggregation',
                component: ComponentCreator('/pyspark/pyspark/aggregation', '36e'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark/data-io',
                component: ComponentCreator('/pyspark/pyspark/data-io', '7dc'),
                exact: true
              },
              {
                path: '/pyspark/pyspark/dataframe-basics',
                component: ComponentCreator('/pyspark/pyspark/dataframe-basics', '68e'),
                exact: true
              },
              {
                path: '/pyspark/pyspark/dataframe-basics-2',
                component: ComponentCreator('/pyspark/pyspark/dataframe-basics-2', '9da'),
                exact: true
              },
              {
                path: '/pyspark/pyspark/dates-and-timestamps',
                component: ComponentCreator('/pyspark/pyspark/dates-and-timestamps', '64d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark/filtering',
                component: ComponentCreator('/pyspark/pyspark/filtering', '714'),
                exact: true
              },
              {
                path: '/pyspark/pyspark/functions-udfs',
                component: ComponentCreator('/pyspark/pyspark/functions-udfs', 'ef5'),
                exact: true
              },
              {
                path: '/pyspark/pyspark/joins',
                component: ComponentCreator('/pyspark/pyspark/joins', '5a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark/missing-data',
                component: ComponentCreator('/pyspark/pyspark/missing-data', '73b'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/pyspark/setup-configuration',
                component: ComponentCreator('/pyspark/pyspark/setup-configuration', '021'),
                exact: true
              },
              {
                path: '/pyspark/rdd-basics',
                component: ComponentCreator('/pyspark/rdd-basics', '975'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/rdd-key-value',
                component: ComponentCreator('/pyspark/rdd-key-value', '46d'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/rdd-map-flatmap-filter',
                component: ComponentCreator('/pyspark/rdd-map-flatmap-filter', '1fb'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/rdd-persistence-caching',
                component: ComponentCreator('/pyspark/rdd-persistence-caching', 'b94'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/spark-sql',
                component: ComponentCreator('/pyspark/spark-sql', '7a9'),
                exact: true,
                sidebar: "tutorialSidebar"
              },
              {
                path: '/pyspark/structured-streaming-intro',
                component: ComponentCreator('/pyspark/structured-streaming-intro', '63f'),
                exact: true
              },
              {
                path: '/pyspark/udfs-udafs',
                component: ComponentCreator('/pyspark/udfs-udafs', '3a0'),
                exact: true,
                sidebar: "tutorialSidebar"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/snowflake',
    component: ComponentCreator('/snowflake', '95e'),
    routes: [
      {
        path: '/snowflake',
        component: ComponentCreator('/snowflake', 'fd2'),
        routes: [
          {
            path: '/snowflake/tags',
            component: ComponentCreator('/snowflake/tags', 'fb4'),
            exact: true
          },
          {
            path: '/snowflake/tags/cloud-analytics',
            component: ComponentCreator('/snowflake/tags/cloud-analytics', '475'),
            exact: true
          },
          {
            path: '/snowflake/tags/data-warehouse',
            component: ComponentCreator('/snowflake/tags/data-warehouse', '312'),
            exact: true
          },
          {
            path: '/snowflake/tags/snowflake',
            component: ComponentCreator('/snowflake/tags/snowflake', '2b5'),
            exact: true
          },
          {
            path: '/snowflake',
            component: ComponentCreator('/snowflake', '57f'),
            routes: [
              {
                path: '/snowflake/snowflake-architecture',
                component: ComponentCreator('/snowflake/snowflake-architecture', 'f65'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-automatic-query-optimization',
                component: ComponentCreator('/snowflake/snowflake-automatic-query-optimization', '05d'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-caching',
                component: ComponentCreator('/snowflake/snowflake-caching', 'fdb'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-clustering-keys-explained',
                component: ComponentCreator('/snowflake/snowflake-clustering-keys-explained', 'af0'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-copy-into-command',
                component: ComponentCreator('/snowflake/snowflake-copy-into-command', '6cd'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-costs-best-practices',
                component: ComponentCreator('/snowflake/snowflake-costs-best-practices', '024'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-costs-billing-dashboard-monitoring',
                component: ComponentCreator('/snowflake/snowflake-costs-billing-dashboard-monitoring', '5d1'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-data-types-explained',
                component: ComponentCreator('/snowflake/snowflake-data-types-explained', '190'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-dynamic-data-masking-use-cases',
                component: ComponentCreator('/snowflake/snowflake-dynamic-data-masking-use-cases', 'a72'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-editions',
                component: ComponentCreator('/snowflake/snowflake-editions', '4c0'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-external-stages',
                component: ComponentCreator('/snowflake/snowflake-external-stages', '09a'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-file-formats',
                component: ComponentCreator('/snowflake/snowflake-file-formats', '826'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-flatten-variant',
                component: ComponentCreator('/snowflake/snowflake-flatten-variant', '608'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-governance-access-control-tags-policies',
                component: ComponentCreator('/snowflake/snowflake-governance-access-control-tags-policies', 'f49'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-incremental-loading-cdc',
                component: ComponentCreator('/snowflake/snowflake-incremental-loading-cdc', '914'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-internal-table-user-stages',
                component: ComponentCreator('/snowflake/snowflake-internal-table-user-stages', '194'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-intro',
                component: ComponentCreator('/snowflake/snowflake-intro', 'b5a'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-large-files-optimization',
                component: ComponentCreator('/snowflake/snowflake-large-files-optimization', 'a63'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-materialized-views',
                component: ComponentCreator('/snowflake/snowflake-materialized-views', '2fd'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-micro-partitions',
                component: ComponentCreator('/snowflake/snowflake-micro-partitions', 'd5f'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-object-hierarchy',
                component: ComponentCreator('/snowflake/snowflake-object-hierarchy', '8a7'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-performance-tuning',
                component: ComponentCreator('/snowflake/snowflake-performance-tuning', 'a3d'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-python-pyspark-databricks-integration',
                component: ComponentCreator('/snowflake/snowflake-python-pyspark-databricks-integration', '5b9'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-query-profile',
                component: ComponentCreator('/snowflake/snowflake-query-profile', '506'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-rbac-user-roles',
                component: ComponentCreator('/snowflake/snowflake-rbac-user-roles', '27c'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-row-access-policies-rls',
                component: ComponentCreator('/snowflake/snowflake-row-access-policies-rls', 'ad4'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-secure-views',
                component: ComponentCreator('/snowflake/snowflake-secure-views', '9c9'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-semi-structured-data',
                component: ComponentCreator('/snowflake/snowflake-semi-structured-data', 'e06'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-sharing-marketplace-exchange-secure-shares',
                component: ComponentCreator('/snowflake/snowflake-sharing-marketplace-exchange-secure-shares', 'fdb'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-snowpipe',
                component: ComponentCreator('/snowflake/snowflake-snowpipe', '658'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-sql-basics',
                component: ComponentCreator('/snowflake/snowflake-sql-basics', 'e66'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-streams',
                component: ComponentCreator('/snowflake/snowflake-streams', '542'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-tasks',
                component: ComponentCreator('/snowflake/snowflake-tasks', '066'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-tasks-cron',
                component: ComponentCreator('/snowflake/snowflake-tasks-cron', '293'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-time-travel-fail-safe',
                component: ComponentCreator('/snowflake/snowflake-time-travel-fail-safe', '046'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-virtual-warehouses',
                component: ComponentCreator('/snowflake/snowflake-virtual-warehouses', '254'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-vs-traditional-databases',
                component: ComponentCreator('/snowflake/snowflake-vs-traditional-databases', '904'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-warehouse-sizing',
                component: ComponentCreator('/snowflake/snowflake-warehouse-sizing', '34c'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-web-ui-tour',
                component: ComponentCreator('/snowflake/snowflake-web-ui-tour', '814'),
                exact: true,
                sidebar: "tutorialSidebar1"
              },
              {
                path: '/snowflake/snowflake-zero-copy-cloning',
                component: ComponentCreator('/snowflake/snowflake-zero-copy-cloning', '710'),
                exact: true,
                sidebar: "tutorialSidebar1"
              }
            ]
          }
        ]
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '2e1'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
