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
import searchIcon from "../../assets/icons/search.svg";
import useSearchQuery from "../../hooks/useSearchQuery";

type Props = {
  history: string[];
  onSearch: (search: string) => void;
};

const SearchBar: FC<Props> = (props) => {
  const [query, setQuery] = useSearchQuery();
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
    setQuery(event.target.value);
  };

  const handleButtonClick = (search: string) => {
    props.onSearch(search);

    setQuery("");
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
      handleButtonClick(query);
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
        value={query}
        onFocus={() => setShowHistory(true)}
        onKeyDown={(event) => handleKeyDown(event)}
      />
      <button
        className={styles.button}
        onClick={() => handleButtonClick(query)}
      >
        <img src={searchIcon} className={styles.icon} alt="search icon" />
      </button>

      {props.history.length > 0 && showHistory && (
        <div className={styles.history}>
          {props.history.map((value) => {
            if (value.trim() === "") return null;

            return (
              <div
                className={styles.historyItem}
                key={value.split(" ").join("-")}
                onClick={() => handleButtonClick(value)}
              >
                {value}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
