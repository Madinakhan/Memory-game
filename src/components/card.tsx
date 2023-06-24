import React, { useEffect, useState } from "react";
import "../assets/css/main.css";
import cover from "../assets/images/cover.jpg";
import { CardData } from "../App";

interface CardProps {
  card: { src: string; id: number; matched: boolean };
  flipped: boolean;
  onChoice: (card: CardData) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onChoice, flipped, disabled }) => {
  const [find, setFind] = useState("");
  let img = require(`../assets/images/${card.src}.jpg`);

  useEffect(() => {
    if (card.matched) {
      setFind("find");
    } else {
      setFind("");
    }
  }, [card.matched]);

  const handleClick = () => {
    if (!disabled) {
      onChoice(card);
    }
  };
  return (
    <div className={`item ${find}`} onClick={handleClick}>
      <div className={`${flipped ? "flipped" : ""} `}>
        <img src={img} className="cover" alt="" />
        <img src={cover} className="main-img" alt="" />
      </div>
    </div>
  );
};

export default Card;