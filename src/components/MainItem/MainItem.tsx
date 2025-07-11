import { useEffect, useState } from "react";
import MainItemStyle from "./MainItem.module.css";
import { GetFraction } from "../GetFraction/GetFraction";

type MainItemProps = {
    id: string;
    [key: string]: any;
  };
  
type MainItemResponse = {
    id: KeyType;
    data: any;
    src: string; 
  };

export const MainItem:React.FC<MainItemProps>  = ({id,...props}) => {
    const [main, setMain] = useState<MainItemResponse[]>([]);
    const [showOverlay, setShowOverlay] = useState(false);
    const [idElem, setIdElem] = useState<any>("");
    const raw = localStorage.getItem("startData");
    const startData = raw ? JSON.parse(raw) : null;
    const handleClick = () =>{
      setShowOverlay(!showOverlay)
    }
    const handleClickOverlay = (fractionId: number) => {
      setShowOverlay(false);
      setIdElem(fractionId);
    
      const raw = localStorage.getItem("startData");
      if (!raw) return;
    
      const data = JSON.parse(raw);
    
      if (!Array.isArray(data.set)) return;
    
      const updatedSet = data.set.map((item: any) => {
        if (item.fraction === fractionId) {
          return {
            ...item,
            point: (item.point || 0) + 1,
          };
        }
        return item;
      });
    
      const updatedData = {
        ...data,
        set: updatedSet,
      };
    
      localStorage.setItem("startData", JSON.stringify(updatedData));
    };
    
    
    
    useEffect(() => {
      async function fetchMain() {
        try {
          const response = await fetch("http://localhost:5000/initial/25");
          if (!response.ok) {
            throw new Error(`Ошибка при получении элемента: ${response.statusText}`);
          }
          const data: MainItemResponse[] = await response.json();
          setMain(data.data);
        } catch (err: any) {
          console.error(err);
        }
      }
      fetchMain();
    }, []);
    const src = main[id];
    if (!src) {
        return <p>Ключ "{id}" не найден в объекте.</p>;
      }
  return(
    <>
        <img {...props} src={src} onClick={handleClick} width="120vw" id={id}/>
        {showOverlay && (        
             
          startData?.set?.map((element, index) => (
            <GetFraction
              key={index}
              img={false}
              imgToken={true}
              id={element.fraction}
              name={false}
              onClick={() => handleClickOverlay(element.fraction)}
              style={{
                position:"absolute",
                margin:`${index*25}px 0`
              }}
            />
          ))
      )}
    </>
  );
};
