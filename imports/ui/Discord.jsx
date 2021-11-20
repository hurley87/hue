import React, { useState } from "react";
import styled from "styled-components";
import TransparantBtnStyle from "./Styles/TransparantBtnStyle";
import ModalStyle from "./Styles/ModalStyle";
import MainCTAStyle from "./Styles/MainCTAStyle";
import Modal from "react-modal";

const JoinDiscordButton = styled.button`${MainCTAStyle}`;  

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
                OpenSea is the largest peer-to-peer marketplace for NFTs. You can
                think of NFTs as collectable digital assets that you can own like
                art in the real world. On OpenSea, anyone can buy or sell these
                assets using their crypto wallet.
            </p>
            <p><a style={{textDecoration: "none"}} target="_blank" href="https://discord.gg/G8NcDnWb"><JoinDiscordButton>Join our Discord</JoinDiscordButton></a></p>
        </Modal>
    </>
  )
}
