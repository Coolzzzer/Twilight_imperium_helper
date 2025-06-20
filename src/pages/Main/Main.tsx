import MainStyle from "./Main.module.css";
import { MainItem } from "../../components/MainItem/MainItem";
import { Start } from "../../components/Start/Start";
import { useState } from "react";
import { GetFraction } from "../../components/GetFraction/GetFraction";
import { VictoryPointCounter } from "../../components/VictoryPointCounter/VictoryPointCounter";

export const Main = () => {
    const [isStart, setIsStart] = useState<boolean| null>(null)
    const raw = localStorage.getItem("startData");
    const startData = raw ? JSON.parse(raw) : null;
    const startGame = ()=>{
        setIsStart(true)
    }
    const endGame = ()=>{
        setIsStart(false)
        console.log(e.target)
        
    }
    

    return (
        <>
            <Start isStart={isStart} startGame={startGame} endGame={endGame}/>
            {isStart && (    
                <>
                    {startData?.gameMode==10 ?(
                        <VictoryPointCounter isHard={false}/>
                    ) : startData?.gameMode==14 ?(
                        <VictoryPointCounter isHard={true}/>
                    ): null}
                    <MainItem id="c1"/>
                    <MainItem id="c2"/>
                    <MainItem id="iM"/>
                </>
            )
            }
        
        </>
    );
};
