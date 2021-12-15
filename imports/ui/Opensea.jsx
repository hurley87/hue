import React, { useState } from "react";
import styled from "styled-components";
import TransparantBtnStyle from "./Styles/TransparantBtnStyle";
import ModalStyle from "./Styles/ModalStyle";
import Modal from "react-modal";

const Button = styled.button`
  ${TransparantBtnStyle}
`;

export const Opensea = () => {
  const [modalIsOpen, setIsOpen] = useState(false);

  return (
    <>
        <Button onClick={() => setIsOpen(true)}>opensea</Button>
        <Modal isOpen={modalIsOpen} style={ModalStyle}>
            <h2>
                OpenSea{" "}
                <Button onClick={() => setIsOpen(false)}>close</Button>
            </h2>
            <br />
            <p>
                OpenSea is the largest peer-to-peer marketplace for NFTs. You can
                think of NFTs as collectable digital assets that you can own like
                art in the real world. On OpenSea, anyone can buy or sell Heads Up Euchre NFTs.
            </p>
            <p>
              <a
                target="_blank"
                href="https://opensea.io/collection/headsupeuchre"
              >
                View Opensea Collection
              </a>
            </p>
        </Modal>
    </>
  )
}
