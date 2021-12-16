import React, { useState } from "react";
import styled from "styled-components";
import TransparantBtnStyle from "./Styles/TransparantBtnStyle";
import ModalStyle from "./Styles/ModalStyle";
import Modal from "react-modal";

const Button = styled.button`
  ${TransparantBtnStyle}
`;

export const Rules = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
        <Button onClick={() => setIsOpen(true)}>rules</Button>
        <Modal isOpen={modalIsOpen} style={ModalStyle}>
            <h2>
                Rules{" "}
                <Button onClick={() => setIsOpen(false)}>close</Button>
            </h2>
            <br />
            <ol>
              <li>
                Each player is dealt 11 cards and take turns deciding on trump.
              </li>
              <li>  
                One player leads and the other must follow suit. The player with the higher card wins a trick and must lead a new card after.
              </li>
              <li>
                The player with the most tricks wins the hand. If a player makes it and loses they are euchred. Points are doubled when there's a euchre.
              </li>
              <li>
                A Joker beats any card and when it's played the other player is forced to play their highest card.
              </li>
            </ol>
        </Modal>
    </>
  )
}
