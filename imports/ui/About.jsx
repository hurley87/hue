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
              I wrote a background on why I created an online version of Heads Up Euchre. Subscribe and I'll send you monthly updates.
            </p>
            <p>
              <a
                target="_blank"
                href="https://www.getrevue.co/profile/davidhurley/archive/798201"
              >
                View more
              </a>
            </p>
        </Modal>
    </>
  )
}
