import { useState } from "react";
import { AddSet } from "../AddSet/AddSet";

interface PlayerData {
    player: string;
    fraction: number | null;
    result: boolean;
}

export const AddObject = () => {
    const [date, setDate] = useState<string>("");
    const [quantity, setQuantity] = useState<number | null>(null);
    const [players, setPlayers] = useState<PlayerData[]>([]);

    const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(event.target.value), 8);
        setQuantity(value);
        setPlayers(Array.from({ length: value }, () => ({ player: "", fraction: null, result: false })));
    };

    const updatePlayerData = (index: number, updatedData: Partial<PlayerData>) => {
        setPlayers((prev) =>
            prev.map((player, i) => (i === index ? { ...player, ...updatedData } : player))
        );
    };

    const handleSave = async () => {
        if (!date) {
            alert("Выберите дату!");
            return;
        }
        if (!quantity || quantity < 1) {
            alert("Введите количество игроков!");
            return;
        }
        if (players.some((player) => !player.player.trim())) {
            alert("Заполните имена всех игроков!");
            return;
        }
        if (players.some((player) => player.fraction === null)) {
            alert("Выберите фракцию для каждого игрока!");
            return;
        }
        if (!players.some((player) => player.result)) {
            alert("Выберите хотя бы одного победителя!");
            return;
        }
        
        const requestData = { date, quantity, set: players };

        try {
            const response = await fetch("http://localhost:5000/date", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestData),
            });

            if (!response.ok) {
                throw new Error("Ошибка при отправке данных");
            }

            alert("Данные успешно сохранены!");
        } catch (error) {
            console.error("Ошибка:", error);
            alert("Ошибка при сохранении данных.");
        }
    };

    return (
        <>
            <label>
                Выберите дату: <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
            </label>
            <label>
                Количество игроков:
                <input type="number" placeholder="Введите количество игроков" value={quantity ?? ""} onChange={handleQuantityChange} max={8} />
            </label>

            {players.map((player, index) => (
                <AddSet
                    key={index}
                    selectedItem={player.fraction}
                    setSelectedItem={(fraction) => updatePlayerData(index, { fraction })}
                    changeItem={player.player}
                    setChangeItem={(playerName) => updatePlayerData(index, { player: playerName })}
                    result={player.result}
                    setResult={(result) => updatePlayerData(index, { result })}
                />
            ))}

            <button onClick={handleSave}>Сохранить данные</button>
        </>
    );
};
