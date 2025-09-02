import { useState } from "react";
import styles from "./AddSet.module.css";
import { GetFraction } from "../GetFraction/GetFraction";

type AddSetItem = {
  selectedItem: number | null;
  setSelectedItem: (item: number | null) => void;
  changeItem: string;
  setChangeItem: (item: string) => void;
  result: boolean;
  setResult: (value: boolean) => void;
  showResult: boolean;
};

export const AddSet: React.FC<AddSetItem> = ({
  selectedItem,
  setSelectedItem,
  changeItem,
  setChangeItem,
  result,
  setResult,
  showResult,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const items = Array.from({ length: 25 }, (_, i) => i);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (item: number) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  return (
    <div className={styles.container}>
      <input
        className={styles.input}
        placeholder="Введите имя игрока"
        value={changeItem}
        onChange={(e) => setChangeItem(e.target.value)}
      />

      <button className={styles.dropdownButton} onClick={toggleDropdown}>
        {selectedItem !== null ? (
          <GetFraction
            imgToken={false}
            id={selectedItem}
            img={true}
            name={false}
          />
        ) : (
          "Выберите фракцию"
        )}
      </button>

      {isOpen && (
        <ul className={styles.dropdownList}>
          {items.map((item) => (
            <li
              key={item}
              className={styles.dropdownItem}
              onClick={() => handleSelect(item)}
            >
              <GetFraction imgToken={false} id={item} img={true} name={true} />
            </li>
          ))}
        </ul>
      )}

      {showResult && (
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={result}
            onChange={(e) => setResult(e.target.checked)}
          />
          Победил
        </label>
      )}
    </div>
  );
};
