import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  const HERO_ART = useBaseUrl('img/data_illustration.png');// right-side illustration


  // Primary CTA — change this to a page you actually have
  // If you don't have /docs/intro, change to '/docs' or '/docs/pyspark'
  const primaryCta = '/docs/intro';

  return (
    <header className={clsx(styles.heroBanner)}>
      <div className={styles.heroInner}>
        {/* NOTE: removed duplicate logo & nav to prevent repeating site navbar */}
        <div className={styles.heroContent}>
          <div className={styles.heroCopy}>
            <span className={styles.heroBadge}>LEARN MODERN DATA ENGINEERING</span>

            <Heading as="h1" className={styles.heroTitle}>
              {siteConfig.title}
            </Heading>

            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>

            <div className={styles.ctaRow}>
              <Link className={styles.btnPrimary} to="/pyspark/pyspark-intro">Get Started</Link>
              <Link className={styles.btnGhost} to="/purpose">Why Insightful Saga</Link>
            </div>
          </div>

          <div className={styles.heroArt}>
            <img src={HERO_ART} alt="data illustration" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Story-driven learning that helps you truly understand the modern data stack">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
