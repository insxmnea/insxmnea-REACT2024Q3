import {
  ChangeEvent,
  createRef,
  RefObject,
  KeyboardEvent,
  FC,
  useState,
  useEffect,
} from "react";
import styles from "./SearchBar.module.scss";
import historyService from "../../services/historyService";
import searchIcon from "../../assets/icons/search.svg";

type Props = {
  onSearch: (search: string) => void;
};

const SearchBar: FC<Props> = (props) => {
  const [history, setHistory] = useState<string[]>(
    historyService.loadHistory()
  );
  const [search, setSearch] = useState<string>("");
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const searchBoxRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  const inputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBoxRef.current &&
        !searchBoxRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchBoxRef]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value);
  };

  const handleButtonClick = (search: string) => {
    props.onSearch(search);
    const history = historyService.updateHistory(search);

    setHistory(history);
    setSearch("");
    setShowHistory(false);

    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setShowHistory(false);
      if (inputRef.current) inputRef.current.blur();
    }

    if (event.key === "Enter") {
      handleButtonClick(search);
    }
  };

  return (
    <div className={styles.wrapper} ref={searchBoxRef}>
      <input
        type="text"
        placeholder="Search"
        className={styles.input}
        ref={inputRef}
        onChange={handleInputChange}
        value={search}
        onFocus={() => setShowHistory(true)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <button
        className={styles.button}
        onClick={() => handleButtonClick(search)}
      >
        <img src={searchIcon} className={styles.icon} alt="search icon" />
      </button>

      {history.length > 0 && showHistory && (
        <div className={styles.history}>
          {history.map((value) => (
            <div
              className={styles.historyItem}
              key={value.split(" ").join("-")}
              onClick={() => handleButtonClick(value)}
            >
              {value}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
