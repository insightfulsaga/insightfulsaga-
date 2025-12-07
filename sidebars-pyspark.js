// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  tutorialSidebar: [
   /* {
      type: 'category',
      label: 'Pyspark',
      items: [
        'pyspark-intro',
        'pyspark-setup-configuration',
        'pyspark-data-io',
        'pyspark-dataframe-basics',
        'pyspark-dataframe-basics2',
        'pyspark-filtering',
        'pyspark-aggregation',
        'pyspark-missing',
        'pyspark-dates',
        'pyspark-joins',
        'pyspark-functions-udfs',
        'pyspark-one-liners',
        'pyspark-mllib-overview',
        'linear-regression-model',
        'linear-regression-math',
        'house-price-linear-regression',
        'logistic-regression-model',
        'logistic-regression-query',
        'logistic-regression-mini-project',
        'pyspark-interview-questions-part1',
        'pyspark-interview-questions-part2',
        'pyspark-interview-questions-part3',
        'pyspark-interview-questions-part4',
        'pyspark-interview-questions-part5',
        'pyspark-interview-questions-part6',
      ],
    },*/
    {
      type: 'category',
      label: 'Pyspark Introduction & Basics',
      items: [
        'pyspark-intro',
        'pyspark-architecture',
        'pyspark-installation',
        'pyspark-rdd-vs-dataframe',
        'pyspark-spark-session-context',
        'pyspark-first-job',
      ],
    },
    {
      type: 'category',
      label: 'PySpark RDDs',
      items: [
        'rdd-basics',
        'rdd-map-flatmap-filter',
        'rdd-key-value',
        'rdd-persistence-caching',
      ],
    },
    {
      type: 'category',
      label: 'PySpark DataFrames Basics',
      items: [
        'df-create-csv',
        'df-api',
        'df-joins',
        'pyspark-aggregation',
        'df-window-functions',
        'pyspark-missing',
        'pyspark-dates',
      ],
    },
    {
      type: 'category',
      label: 'PySpark SQL',
      items: [
        'spark-sql',
        'complex-sql',
        'udfs-udafs',
        'df-vs-spark-sql',
      ],
    },
  ],
};

export default sidebars;
