import {
  ChangeEvent,
  Component,
  createRef,
  RefObject,
  KeyboardEvent,
} from "react";
import styles from "./SearchBar.module.scss";
import historyService from "../../services/historyService";
import searchIcon from "../../assets/icons/search.svg";

type Props = {
  onSearch: (search: string) => void;
};

type State = {
  history: string[];
  search: string;
  showHistory: boolean;
  searchBoxRef: RefObject<HTMLDivElement>;
  inputRef: RefObject<HTMLInputElement>;
};

class SearchBar extends Component<Props, State> {
  state = {
    searchBoxRef: createRef<HTMLDivElement>(),
    inputRef: createRef<HTMLInputElement>(),
    history: historyService.loadHistory(),
    search: "",
    showHistory: false,
  };

  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }

  handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      search: event.target.value,
    });
  };

  handleButtonClick = (search: string) => {
    this.props.onSearch(search);
    const history = historyService.updateHistory(search);
    this.setState({
      history,
      search: "",
      showHistory: false,
    });

    if (this.state.inputRef.current) {
      this.state.inputRef.current.blur();
    }
  };

  handleClickOutside = (event: MouseEvent) => {
    if (
      this.state.searchBoxRef.current &&
      !this.state.searchBoxRef.current.contains(event.target as Node)
    ) {
      this.setState({ showHistory: false });
    }
  };

  handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      this.setState({ showHistory: false });
      if (this.state.inputRef.current) this.state.inputRef.current.blur();
    }

    if (event.key === "Enter") {
      this.handleButtonClick(this.state.search);
    }
  };

  render() {
    return (
      <div className={styles.wrapper} ref={this.state.searchBoxRef}>
        <input
          type="text"
          placeholder="Search"
          className={styles.input}
          ref={this.state.inputRef}
          onChange={this.handleInputChange}
          value={this.state.search}
          onFocus={() => this.setState({ showHistory: true })}
          onKeyDown={(event) => this.handleKeyDown(event)}
        />
        <button
          className={styles.button}
          onClick={() => this.handleButtonClick(this.state.search)}
        >
          <img src={searchIcon} className={styles.icon} alt="search icon" />
        </button>

        {this.state.history.length > 0 && this.state.showHistory && (
          <div className={styles.history}>
            {this.state.history.map((value) => (
              <div
                className={styles.historyItem}
                key={value.split(" ").join("-")}
                onClick={() => this.handleButtonClick(value)}
              >
                {value}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default SearchBar;
