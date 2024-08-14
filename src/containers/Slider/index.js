import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Cloner et trier les données sans modifier l'état original
  const byDateDesc = data?.focus
    .slice()
    .sort((evtA, evtB) => (new Date(evtA.date) > new Date(evtB.date) ? -1 : 1));

  // Fonction pour passer à la carte suivante
  useEffect(() => {
    const interval = setInterval(() => {
      if (byDateDesc?.length) {
        setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
      }
    }, 5000);

    // Nettoyer l'intervalle à la fin
    return () => clearInterval(interval);
  }, [byDateDesc]);

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.title}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => (
            <input
              key={`${_.title}-radio`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              readOnly
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
