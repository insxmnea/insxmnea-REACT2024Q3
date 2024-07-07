import { Component } from "react";
import styles from "./ErrorComponent.module.scss";

class ErrorComponent extends Component {
  render() {
    return (
      <div className={styles.wrapper}>
        <h1>Something went wrong :(</h1>
      </div>
    );
  }
}

export default ErrorComponent;
