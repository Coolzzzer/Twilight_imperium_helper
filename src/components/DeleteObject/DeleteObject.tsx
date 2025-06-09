import DeleteObjectStyle from "./DeleteObject.module.css";

type DeleteObjectProps = {
    id: string;
};

export const DeleteObject: React.FC<DeleteObjectProps> = ({ id }) => {
    
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5000/date/${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                throw new Error("Ошибка при удалении данных");
            }

            alert("Запись успешно удалена!");
            window.location.reload(); // Перезагружаем страницу, чтобы обновить список
        } catch (error) {
            console.error("Ошибка удаления:", error);
            alert("Ошибка при удалении.");
        }
    };

    return (
        <>
            <div onClick={handleDelete} className={DeleteObjectStyle.deleteButton}>Удалить</div>
        </>
    );
};
