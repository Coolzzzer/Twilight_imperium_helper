import DeleteObjectStyle from "./DeleteObject.module.css";

type DeleteObjectProps = {
  id: string;
};

export const DeleteObject: React.FC<DeleteObjectProps> = ({ id }) => {
  const handleDelete = async () => {
    try {
      const response = await fetch(
        `https://twilight-imperium-helper-api.onrender.com/date/${id}`,
        {
          method: "DELETE",
        }
      );

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
      <button
        onClick={handleDelete}
        className={DeleteObjectStyle.deleteButton}
        style={{
          display: "flex",
          backgroundColor: "red",
          padding: "1vh",
          marginTop: "4vh",
          borderRadius: "1vh",
          width: "10vh",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Удалить
      </button>
    </>
  );
};
