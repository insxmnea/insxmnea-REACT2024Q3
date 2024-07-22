import { createRef, FC, RefObject, useEffect, useState } from "react";
import styles from "./DealDetails.module.scss";
import { DealInfo } from "../../services/models";
import { getDeal } from "../../services/api";
import Loader from "../Loader";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

const DealDetails: FC<Props> = () => {
  const [dealInfo, setDealInfo] = useState<DealInfo>();
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const detailedCardRef: RefObject<HTMLDivElement> =
    createRef<HTMLDivElement>();

  const [searchParams, setSearchParams] = useSearchParams();
  const detailedCardId = searchParams.get("id") || "";

  const navigate = useNavigate();

  const hideDetailedCard = () => {
    setSearchParams((params) => {
      params.delete("id");
      return params;
    });

    navigate(
      {
        pathname: "/insxmnea-REACT2024Q3/",
        search: searchParams.toString(),
      },
      { replace: true }
    );
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      event.button === 0 &&
      detailedCardRef.current &&
      !detailedCardRef.current.contains(event.target as Node)
    ) {
      hideDetailedCard();
    }
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [detailedCardRef]);

  useEffect(() => {
    onOpen(encodeURIComponent(detailedCardId));
  }, [detailedCardId]);

  const onOpen = async (id: string) => {
    setIsFetching(true);

    try {
      const data = await getDeal(id);
      setDealInfo(data);
    } catch (error) {
      console.error("Failed to fetch deal:", error);
    } finally {
      setIsFetching(false);
    }
  };

  if (isFetching) {
    return (
      <div className={styles.wrapper}>
        <div className={styles.container} ref={detailedCardRef}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={detailedCardRef}>
        {dealInfo?.gameInfo ? (
          <>
            <span className={styles.title}>{dealInfo.gameInfo.name}</span>
            <div className={styles.thumbContainer}>
              <img className={styles.thumb} src={dealInfo.gameInfo.thumb} />
            </div>
            <div className={styles.info}>
              <span>Reviews: {dealInfo.gameInfo.steamRatingText}</span>
              <span>Metacritic: {dealInfo.gameInfo.metacriticScore}</span>

              <div className={styles.prices}>
                <span className={styles.salePrice}>
                  {dealInfo.gameInfo.salePrice}$
                </span>
                <span className={styles.normalPrice}>
                  {dealInfo.gameInfo.retailPrice}$
                </span>
              </div>

              <div className={styles.buttons}>
                <a
                  className={styles.buy}
                  href={`https://store.steampowered.com/app/${dealInfo.gameInfo.steamAppID}`}
                  target="_blank"
                >
                  Buy
                </a>
                <button className={styles.close} onClick={hideDetailedCard}>
                  Close
                </button>
              </div>
            </div>
          </>
        ) : (
          <div>
            <span className={styles.noResults}>No results</span>
            <button className={styles.close} onClick={hideDetailedCard}>
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DealDetails;
