import { useState } from "react";

interface PlayerData {
  player: string;
  fraction: number | null;
  result: boolean;
}

interface AddObjectPayload {
  date: string;
  quantity: number;
  set: PlayerData[];
}

export const useAddObject = () => {
  const [date, setDate] = useState<string>("");
  const [quantity, setQuantity] = useState<number | null>(null);
  const [players, setPlayers] = useState<PlayerData[]>([]);
  const [showResult, setShowResult] = useState<boolean>(false);

  const handleQuantityChange = (value: number) => {
    const qty = Math.max(3, Math.min(value, 8)); // ограничение от 3 до 8
    setQuantity(qty);
    setPlayers(
      Array.from({ length: qty }, () => ({
        player: "",
        fraction: null,
        result: false,
      }))
    );
  };

  const updatePlayerData = (index: number, updated: Partial<PlayerData>) => {
    setPlayers((prev) =>
      prev.map((p, i) => (i === index ? { ...p, ...updated } : p))
    );
  };

  const validate = (): { valid: true } | { valid: false; error: string } => {
    if (!date) return { valid: false, error: "Выберите дату!" };
    if (!quantity || quantity < 1)
      return { valid: false, error: "Введите количество игроков!" };
    if (players.some((p) => !p.player.trim()))
      return { valid: false, error: "Заполните имена всех игроков!" };
    if (players.some((p) => p.fraction === null))
      return { valid: false, error: "Выберите фракцию для каждого игрока!" };
    if (showResult) {
      if (!players.some((p) => p.result))
        return { valid: false, error: "Выберите хотя бы одного победителя!" };
    }
    return { valid: true };
  };

  const getPayload = (): AddObjectPayload => ({
    date,
    quantity: quantity!,
    set: players,
  });

  return {
    date,
    setDate,
    quantity,
    handleQuantityChange,
    players,
    updatePlayerData,
    validate,
    getPayload,
    showResult,
  };
};
