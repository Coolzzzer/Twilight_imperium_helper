import React, { useEffect, useState } from "react";
import type { FactionResponse } from "../../Hooks/useInfoFaction";
import GetFractionStyle from "./GetFraction.module.css";

type GetFractionProps = {
  id: any;
  img: boolean;
  imgToken: boolean;
  name: boolean;
};

export const GetFraction: React.FC<GetFractionProps & React.ImgHTMLAttributes<HTMLImageElement>> = ({ id, img, imgToken, name, ...rest }) => {
  const [faction, setFaction] = useState<FactionResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    async function fetchFactionById() {
      try {
        const response = await fetch(`http://localhost:5000/initial/${id}`);
        if (!response.ok) {
          throw new Error(`Ошибка при получении фракции: ${response.statusText}`);
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
          {imgToken && (
            <img src={faction.srcToken}  height="20vw" alt={faction.name} {...rest}/>
          )}
          {img && (
            <img src={faction.srcLogo}  height="20vw" alt={faction.name} />
          )}
          {name && (
            <span>{faction.name}</span>
          )}
        </>
      )}
    </>
  );
};
