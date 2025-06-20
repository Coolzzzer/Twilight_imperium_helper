import MainStyle from "./Main.module.css";
import { MainItem } from "../../components/MainItem/MainItem";
import { Start } from "../../components/Start/Start";
import { useState } from "react";
import { GetFraction } from "../../components/GetFraction/GetFraction";

export const Main = () => {
    const [isStart, setIsStart] = useState<boolean| null>(null)
    const raw = localStorage.getItem("startData");
    const startData = raw ? JSON.parse(raw) : null;
    const startGame = ()=>{
        setIsStart(true)
    }
    const endGame = ()=>{
        setIsStart(false)
    }
    

    return (
        <>
            <Start isStart={isStart} startGame={startGame} endGame={endGame}/>
            <MainItem id="c1"/>
            <MainItem id="c2"/>
            <MainItem id="iM"/>
            {isStart && (    
                startData?.gameMode==10 ?(
                    <MainItem id="i10" style={{ transform: "rotate(90deg)"}}/>
                ) : startData?.gameMode==14 ?(
                    <MainItem id="i14" style={{ transform: "rotate(90deg)"}}/>
                ): null
            )
            }
        
        </>
    );
};
