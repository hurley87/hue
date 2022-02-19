import React, { useState } from "react";
import styled from "styled-components";
import ModalStyle from "./Styles/ModalStyle";
import Modal from "react-modal";

import TransparantBtnStyle from "./Styles/TransparantBtnStyle";

const Close = styled.button`
  ${TransparantBtnStyle}
`;

export const CardModal = ({ cardImg }) => {
  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
  const [card, setCard] = useState(null);

  function showCard(card) {
    setCardModalIsOpen(true);
    setCard(card);
  }

  function convertCard(card) {
    switch (card) {
      case "A":
        return "Ace";
      case "K":
        return "King";
      case "Q":
        return "Queen";
      case "J":
        return "Jack";
      case "10":
        return "Ten";
      case "9":
        return "Nine";
      default:
        return card;
    }
  }

  return (
    <>
      <img
        syle={{ zIndex: 99999 }}
        src={cardImg}
        onClick={() => showCard(cardImg)}
      />
      <Modal isOpen={cardModalIsOpen} style={ModalStyle}>
        <h2>
          {card &&
            !card.includes("Joker") &&
            convertCard(card.split("/")[2].split(".")[0]) +
              " of " +
              card.split("/")[1]}
          {card && card.includes("Royal") && "Royal Joker"}
          {card && card.includes("Zombie") && "Zombie Joker"}
          <Close onClick={() => setCardModalIsOpen(false)}>close</Close>
        </h2>
        <br />
        <img style={{ width: "400px", margin: "auto" }} src={card} />
      </Modal>
    </>
  );
};
