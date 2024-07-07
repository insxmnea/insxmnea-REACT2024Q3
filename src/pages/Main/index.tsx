import { Component } from "react";
import styles from "./Main.module.scss";
import { getDeals } from "../../services/api";
import { Deal } from "../../services/models";
import DealCard from "../../components/DealCard";
import SearchBar from "../../components/SearchBar";
import historyService from "../../services/historyService";
import Loader from "../../components/Loader";

type Props = {};

type State = {
  deals: Deal[];
  hasError: boolean;
  noResults: boolean;
};

class Main extends Component<Props, State> {
  state: State = {
    deals: [],
    hasError: false,
    noResults: false,
  };

  componentDidMount() {
    this.onSearch(historyService.loadHistory()[0]);
  }

  onSearch = async (search: string = "") => {
    this.setState({ deals: [], noResults: false });
    const res = await getDeals(search);
    this.setState({ deals: res, noResults: res.length === 0 });
  };

  render() {
    if (this.state.hasError) {
      throw new Error("!!!");
    }

    return (
      <div className={styles.wrapper}>
        <header className={styles.header}>
          <SearchBar onSearch={this.onSearch} />

          <button
            onClick={() => {
              this.setState({ hasError: true });
            }}
          >
            Throw error
          </button>
        </header>

        {this.state.deals.length === 0 && !this.state.noResults && <Loader />}

        {this.state.noResults && (
          <div className={styles.noResults}>Not found</div>
        )}

        <div className={styles.deals}>
          {this.state.deals.map((deal) => (
            <DealCard deal={deal} key={deal.dealID} />
          ))}
        </div>
      </div>
    );
  }
}

export default Main;
