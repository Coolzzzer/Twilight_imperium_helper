import React, { useEffect, useState } from "react";
import HistoryStyle from "./History.module.css";
import { GetFraction } from "../../components/GetFraction/GetFraction";

type HistoryResponse = {
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

  useEffect(() => {
    async function fetchHistory() {
      try {
        const response = await fetch("http://localhost:5000/date");
        if (!response.ok) {
          throw new Error(`Ошибка при получении истории: ${response.statusText}`);
        }
        const data: HistoryResponse[] = await response.json();
        data.sort(
                (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
        );
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
        history.map((item, index) => (
          <div key={index} className={HistoryStyle.historyItem}>
            <p>{new Date(item.date).toLocaleDateString("ru-RU")}</p>
            <p>Игроков: {item.quantity}</p>
            {item.set.map((elem, setIndex) => (
              <div key={setIndex}>
                {elem.player} -{" "}
                <GetFraction id={elem.fraction} img={true} name={true} />{" "}
                {elem.result && <span>- Победитель!</span>}
              </div>
            ))}
          </div>
        ))
      ) : (
        <p>Записей не найдено</p>
      )}
    </div>
  );
};
