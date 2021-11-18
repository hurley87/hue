import { Meteor } from "meteor/meteor";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TransparantBtnStyle from "./Styles/TransparantBtnStyle";
import ErrorStyle from "./Styles/ErrorStyle";
import { Loading } from "./Loading";
import { ethers } from "ethers";
import Modal from "react-modal";

const Nav = styled.div`
  width: 95%;
  margin: auto;
  padding: 10px;
  clear: both;
  margin-bottom: 100px;

  p {
    font-family: "Domine";
    float: left;
    font-weight: 700;
    margin: 0px;
    font-size: 16px;
  }

  button {
    ${TransparantBtnStyle}
  }
`;

const Main = styled.div`
  width: 95%;
  margin: auto;
  max-width: 520px;

  p {
    color: #2f2c2a;
    font-size: 18px;
    line-height: 150%;
    font-family: "Montserrat", sans-serif;
    text-align: center;
    line-height: 40px;
  }
  input {
    padding: 10px;
    font-size: 14px;
    color: #333333;
    border: 0px none #1a0033;
    border-radius: 2px;
    background: #ffffff;
    font-family: "Montserrat", sans-serif;
    margin: 5px;
    width: 62%;
    text-align: center;
    flex: 1;
  }
  button {
    color: white;
    border: 0;
    line-height: inherit;
    text-decoration: none;
    cursor: pointer;
    border-radius: 3px;
    background-color: #b366ff;
    font-family: "Montserrat", sans-serif;
    flex: 1;
    padding: 10px 0px;
    font-size: 14px;
    z-index: 14;
    width: 90%;
    max-width: 300px;
    margin: auto;
    display: block;
  }
`;

const Error = styled.div`
  ${ErrorStyle}
`;

const Avatar = styled.img`
  border-radius: 100px;
  cursor: pointer;
  border: 5px solid #fff;
  display: block;
  margin: auto;
  &:hover {
    border: 5px solid #b366ff;
  }
`;

const Switch = styled.div`
  ${SwitchStyle}
  margin-top: 30px;
`;

const customStyles = {
  content: {
    top: "40%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "95%",
    maxWidth: "600px",
    margin: "auto",
  },
  overlay: {
    zIndex: 2,
  },
};

const Close = styled.button`
  ${TransparantBtnStyle}
`;

export const NoAssets = ({ user }) => {
  const logout = () => Meteor.logout();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pickAvatar, setPickAvatar] = useState(false);
  const [assets, setAssets] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    checkWallet();
    setLoading(false);
  }, []);

  async function checkWallet() {
    setLoading(true);
    setError(false);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const address = await provider.resolveName(user.username);
    // address of creature collection now - should update to NFTs Opensea collection id
    const collectionAddress = "0xaf316251082fee7dff8412ca896601796674e0a6";

    fetch(
      `https://api.opensea.io/api/v1/assets?owner=${address}&asset_contract_address=${collectionAddress}&limit=20`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        console.log(response.assets);
        const osAssets = response.assets;
        setAssets(osAssets);
        osAssets.length === 0 ? setError(true) : setPickAvatar(true);
      })
      .catch((err) => console.error(err));

    setLoading(false);
  }

  return loading ? (
    <Loading />
  ) : (
    <div>
      <Nav>
        <p>
          gm,{" "}
          {user.username.includes(".eth")
            ? user.username
            : user.username.slice(0, 2) + "..." + user.username.slice(-4)}
        </p>
        <button className="btn" onClick={logout}>
          logout
        </button>
      </Nav>
      {pickAvatar ? (
        <Main>
          <p>Choose your avatar.</p>
          {assets.map((asset, i) => (
            <Avatar
              onClick={() =>
                Meteor.call("games.updateAvatar", asset.image_thumbnail_url)
              }
              key={i}
              src={asset.image_thumbnail_url}
            />
          ))}
        </Main>
      ) : (
        <Main>
          {error && (
            <Error>
              You don't have the right NFT. Refresh the page to check again.
            </Error>
          )}
          <p>
            You'll need to have a 2545 NFT in your{" "}
            {user.username.includes(".eth")
              ? user.username
              : user.username.slice(0, 2) +
                "..." +
                user.username.slice(-4)}{" "}
            wallet to get access the game.
          </p>
          <button
            onClick={() =>
              window.open(
                "https://opensea.io/collection/2545bygr4y?search[sortAscending]=true&search[sortBy]=PRICE&search[toggles][0]=BUY_NOW",
                "_blank"
              )
            }
          >
            Buy one on OpenSea
          </button>
          <Switch onClick={() => setIsOpen(true)}>What is OpenSea?</Switch>
          <Modal isOpen={modalIsOpen} style={customStyles}>
            <h2>
              What is OpenSea?{" "}
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
        </Main>
      )}
    </div>
  );
};
