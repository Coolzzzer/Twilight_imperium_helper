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
            
            {isStart && (    
                <>  
                    <MainItem id="c1"/>
                    <MainItem id="c1"/>
                    <MainItem id="c1"/>
                    <MainItem id="c1"/>
                    <MainItem id="c1"/>
                    {startData?.gameMode==10 ?(
                        <VictoryPointCounter isHard={false}/>
                    ) : startData?.gameMode==14 ?(
                        <VictoryPointCounter isHard={true}/>
                    ): null}
                    <MainItem id="c2"/>
                    <MainItem id="c2"/>
                    <MainItem id="c2"/>
                    <MainItem id="c2"/>
                    <MainItem id="c2"/>
                    
                    <br/>
                    <MainItem id="cS"/>
                    <MainItem id="cS"/>
                    <MainItem id="cS"/>
                    <MainItem id="iM"/>
                    <br/>
                    <MainItem id="cA"/>
                    <MainItem id="cD"/>
                    <MainItem id="cZ"/>
                    <MainItem id="cO"/>

                </>
            )
            }
            <Start isStart={isStart} startGame={startGame} endGame={endGame}/>
        </>
    );
};
