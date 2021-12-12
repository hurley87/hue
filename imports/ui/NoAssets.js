import { Meteor } from "meteor/meteor";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import TransparantBtnStyle from "./Styles/TransparantBtnStyle";
import ErrorStyle from "./Styles/ErrorStyle";
import ModalStyle from "./Styles/ModalStyle";
import { Loading } from "./Loading";
import { Nav } from "./Nav";
import { ethers } from "ethers";
import Modal from "react-modal";
import formatUsername from "../lib/formatUsername";
import { createAlchemyWeb3 } from "@alch/alchemy-web3";
import axios from "axios";

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
    margin-bottom: 5px;
  }
`;

const Error = styled.div`
  ${ErrorStyle}
`;

const Avatar = styled.img`
  border-radius: 5px;
  cursor: pointer;
  border: 5px solid #fff;
  display: block;
  margin: auto;
  margin-bottom: 10px;

  &:hover {
    border: 5px solid #b366ff;
  }
`;

const Switch = styled.div`
  ${SwitchStyle}
  margin-top: 30px;
`;

const Close = styled.button`
  ${TransparantBtnStyle}
`;

export const NoAssets = ({ user }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [pickAvatar, setPickAvatar] = useState(false);
  const [assets, setAssets] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [address, setAddress] = useState("");
  const [contact, setContract] = useState(null);
  const [supply, setSupply] = useState(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    checkWallet();
    setLoading(false);
  }, []);

  async function checkWallet() {
    setLoading(true);
    setError(false);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const walletAddress = await provider.resolveName(user.username);
    setAddress(walletAddress);

    fetch(
      `https://api.opensea.io/api/v1/assets?owner=${walletAddress}&asset_contract_address=0xdb01de1d241d1e654b8344da9cda7dad1301f78a`,
      {
        method: "GET",
      }
    )
      .then((response) => response.json())
      .then((response) => {
        const osAssets = response.assets;
        console.log(osAssets);
        setAssets(osAssets);
        osAssets.length === 0 ? setError(true) : setPickAvatar(true);
      })
      .catch((err) => console.error(err));

    const alchemyapi =
      "https://eth-mainnet.alchemyapi.io/v2/sWFNWWS7dk2mxBO9nvGShTrqb5-N8-UK";

    const etherscanRequest = await axios.get(
      `https://api.etherscan.io/api?module=contract&action=getabi&address=0xdb01de1d241d1e654b8344da9cda7dad1301f78a&apikey=SHVWTFP641J7NHDHWFJ4VES93ZFIEM27M2`
    );
    const contractAbi = JSON.parse(etherscanRequest.data.result);
    const web3 = createAlchemyWeb3(alchemyapi);
    const value = web3.utils.toWei((0.05).toString(), "ether");
    const nftContract = new web3.eth.Contract(
      contractAbi,
      "0xdb01de1d241d1e654b8344da9cda7dad1301f78a"
    );
    const totalSupply = await nftContract.methods.totalSupply().call();

    setContract(nftContract);
    setValue(value);
    setSupply(totalSupply);
    setLoading(false);
  }

  async function mintNFT() {
    setIsMinting(true);

    contact.methods
      .mint(address, 1)
      .send({
        from: address,
        value,
      })
      .once("error", (err) => {
        console.log(err);
        setIsMinting(false);
      })
      .then((receipt) => {
        console.log(receipt);
        setIsMinting(false);
      });
  }

  return loading ? (
    <Loading />
  ) : (
    <>
      <Nav user={user} />
      {pickAvatar ? (
        <Main>
          <p>Choose an NFT to be your avatar.</p>
          {assets.map((asset, i) => (
            <Avatar
              onClick={() => {
                Meteor.call("games.updateAvatar", asset.image_thumbnail_url);
                Meteor.call(
                  "games.discord",
                  "911391777955659819",
                  `${formatUsername(user.username)}'s avatar ${
                    asset.image_thumbnail_url
                  }`
                );
              }}
              key={i}
              src={asset.image_thumbnail_url}
            />
          ))}
        </Main>
      ) : (
        <Main>
          {error && (
            <Error>
              You don't own the right NFT. Refresh the page to check again.
            </Error>
          )}
          {!isMinting ? (
            <>
              <p>
                You'll need to have a Heads Up Euchre NFT in your wallet to get
                access the game. It's easy to buy or mint one.
              </p>
              <p>
                <b>{1337 - supply} / 1337 left</b>
              </p>
              <button onClick={() => mintNFT(1)}>Mint 1 for 0.05 ETH</button>
              <Switch onClick={() => setIsOpen(true)}>
                What does Mint NFT mean?
              </Switch>
            </>
          ) : (
            <Loading />
          )}

          <Modal isOpen={modalIsOpen} style={ModalStyle}>
            <h2>
              What does Mint NFT mean?{" "}
              <Close onClick={() => setIsOpen(false)}>close</Close>
            </h2>
            <br />
            <p>
              OpenSea is the largest peer-to-peer marketplace for NFTs. You can
              think of NFTs as collectable digital assets that you can own like
              art in the real world. On OpenSea, anyone can buy or sell these
              assets using their crypto wallet.
            </p>
            <p>
              <a
                target="_blank"
                href={`https://etherscan.io/address/0xdb01de1d241d1e654b8344da9cda7dad1301f78a#code`}
              >
                Verified Contract Address
              </a>
            </p>
          </Modal>
        </Main>
      )}
    </>
  );
};
