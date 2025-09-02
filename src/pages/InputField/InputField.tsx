import React, { useEffect, useState } from "react";
import { AddSet } from "../../components/AddSet/AddSet";
import { useAddObject } from "../../Hooks/useAddObject";
import { useAddObjectAPI } from "../../Hooks/useAddObjectAPI";
import styles from "./InputField.module.css";

export const InputField: React.FC<{ save: boolean }> = ({ save }) => {
  const {
    date,
    setDate,
    quantity,
    handleQuantityChange,
    players,
    updatePlayerData,
    validate,
    getPayload,
  } = useAddObject();

  const { sendAddObject, loading, error } = useAddObjectAPI();
  const [gameMode, setGameMode] = useState<10 | 14>(10);

  useEffect(() => {
    if (!save) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
    }
  }, [save, setDate]);

  const handleSave = async () => {
    const v = validate();
    if (!v.valid) {
      alert(v.error);
      return;
    }

    const payload = getPayload();

    if (!save) {
      (payload as any).gameMode = gameMode;
      (payload as any).set = (payload as any).set.map((player: any) => ({
        ...player,
        point: 0,
      }));
    }

    try {
      if (save) {
        await sendAddObject(payload);
        alert("Данные успешно сохранены!");
      } else {
        localStorage.setItem("startData", JSON.stringify(payload));
        alert("Данные сохранены в localStorage.");
      }
    } catch {
      alert(
        save
          ? "Ошибка при сохранении данных."
          : "Ошибка при сохранении в localStorage."
      );
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftPanel}>
        {save ? (
          <label className={styles.label}>
            Выберите дату:
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={styles.input}
            />
          </label>
        ) : (
          <div className={styles.label}>
            Выберите режим:
            <select
              value={gameMode}
              onChange={(e) => setGameMode(Number(e.target.value) as 10 | 14)}
              className={styles.select}
            >
              <option value={10}>10</option>
              <option value={14}>14</option>
            </select>
          </div>
        )}

        <div className={styles.label}>
          Количество игроков:
          <input
            type="number"
            placeholder="Введите количество"
            value={quantity ?? ""}
            max={8}
            min={3}
            onChange={(e) => handleQuantityChange(Number(e.target.value))}
            className={styles.input}
          />
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <button
          onClick={handleSave}
          disabled={loading}
          className={styles.button}
        >
          {loading ? "Обработка…" : "Сохранить"}
        </button>
      </div>

      <div className={styles.rightPanel}>
        {players.map((p, idx) => (
          <AddSet
            key={idx}
            selectedItem={p.fraction}
            setSelectedItem={(frac) =>
              updatePlayerData(idx, { fraction: frac })
            }
            changeItem={p.player}
            setChangeItem={(name) => updatePlayerData(idx, { player: name })}
            result={p.result}
            setResult={(res) => updatePlayerData(idx, { result: res })}
            showResult={save}
          />
        ))}
      </div>
    </div>
  );
};
