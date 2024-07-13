import { createRef, FC, RefObject, useEffect, useState } from "react";
import styles from "./DetailedCard.module.scss";
import { CardInfo } from "../../services/models";
import { getDeal } from "../../services/api";
import Loader from "../Loader";

type Props = {
  id: string;
  hideDetailedCard: () => void;
};

const DetailedCard: FC<Props> = (props) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const detailedCardRef: RefObject<HTMLDivElement> =
    createRef<HTMLDivElement>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        detailedCardRef.current &&
        !detailedCardRef.current.contains(event.target as Node)
      ) {
        props.hideDetailedCard();
      }
    };

    document.addEventListener("mouseup", handleClickOutside);

    return () => {
      document.removeEventListener("mouseup", handleClickOutside);
    };
  }, [detailedCardRef]);

  useEffect(() => {
    onOpen(props.id);
  }, [props.id]);

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

  return (
    <div className={styles.wrapper}>
      <div className={styles.container} ref={detailedCardRef}>
        {isFetching && <Loader />}

        {!isFetching && cardInfo && (
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
                <button
                  className={styles.close}
                  onClick={() => props.hideDetailedCard()}
                >
                  Close
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default DetailedCard;
