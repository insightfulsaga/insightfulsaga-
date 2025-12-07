// src/components/HomepageFeatures.js
import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

/**
 * Preserves your original link routes while using useBaseUrl for assets.
 * Make sure the SVG/PNG icons exist under: static/img/
 *
 * Filenames expected:
 *  - static/img/pyspark_logo.svg
 *  - static/img/snowflake_logo.svg
 *  - static/img/databricks_logo.svg
 */

const FeatureList = [
  {
    title: 'PySpark',
    img: 'img/pyspark_logo.svg',
    description:
      "PySpark lets data teams scale Python with Spark’s fast distributed computing. Click this card to learn more.",
    // <-- your original link restored
    link: '/pyspark/pyspark-intro'
  },
  {
    title: 'Snowflake',
    img: 'img/snowflake_logo.svg',
    description:
      'Snowflake is a modern cloud data warehouse built for scale and performance. Click this card to learn more.',
    link: '/snowflake/snowflake-intro'
  },
  {
    title: 'Databricks',
    img: 'img/databricks_logo.svg',
    description:
      'Databricks is a cloud-based data platform for big data and AI. Click this card to learn more.',
    link: '/databricks/databricks-intro'
  }
];

function Logo({ src, alt }) {
  if (!src) return null;
  const url = useBaseUrl(src);
  return <img src={url} alt={alt} className={styles.featureImg} />;
}

function Feature({ img, title, description, link }) {
  return (
    <div className="col col--4">
      {/* Use Link exactly as you had it to preserve route behavior */}
      <Link to={link || '#'} className={styles.featureCard} aria-label={`${title} - Learn more`}>
        <div className="text--center">
          <Logo src={img} alt={`${title} logo`} />
        </div>
        <div className="text--center padding-horiz--md">
          <h3>{title}</h3>
          <p>{description}</p>
        </div>
      </Link>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features} aria-labelledby="features-heading">
      <div className="container">
        <h2 id="features-heading" className="visually-hidden">Platform features</h2>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
