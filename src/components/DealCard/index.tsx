import { Component } from "react";
import { Deal } from "../../services/models";
import styles from "./DealCard.module.scss";

type Props = {
  deal: Deal;
};

class DealCard extends Component<Props> {
  render() {
    return (
      <div className={styles.wrapper}>
        <div className={styles.thumbContainer}>
          <img className={styles.thumb} src={this.props.deal.thumb} />
        </div>

        <div className={styles.info}>
          <span>{this.props.deal.title}</span>
          <div className={styles.pricesContainer}>
            <div className={styles.prices}>
              <span className={styles.salePrice}>
                {this.props.deal.salePrice}$
              </span>
              <span className={styles.normalPrice}>
                {this.props.deal.normalPrice}$
              </span>
            </div>
            <a
              className={styles.buy}
              href={`https://store.steampowered.com/app/${this.props.deal.steamAppID}`}
            >
              Buy
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default DealCard;
