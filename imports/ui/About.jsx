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
        <button onClick={() => setIsOpen(true)}>about</button>
        <Modal isOpen={modalIsOpen} style={ModalStyle}>
            <h2>
                About{" "}
                <Close onClick={() => setIsOpen(false)}>close</Close>
            </h2>
            <br />
            <p>
                OpenSea is the largest peer-to-peer marketplace for NFTs. You can
                think of NFTs as collectable digital assets that you can own like
                art in the real world. On OpenSea, anyone can buy or sell these
                assets using their crypto wallet.
            </p>
        </Modal>
    </>
  )
}
