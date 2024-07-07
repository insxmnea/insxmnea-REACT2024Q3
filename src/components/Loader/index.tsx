import { Component } from "react";
import styles from "./Loader.module.scss";

class Loader extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <span className={styles.loader}></span>
      </div>
    );
  }
}

export default Loader;
