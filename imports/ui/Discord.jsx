import React, { useState } from "react";
import styled from "styled-components";
import TransparantBtnStyle from "./Styles/TransparantBtnStyle";
import ModalStyle from "./Styles/ModalStyle";
import Modal from "react-modal";

const SimpleBtn = styled.button`
  ${TransparantBtnStyle}
  margin-left: 0px;
`;

export const Discord = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
        <SimpleBtn onClick={() => setIsOpen(true)}>discord</SimpleBtn>
        <Modal isOpen={modalIsOpen} style={ModalStyle}>
            <h2>
                Discord{" "}
                <SimpleBtn onClick={() => setIsOpen(false)}>Close</SimpleBtn>
            </h2>
            <br />
            <p>
              Discord is a free voice, video, and text chat app that we use to coordinate online Euchre games. 
              Ideally, we create a thriving community around the conversations that'll happen there.
            </p>
            <p>
              <a
                target="_blank"
                href="https://discord.gg/rfpqYcmHPu"
              >
                View Discord
              </a>
            </p>
        </Modal>
    </>
  )
}
