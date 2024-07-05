import { Component } from "react";
import styles from "./Main.module.scss";
import { getDeals } from "../../services/api";
import { Deal } from "../../services/models";
import DealCard from "../../components/DealCard";
import SearchBar from "../../components/SearchBar";

type Props = {};

type State = {
  deals: Deal[];
  hasError: boolean;
};

class Main extends Component<Props, State> {
  state: State = {
    deals: [],
    hasError: false,
  };

  componentDidMount() {
    getDeals().then((data) => this.setState({ deals: data }));
  }

  onSearch = async (search: string = "") => {
    const res = await getDeals(search);
    this.setState({ deals: res });
  };

  render() {
    if (this.state.hasError) {
      throw new Error("!!!");
    }

    return (
      <>
        <div>Main</div>
        <SearchBar onSearch={this.onSearch} />

        <button
          onClick={() => {
            this.setState({ hasError: true });
          }}
        >
          Error
        </button>

        {this.state.deals.map((deal) => (
          <DealCard deal={deal} key={deal.dealID} />
        ))}
      </>
    );
  }
}

export default Main;
