import React from 'react';
import { useInfoFaction } from '../../Hooks/useInfoFaction';
import InfoStyle from './Info.module.css';
import { GetFraction } from '../../components/GetFraction/GetFraction';


export const Info: React.FC = () => {
        const { imgSrc, name, srcLogo, loading, error, setFactionId } = useInfoFaction(-1);
        const buttons = Array.from({ length: 25 }, (_, i) => i++);      
        return (
          <div className={InfoStyle.container}>
            <div className={InfoStyle.buttonsWrapper}>
              {buttons.map((id) => (
                <button key={id} onClick={() => setFactionId(id)}>
                        <GetFraction id={id} img={true} name={true} />{" "}
                </button>
              ))}
            </div>
            {loading && <p>Загрузка...</p>}
            {error && <p>{error}</p>}
            {imgSrc && (
              <div className={InfoStyle.factionDetails}>
                <img src={imgSrc} alt={`Фракция ${name}`}/>
              </div>
            )}
          </div>
        );
      };