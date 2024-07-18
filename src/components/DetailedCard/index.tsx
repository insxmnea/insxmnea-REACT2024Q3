import { createRef, FC, RefObject, useEffect, useState } from "react";
import styles from "./DetailedCard.module.scss";
import { CardInfo } from "../../services/models";
import { getDeal } from "../../services/api";
import Loader from "../Loader";
import { useNavigate, useSearchParams } from "react-router-dom";

type Props = {};

const DetailedCard: FC<Props> = () => {
  const [cardInfo, setCardInfo] = useState<CardInfo>();
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
      setCardInfo(data);
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
        {cardInfo?.gameInfo ? (
          <>
            <span className={styles.title}>{cardInfo.gameInfo.name}</span>
            <div className={styles.thumbContainer}>
              <img className={styles.thumb} src={cardInfo.gameInfo.thumb} />
            </div>
            <div className={styles.info}>
              <span>Reviews: {cardInfo.gameInfo.steamRatingText}</span>
              <span>Metacritic: {cardInfo.gameInfo.metacriticScore}</span>

              <div className={styles.prices}>
                <span className={styles.salePrice}>
                  {cardInfo.gameInfo.salePrice}$
                </span>
                <span className={styles.normalPrice}>
                  {cardInfo.gameInfo.retailPrice}$
                </span>
              </div>

              <div className={styles.buttons}>
                <a
                  className={styles.buy}
                  href={`https://store.steampowered.com/app/${cardInfo.gameInfo.steamAppID}`}
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

export default DetailedCard;
