import React, { useEffect, useState } from "react";
import type { FactionResponse } from "../../Hooks/useInfoFaction";
import styles from "./GetFraction.module.css";

type GetFractionProps = {
  id: number;
  img: boolean;
  imgToken: boolean;
  name: boolean;
  fontSize?: string;
  height?: string;
  imgProps?: React.ImgHTMLAttributes<HTMLImageElement>;
};

export const GetFraction: React.FC<GetFractionProps> = ({
  id,
  img,
  imgToken,
  name,
  height = "20px",
  fontSize = "1.5vh",
  imgProps = {},
}) => {
  const [faction, setFaction] = useState<FactionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFactionById() {
      try {
        const response = await fetch(
          `https://twilight-imperium-helper-api.onrender.com/initial/${id}`
        );
        if (!response.ok) {
          throw new Error(
            `Ошибка при получении фракции: ${response.statusText}`
          );
        }
        const data: FactionResponse = await response.json();
        setFaction(data);
      } catch (err: any) {
        setError(err.message);
        console.error("Ошибка загрузки фракции:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchFactionById();
  }, [id]);

  if (loading) return <p className={styles.status}>{loading}</p>;
  if (error) return <p className={styles.status}>{error}</p>;

  return (
    faction && (
      <div className={styles.wrapper}>
        {imgToken && (
          <img
            src={faction.srcToken}
            alt={faction.name}
            style={{ height }}
            {...imgProps}
          />
        )}
        {img && (
          <img
            src={faction.srcLogo}
            alt={faction.name}
            style={{ height }}
            {...imgProps}
          />
        )}
        {name && (
          <span className={styles.name} style={{ fontSize }}>
            {faction.name.toUpperCase()}
          </span>
        )}
      </div>
    )
  );
};
