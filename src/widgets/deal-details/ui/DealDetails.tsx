"use client";

import { createRef, FC, RefObject, useEffect } from "react";
import styles from "./DealDetails.module.scss";
import { useNavigate, useSearchParams } from "@remix-run/react";
import { Loader } from "src/shared/ui/loader";
import { dealsAPI } from "src/entities/deal";

type Props = {};

export const DealDetails: FC<Props> = () => {
  const detailedCardRef: RefObject<HTMLDivElement> =
    createRef<HTMLDivElement>();

  const [searchParams, setSearchParams] = useSearchParams();
  const detailedCardId = searchParams.get("id") || "";

  const { data, isFetching, isError } = dealsAPI.useGetDealQuery(
    encodeURIComponent(detailedCardId)
  );

  const navigate = useNavigate();

  const hideDetailedCard = () => {
    setSearchParams((params) => {
      params.delete("id");
      return params;
    });
    navigate(
      {
        pathname: "/",
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
        {data?.gameInfo && !isError ? (
          <>
            <span className={styles.title}>{data.gameInfo.name}</span>
            <div className={styles.thumbContainer}>
              <img className={styles.thumb} src={data.gameInfo.thumb} />
            </div>
            <div className={styles.info}>
              <span>Reviews: {data.gameInfo.steamRatingText}</span>
              <span>Metacritic: {data.gameInfo.metacriticScore}</span>

              <div className={styles.prices}>
                <span className={styles.salePrice}>
                  {data.gameInfo.salePrice}$
                </span>
                <span className={styles.normalPrice}>
                  {data.gameInfo.retailPrice}$
                </span>
              </div>

              <div className={styles.buttons}>
                <a
                  className={styles.buy}
                  href={`https://store.steampowered.com/app/${data.gameInfo.steamAppID}`}
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
