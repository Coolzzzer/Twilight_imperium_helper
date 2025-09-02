import { useState } from "react";
interface AddObjectPayload {
  date: string;
  quantity: number;
  set: PlayerData[];
}
interface PlayerData {
  player: string;
  fraction: number | null;
  result: boolean;
}
export const useAddObjectAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendAddObject = async (payload: AddObjectPayload) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://twilight-imperium-helper-api.onrender.com/date",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );
      if (!res.ok) throw new Error("Network response was not OK");
    } catch (err: any) {
      setError(err.message ?? "Unknown error");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendAddObject, loading, error };
};
