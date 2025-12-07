import React from "react";
import Link from "@docusaurus/Link";
import {useLocation} from "@docusaurus/router";
import styles from "./styles.module.css";

export default function TechBar() {
  const location = useLocation();

  // Detect current section
  const isPySpark = location.pathname.startsWith("/pyspark");
  const isSnowflake = location.pathname.startsWith("/snowflake");
  const isDatabricks = location.pathname.startsWith("/databricks");

  const showHamburger = isPySpark || isSnowflake || isDatabricks;

  // Open Docusaurus sidebar
  const toggleSidebar = () => {
    const btn = document.querySelector(".navbar__toggle");
    if (btn) btn.click();
  };

  return (
    <div className={styles.techBar}>

      {/* Mobile hamburger (already perfect — untouched) */}
      {showHamburger && (
        <button className={styles.hamburger} onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      )}

      {/* Main links */}
      <div className={styles.techContent}>
        <Link
          to="/pyspark/pyspark-intro"
          className={isPySpark ? styles.activeLink : ""}
        >
          PySpark
        </Link>

        <Link
          to="/snowflake/snowflake-intro"
          className={isSnowflake ? styles.activeLink : ""}
        >
          Snowflake
        </Link>

        <Link
          to="/databricks/databricks-intro"
          className={isDatabricks ? styles.activeLink : ""}
        >
          Databricks
        </Link>
      </div>
    </div>
  );
}
