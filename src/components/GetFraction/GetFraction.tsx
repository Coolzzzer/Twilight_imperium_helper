import React, { useEffect, useState } from "react";
import type { FactionResponse } from "../../Hooks/useInfoFaction";
import GetFractionStyle from "./GetFraction.module.css";

type GetFractionProps = {
  id: number;
  img: boolean;
  name: boolean;
};

export const GetFraction: React.FC<GetFractionProps> = (props) => {
  const [faction, setFaction] = useState<FactionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllFactions() {
      try {
        const response = await fetch("http://localhost:5000/initial");
        if (!response.ok) {
          throw new Error(`Ошибка при получении списка фракций: ${response.statusText}`);
        }
        const data: FactionResponse[] = await response.json();
        const foundFaction = data.find((f) => f.id === props.id);
        if (!foundFaction) {
          throw new Error("Фракция с указанным id не найдена");
        }
        setFaction(foundFaction);
      } catch (err: any) {
        setError(err.message);
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAllFactions();
  }, [props.id]);

  if (loading) {
    return <p>Загрузка...</p>;
  }
  if (error) {
    return <p>{error}</p>;
  }
  
  return (
    <>
      {faction && (
        <>
          {props.img && (
            <img src={faction.srcLogo} width="20vh" alt={faction.name} />
          )}
          {props.name && (
            <span>{faction.name}</span>
          )}
        </>
      )}
    </>
  );
};

