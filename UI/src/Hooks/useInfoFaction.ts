import { useState, useEffect } from 'react';

export interface FactionResponse {
  id: number;
  name: string;  
  srcLogo:string;    
  srcInfo: string;
  srcToken: string;
}
export function useInfoFaction(initialId: number) {
  const [factionId, setFactionId] = useState<number>(initialId);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [name, setName] = useState<string>('');  
  const [srcLogo, setSrcLogo] = useState<string>('');  
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchFaction = async (id: number): Promise<void> => {
    setLoading(true);
    try {
      if(id==-1){
        return
      }
      const response = await fetch(`http://localhost:5000/initial/${id}`);
      if (!response.ok) {
        throw new Error(`Ошибка при получении данных: ${response.statusText}`);
      }
      const data: FactionResponse = await response.json();
      setImgSrc(data.srcInfo);
      setName(data.name);
      setSrcLogo(data.srcLogo)
    } catch (err: any) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaction(factionId);
  }, [factionId]);

  return { imgSrc, name, srcLogo, loading, error, setFactionId };
}

