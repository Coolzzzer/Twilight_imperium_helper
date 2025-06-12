import React, { useEffect, useState } from "react";
import HistoryStyle from "./History.module.css";
import { GetFraction } from "../../components/GetFraction/GetFraction";
import { DeleteObject } from "../../components/DeleteObject/DeleteObject";

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
          throw new Error(`Ошибка при получении истории: ${response.statusText}`);
        }
        const data: HistoryResponse[] = await response.json();
        setHistory(data);
      } catch (err: any) {
        console.error(err);
      }
    }
    fetchHistory();
  }, []);

  return (
    <div className={HistoryStyle.container}>

      {history.length > 0 ? (
        history.map((item) => {
          const winners = item.set.filter((player) => player.result);

          return (
            <button 
              key={item.id} 
              className={HistoryStyle.historyItem} 
              onClick={() => setExpanded(expanded === item.id ? null : item.id)}
            >
              <p>{new Date(item.date).toLocaleDateString("ru-RU")}</p>
              {winners.length > 0 ? (
                <div>
                  {winners.map((winner, winnerIndex) => (
                    <div key={winnerIndex}>
                      {winner.player} -<span> победил на - </span> 
                      <GetFraction id={winner.fraction} img={true} name={true} /> 
                    </div>
                  ))}
                </div>
              ) : (
                <p>Победитель не найден</p>
              )}
              {expanded === item.id && (
                <div>
                  <p>Количество участников: {item.quantity}</p>
                  {item.set.map((elem, setIndex) => (
                    <div key={setIndex}>
                      {elem.player} - <GetFraction id={elem.fraction} img={true} name={true} />
                    </div>
                  ))}
                <DeleteObject id={item.id}/>
                </div>
              )}

            </button>
          );
        })
      ) : (
        <p>Записей не найдено</p>
      )}
    </div>
  );
};
