import React, { useEffect, useState } from "react";
import HistoryStyle from "./History.module.css";
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
    history.sort((a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );

  
  return (
    
    <div className={HistoryStyle.container}>
      <InputField save={true}/>
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
                      <GetFraction imgToken={false} id={winner.fraction} img={true} name={false} /> 
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
                      {elem.player} - <GetFraction imgToken={false} id={elem.fraction} img={true} name={true} />
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
