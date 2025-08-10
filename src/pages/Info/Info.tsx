import React from 'react';
import { useInfoFaction } from '../../Hooks/useInfoFaction';
import { GetFraction } from '../../components/GetFraction/GetFraction';


export const Info: React.FC = () => {
        const { imgSrc, name, loading, error, setFactionId } = useInfoFaction(-1);
        const buttons = Array.from({ length: 25 }, (_, i) => i++);      
        return (
          <div>
            <div>
              {buttons.map((id) => (
                <button key={id} onClick={() => setFactionId(id) } style={{margin:"3px",padding:"3px"}}>
                        <GetFraction  imgToken={false} id={id} img={true} name={true} />{" "}
                </button>
              ))}
            </div>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {imgSrc && (
              <div style={{ justifyContent:"center", display:"flex"}}>
                <img src={imgSrc} alt={`Фракция ${name}`}/>
              </div>
            )}
          </div>
        );
      };