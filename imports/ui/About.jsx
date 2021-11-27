import React, { useState } from "react";
import styled from "styled-components";
import TransparantBtnStyle from "./Styles/TransparantBtnStyle";
import ModalStyle from "./Styles/ModalStyle";
import Modal from "react-modal";

const Close = styled.button`
  ${TransparantBtnStyle}
`;

export const About = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
        <Close onClick={() => setIsOpen(true)}>about</Close>
        <Modal isOpen={modalIsOpen} style={ModalStyle}>
            <h2>
                About{" "}
                <Close onClick={() => setIsOpen(false)}>close</Close>
            </h2>
            <br />
            <p>
              My parents taught my brother and me how to play Euchre when we were young. I have fond memories of the four of us playing. They taught us unwritten rules like “don’t trump your partner’s ace” and “kill as you go”. Since then, I’ve always been on the lookout for a game.
            </p>
            <p>
              I moved home shortly after university to learn how to code and while I was there, my Mom and I invented a two person Euchre game, one that we still play, years later. It's called Hue. It's almost the same as the 4-person version with some differences.
            </p>
            <p>
              Each player is dealt 11 cards as follows. The first 5 cards are hand held and remain hidden from the opponent. Next, each player is dealt a row of three cards, face down, with another row of three cards on top, facing up.
            </p>
            <p>
              
            </p>
        </Modal>
    </>
  )
}
