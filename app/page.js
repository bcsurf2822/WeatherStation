"use client"

import styles from "./page.module.css";

import SearchBar from "./components/SearchBar";

export default function Home() {

  return (
    <div className={styles.page}>
      <div className={styles.searchContainer}>
        <SearchBar />
      </div>
      <div className="sideNav"></div>
        <div className="weatherContainer"></div>
        <div className="footer"></div>
    </div>
  );
}
