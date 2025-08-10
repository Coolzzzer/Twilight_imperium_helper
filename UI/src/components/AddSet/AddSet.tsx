import { useState } from "react";
import AddSetStyle from "./AddSet.module.css";
import { GetFraction } from "../GetFraction/GetFraction";

type AddSetItem = {
    selectedItem: number | null;
    setSelectedItem: (item: number | null) => void;
    changeItem: string;
    setChangeItem: (item: string) => void;
    result: boolean;
    setResult: (value: boolean) => void;
    showResult:boolean
};

export const AddSet: React.FC<AddSetItem> = ({ selectedItem, setSelectedItem, changeItem, setChangeItem, result, setResult, showResult  }) => {
  const [isOpen, setIsOpen] = useState(false);
  const items = Array.from({ length: 25 }, (_, i) => i);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (item: number) => {
    setSelectedItem(item);
    setIsOpen(false);
  };
  return (
    <div>
        <input
            placeholder="Введите имя игрока"
            value={changeItem} 
            onChange={(e) => setChangeItem(e.target.value)} 
        />
        <button onClick={toggleDropdown}>
            {selectedItem !== null ? <GetFraction imgToken={false} id={selectedItem} img={true} name={false} /> : "Выберите фракцию"}
        </button>
        {isOpen && (
            <ul
                style={{
                    position: "absolute",
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    backgroundColor:"#030622",
                    width: "270px",

                }}
            >
                {items.map((item) => (
                    <li
                        key={item}
                        onClick={() => handleSelect(item)}
                        style={{
                            cursor: "pointer",
                        }}               >
                        <GetFraction imgToken={false} id={item} img={true} name={true} />
                    </li>
                ))}
            </ul>
        )}
        {showResult &&(<label>
            <input 
                type="checkbox" 
                checked={result} 
                onChange={(e) => setResult(e.target.checked)} 
            />
            Победил 
        </label>)}
    </div>
  );
};
