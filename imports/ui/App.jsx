import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { providers } from "ethers";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { useTracker } from 'meteor/react-meteor-data';
import { NoGame } from './NoGame';
import { Game } from './Game';
import { GamesCollection } from "../db/GamesCollection";
import styled from 'styled-components';
import { NoAssets } from './NoAssets';
import ErrorStyle from "./Styles/ErrorStyle";
import ModalStyle from "./Styles/ModalStyle"; 
import MainCTAStyle from "./Styles/MainCTAStyle"; 
import Modal from 'react-modal';

const Headline = styled.div`
    margin: auto;
    width: 95%;
    max-width: 1000px;
    text-align: center;

    h1 {
        font-size: 72px;
        line-height: 96px;
        font-family: "Domine";
        color: #292827;
        margin-top: 80px;
        margin-bottom: 0px;
    }

    p {
        color: #2f2c2a;
        font-size: 28px;
        line-height: 150%;
        font-family: 'Montserrat', sans-serif;
        margin: 30px;
        margin-top: 10px;

        @media (max-width: 800px) {
            font-size: 24px;
        }

        b {
            background: #2f2c2a;
            color: #fff;
        }
    }
`;

const ConnectButton = styled.button`${MainCTAStyle}`;  

const Error = styled.div`${ErrorStyle}`;
const Switch = styled.div`
  ${SwitchStyle}
  margin-top: 30px;
`;
const Close = styled.button`
    ${TransparantBtnStyle}

`;

const INFURA_ID = "d8fe044a671e41e6b3697f1167a3a5be";
const providerOptions = {
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to your Coinbase Wallet",
    },
    options: {
      appName: "Coinbase",
      networkUrl: `https://mainnet.infura.io/v3/${INFURA_ID}`,
      chainId: 1,
    },
    package: WalletLink,
    connector: async (_, options) => {
      const { appName, networkUrl, chainId } = options;
      const walletLink = new WalletLink({
        appName,
      });
      const provider = walletLink.makeWeb3Provider(networkUrl, chainId);
      await provider.enable();
      return provider;
    },
  },
};

let web3Modal;
if (typeof window !== "undefined") {
  web3Modal = new Web3Modal({
    network: "mainnet",
    cacheProvider: true,
    providerOptions,
  });
}


const Main = styled.div`
    width: 95%;
    margin: auto;
`;

const Desktop = styled.div`
  @media only screen and (max-width: 992px) {
    display: none;
  }
`;

const Mobile = styled.div`
  @media only screen and (min-width: 480px) {
    display: block;
  }
  @media only screen and (min-width: 992px) {
    display: none;
  }
`;

export const App = () => {
  const [error, setError] = useState(false);
  const [modalIsOpen,setIsOpen] = useState(false);
  const { user, game } = useTracker(() => {
    const noDataAvailable = { user: null, game: null};
    const handler = Meteor.subscribe('games');

    if (!handler.ready()) {
      return { ...noDataAvailable };
    }
    const game = GamesCollection.find().fetch()[0];
    const user = Meteor.user();

    return { user, game };
  });
  

  async function connect() {
    setError(false);

    try {
      const provider = await web3Modal.connect();
      const web3Provider = new providers.Web3Provider(provider);
      const signer = web3Provider.getSigner();
      const address = await signer.getAddress();
      let username = await web3Provider.lookupAddress(address);
      if(!username) username = address;
      const password = username;
  
      Meteor.loginWithPassword(username, password, function (err) {
        if (err) {
            Accounts.createUser({
              username,
              password,
          }, function (err) {
              if (err) {
                console.log(err)
              } else {
                Meteor.call("games.discord", "911391777955659819", `${username} connected their wallet`)
              }
          });
        }
      });
    } catch {
      setError(true)
    }
  }

  return (
    <Main>
      {
        user ? (
          <>
            {
              game ? <Game user={user} game={game} /> : user.profile && user.profile.avatar ? <NoGame user={user} /> : <NoAssets user={user} />
            }
          </>
        ) : (
          <>
              <Headline>
                  <h1>Heads Up Euchre</h1>
                  <p>Challenge a friend to a simple NFT card game. Connect your Ethereum wallet to get started.</p>
              </Headline>
              {
                error && (
                    <Error>There was an error connecting your wallet. Email david@headsupeuchre.com.</Error>
                )
              }
              <Desktop>
                <ConnectButton onClick={() => connect()}>Connect your wallet</ConnectButton>
                <Switch onClick={() => setIsOpen(true)}>{`Don't have a wallet?`}</Switch>
              </Desktop>
              <Mobile>
                <Error>This game is only available on desktop.</Error>
              </Mobile>
          </>
        )
      }
      <Modal
        isOpen={modalIsOpen}
        style={ModalStyle}
      >
          <h2>What is a wallet? <Close onClick={() => setIsOpen(false)}>close</Close></h2>
          <br />
          <p>
            Wallets are used to send, receive, and store digital assets like NFTs, tokens and cryptocurrencies. 
            We recommend signing up for <a target="_blank" href="https://metamask.io/">MetaMask</a> or <a target="_blank" href="https://wallet.coinbase.com/">Coinbase</a> and using their browser extension. 
          </p>
      </Modal>
    </Main>
  )
}




