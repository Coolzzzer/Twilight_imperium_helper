import React, { useEffect, useState } from "react";
import { GetFraction } from "../GetFraction/GetFraction";
import styles from "./VictoryPointCounter.module.css";

type VictoryPointCounterProps = {
  isHard: boolean;
};

export const VictoryPointCounter: React.FC<VictoryPointCounterProps> = ({ isHard }) => {
  const height = 115;
  const width = [820, 830];
  const widthItem = [54.66, 75.45];

  const [startData, setStartData] = useState<any>(() => {
    const raw = localStorage.getItem("startData");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    const handleStorage = () => {
      const raw = localStorage.getItem("startData");
      setStartData(raw ? JSON.parse(raw) : null);
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);


const renderPointMap: Record<number, ЕSX.Element[]> = {};
if (startData?.set) {
  startData.set.forEach((item: any) => {
    const point = item.point;
    if (typeof point === "number" && point > 0) {
      if (!renderPointMap[point]) renderPointMap[point] = [];
      renderPointMap[point].push(
        <GetFraction
          key={`${item.fraction}-${point}`}
          id={item.fraction}
          img={false}
          imgToken={true}
          name={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
      );
    }
  });
}


  const totalCells = isHard ? 15 : 11;
  const itemWidth = isHard ? widthItem[0] : widthItem[1];
  const bgImage = isHard
    ? "url('https://raw.githubusercontent.com/Coolzzzer/Twilight_imperium_helper_API/refs/heads/main/src/item/src/item/14.png')"
    : "url('https://raw.githubusercontent.com/Coolzzzer/Twilight_imperium_helper_API/refs/heads/main/src/item/src/item/10.png')";

  return (
    <div
      className={styles.counter}
      style={{
        width: `${isHard ? width[0] : width[1]}px`,
        height: `${height}px`,
        backgroundImage: bgImage,
        position: "relative",
      }}
    >
      {Array.from({ length: totalCells }).map((_, index) => {
        const pointSlot = index;
        return (
          <div
            key={pointSlot}
            id={`v${pointSlot}`}
            style={{
              width: `${itemWidth}px`,
              height: `${height}px`,
              display: "inline-block",
              zIndex: 2,
              position: "relative",
            }}
          >
            {renderPointMap[pointSlot]}
          </div>
        );
      })}
    </div>
  );
};
