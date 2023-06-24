import { Card } from "./components";
import classes from "./assets/css/board.module.scss";
import { useEffect, useState } from "react";

export interface Image {
  src: string;
  matched: boolean;
}

export interface CardData extends Image {
  id: number;
}

function App() {
  const [cards, setCards] = useState<CardData[]>([]);
  const [turn, setTurn] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [choiceOne, setChoiceOne] = useState<CardData | null>(null);
  const [choiceTwo, setChoiceTwo] = useState<CardData | null>(null);

  const images: Image[] = [
    { src: "1", matched: false },
    { src: "2", matched: false },
    { src: "3", matched: false },
    { src: "4", matched: false },
    { src: "5", matched: false },
    { src: "6", matched: false },
    { src: "7", matched: false },
    { src: "8", matched: false },
    { src: "9", matched: false },
    { src: "10", matched: false },
  ];

  // useEffect(() => {

  const shuffleCards = () => {
    let arr = [...images, ...images]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(arr);
    setTurn(0);
  };
  // }, []);

  const handleChoice = (card: CardData) => {
    if (!choiceOne) {
      setChoiceOne(card);
    } else if (!choiceTwo) {
      setChoiceTwo(card);
    }
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        console.log("Those cards match");
        resetTurn();
      } else {
        console.log("Those cards do not match");
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  console.log(cards);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurn((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <>
      <div className={classes.board}>
        <div className={classes.title}>
          <h2>Memory game</h2>
          <span>Turn {turn}</span>
          <button onClick={shuffleCards}>New game</button>
        </div>
        {cards.map((card) => (
          <Card
            card={card}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            key={card.id}
            onChoice={handleChoice}
            disabled={disabled}
          />
        ))}
      </div>
    </>
  );
}

export default App;