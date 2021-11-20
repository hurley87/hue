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
                What is OpenSea?{" "}
                <Button onClick={() => setIsOpen(false)}>close</Button>
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
