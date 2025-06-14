import React from "react";
import { AddSet } from "../../components/AddSet/AddSet";
import { useAddObject } from "../../Hooks/useAddObject";
import { useAddObjectAPI } from "../../Hooks/useAddObjectAPI";
import InputFieldStyle from "./InputField.module.css"
export const InputField: React.FC = () => {
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

  const handleSave = async () => {
    const v = validate();
    if (!v.valid) {
      alert(v.error);
      return;
    }
    try {
      await sendAddObject(getPayload());
      alert("Данные успешно сохранены!");
    } catch {
      alert("Ошибка при сохранении данных.");
    }
  };

  return (
    <div>
      <label>
        Выберите дату:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </label>

      <label>
        Количество игроков:
        <input
          type="number"
          placeholder="Введите количество"
          value={quantity ?? ""}
          max={8}
          onChange={e =>
            handleQuantityChange(Number(e.target.value))
          }
        />
      </label>

      {players.map((p, idx) => (
        <AddSet
          key={idx}
          selectedItem={p.fraction}
          setSelectedItem={frac =>
            updatePlayerData(idx, { fraction: frac })
          }
          changeItem={p.player}
          setChangeItem={name =>
            updatePlayerData(idx, { player: name })
          }
          result={p.result}
          setResult={res =>
            updatePlayerData(idx, { result: res })
          }
        />
      ))}

      {error && <div style={{ color: "red" }}>{error}</div>}

      <button onClick={handleSave} disabled={loading}>
        {loading ? "Сохраняем…" : "Сохранить данные"}
      </button>
    </div>
  );
};
