import React, { useEffect, useState } from "react";
import styles from "./History.module.css";
import { GetFraction } from "../../components/GetFraction/GetFraction";
import { DeleteObject } from "../../components/DeleteObject/DeleteObject";
import { InputField } from "../InputField/InputField";

type HistoryResponse = {
  id: string;
  date: string;
  quantity: number;
  set: {
    player: string;
    fraction: number;
    result: boolean;
  }[];
};

export const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryResponse[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("http://localhost:5000/date");
        if (!response.ok) {
          throw new Error(
            `Ошибка при получении истории: ${response.statusText}`
          );
        }
        const data: HistoryResponse[] = await response.json();
        setHistory(
          data.sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
        );
      } catch (err: any) {
        console.error(err);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.inputBlock}>
        <InputField save={true} />
      </div>
      <div>
        {history.length > 0 ? (
          history.map((item) => {
            const winners = item.set.filter((player) => player.result);
            const isExpanded = expanded === item.id;

            return (
              <div key={item.id} className={styles.historyBlock}>
                <button
                  className={styles.historyItem}
                  onClick={() => setExpanded(isExpanded ? null : item.id)}
                >
                  <div className={styles.date}>
                    {new Date(item.date).toLocaleDateString("ru-RU")}
                  </div>
                  {winners.length > 0 ? (
                    <div className={styles.winnerList}>
                      {winners.map((winner, index) => (
                        <div key={index} className={styles.winner}>
                          <span className={styles.playerName}>
                            {winner.player}
                          </span>
                          <span className={styles.winText}> победил на </span>
                          <GetFraction
                            imgToken={false}
                            id={winner.fraction}
                            img={true}
                            name={false}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className={styles.noWinner}>Победитель не найден</p>
                  )}
                </button>

                {isExpanded && (
                  <div className={styles.details}>
                    <p>Количество участников: {item.quantity}</p>
                    {item.set.map((elem, index) => (
                      <div key={index} className={styles.participant}>
                        <span>{elem.player}</span> —{" "}
                        <GetFraction
                          imgToken={false}
                          id={elem.fraction}
                          img={true}
                          name={true}
                        />
                      </div>
                    ))}
                    <DeleteObject id={item.id} />
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className={styles.noData}>Записей не найдено</p>
        )}
      </div>
    </div>
  );
};
