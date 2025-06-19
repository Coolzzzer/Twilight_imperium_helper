import { InputField } from "../../pages/InputField/InputField";
import StartStyle from "./Start.module.css";

type StartProps = {
    isStart: boolean| null,
    startGame: ()=> void,
    endGame: ()=> void
}
export const Start:React.FC<StartProps> = ({isStart,startGame,endGame}) => {

    return (
        <>
            { !isStart? <button onClick={startGame}>Начать игру</button>: <button onClick={endGame}>Закончить игру</button>}
            {!isStart &&(<InputField save={false}/>)}
        </>
    );
};
