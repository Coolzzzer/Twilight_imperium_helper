import React from "react";
import { useInfoFaction } from "../../Hooks/useInfoFaction";
import { GetFraction } from "../../components/GetFraction/GetFraction";
import styles from "./Info.module.css";
export const Info: React.FC = () => {
  const { imgSrc, name, loading, error, setFactionId } = useInfoFaction(-1);
  const buttons = Array.from({ length: 25 }, (_, i) => i);

  return (
    <div className={styles.container}>
      <div className={styles.buttonPanel}>
        {buttons.map((id) => (
          <button
            key={id}
            onClick={() => setFactionId(id)}
            className={styles.factionButton}
          >
            <GetFraction imgToken={false} id={id} img={true} name={true} />
          </button>
        ))}
      </div>

      <div className={styles.infoPanel}>
        {loading && <p className={styles.status}>Загрузка...</p>}
        {error && <p className={styles.status}>{error}</p>}
        {imgSrc && (
          <div className={styles.imageWrapper}>
            <img
              src={imgSrc}
              alt={`Фракция ${name}`}
              className={styles.factionImage}
            />
          </div>
        )}
      </div>
    </div>
  );
};
