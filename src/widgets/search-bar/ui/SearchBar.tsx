import {
  ChangeEvent,
  createRef,
  RefObject,
  KeyboardEvent,
  FC,
  useState,
  useEffect,
  useCallback,
} from "react";
import styles from "./SearchBar.module.scss";
import searchIcon from "src/shared/assets/icons/search.svg";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useHistory, useSearchQuery } from "src/features/search";
import Image from "next/image";

type Props = {};

export const SearchBar: FC<Props> = () => {
  const [query, setQuery] = useSearchQuery();
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [history, updateHistory] = useHistory();

  const searchBoxRef: RefObject<HTMLDivElement> = createRef<HTMLDivElement>();
  const inputRef: RefObject<HTMLInputElement> = createRef<HTMLInputElement>();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

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

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(name, value);
      params.set("pageNumber", "1");

      return params.toString();
    },
    [searchParams]
  );

  const onSearch = async (search: string = "") => {
    updateHistory(search);

    router.push(pathname + "?" + createQueryString("title", search));
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleButtonClick = (search: string) => {
    onSearch(search);

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
        id={"search-bar"}
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
        <Image
          src={searchIcon}
          width={20}
          height={20}
          className={styles.icon}
          alt="search icon"
        />
      </button>

      {history.length > 0 && showHistory && (
        <div className={styles.history}>
          {history.map((value) => {
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
