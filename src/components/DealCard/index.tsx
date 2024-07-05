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
        <p>{this.props.deal.title}</p>
        <img className={styles.thumb} src={this.props.deal.thumb} />
        <p>{this.props.deal.steamAppID}</p>
        <p>StoreId: {this.props.deal.storeID}</p>
        <a
          href={`https://store.steampowered.com/app/${this.props.deal.steamAppID}`}
        >
          link
        </a>
      </div>
    );
  }
}

export default DealCard;
