import { Meteor } from "meteor/meteor";
import React, { useState } from "react";
import styled from "styled-components";
import TransparantBtnStyle from "./Styles/TransparantBtnStyle";
import ErrorStyle from "./Styles/ErrorStyle";
import { Loading } from "./Loading";
import { ethers } from "ethers";

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
  max-width: 500px;

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
    margin: 3px;
    width: 48%;
  }
`;

const Error = styled.div`
  ${ErrorStyle}
`;

const Avatar = styled.img`
  border-radius: 100px;
  cursor: pointer;
  border: 5px solid #fff;
  &:hover {
    border: 5px solid #b366ff;
  }
`;

export const NoAssets = ({ user }) => {
  const logout = () => Meteor.logout();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pickAvatar, setPickAvatar] = useState(false);
  const [assets, setAssets] = useState(false);

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
          <p>Pick an NFT you'd like to make your avatar.</p>
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
              There's no 2545 NFT in your wallet. You'll need to buy one first.
            </Error>
          )}
          <p>
            You'll need to have a 2545 NFT in your{" "}
            {user.username.includes(".eth")
              ? user.username
              : user.username.slice(0, 4) +
                "..." +
                user.username.slice(-4)}{" "}
            wallet to get access to Hue.
          </p>
          <button
            onClick={() =>
              window.open("https://opensea.io/collection/2545bygr4y", "_blank")
            }
          >
            I need to buy one first
          </button>
          <button onClick={() => checkWallet()}>I have one in my wallet</button>
        </Main>
      )}
    </div>
  );
};
