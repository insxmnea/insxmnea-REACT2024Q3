import { ChangeEvent, Component } from "react";
import styles from "./SearchInput.module.scss";
import historyService from "../../services/historyService";

type Props = {
  onSearch: (search: string) => void;
};

type State = {
  history: string[];
  search: string;
};

class SearchBar extends Component<Props, State> {
  state = {
    history: historyService.loadHistory(),
    search: "",
  };

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: event.target.value,
    });
  };

  handleButtonClick = () => {
    this.props.onSearch(this.state.search);
    const history = historyService.updateHistory(this.state.search);
    this.setState({
      history,
      search: "",
    });
  };

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
          onChange={this.handleInputChange}
          value={this.state.search}
        />
        <button onClick={this.handleButtonClick}>Search</button>
        <p>History: {this.state.history.join(", ")}</p>
      </div>
    );
  }
}

export default SearchBar;
