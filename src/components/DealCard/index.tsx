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
        <img className={styles.thumb} src={this.props.deal.thumb} />
        <p>{this.props.deal.title}</p>
        <p>{this.props.deal.salePrice}$</p>
        <p>{this.props.deal.normalPrice}$</p>
        <a
          href={`https://store.steampowered.com/app/${this.props.deal.steamAppID}`}
        >
          Buy
        </a>
      </div>
    );
  }
}

export default DealCard;
