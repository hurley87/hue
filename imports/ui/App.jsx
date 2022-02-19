import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { providers } from "ethers";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { useTracker } from 'meteor/react-meteor-data';
import { NoGame } from './NoGame';
import { Game } from './Game';
import { CardModal } from './CardModal';
import { HomepageNav } from './HomepageNav';
import { GamesCollection } from "../db/GamesCollection";
import styled from 'styled-components';
import { NoAssets } from './NoAssets';
import ErrorStyle from "./Styles/ErrorStyle";
import ModalStyle from "./Styles/ModalStyle"; 
import MainCTAStyle from "./Styles/MainCTAStyle"; 
import Modal from 'react-modal';
import formatUsername from '../lib/formatUsername';
import ReactPlayer from "react-player";

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
        margin-top: 0px;
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

const Content = styled.div`
  width: 95%;
  margin: auto;
  max-width: 1000px;
  padding-top: 50px;

  h2 {
    font-size: 45px;
    line-height: 110%;
    font-family: "Domine";
    color: #292827;
    margin-top: 100px;
    margin-bottom: 30px;
  }

  p, ol, li {
    color: #2f2c2a;
    font-size: 24px;
    line-height: 130%;
    font-family: 'Montserrat', sans-serif;
    margin-top: 10px;
  }

  li {
    margin: 20px 0px;
  }

  b{
    font-weight: 900;
  }

  .suitButtons {
    display: flex;
    max-width: 500px;
    padding-top: 10px;
    padding-bottom: 25px;
  }

  .suitButtons button{
    justify-content: space-between;
    width: 100px;
    margin-right: 10px;
    border-radius: 100px;
    border: 5px solid #2f2c2a;
    cursor: pointer;
  }

  .suitButtons button img{
    width: 100%;
  }

  .active {
    border: 5px solid #b366ff !important;
  }
`;

const ConnectButton = styled.button`${MainCTAStyle}`;  

const Error = styled.div`${ErrorStyle}`;
const SwitchLink = styled.div`
  ${SwitchStyle}
  margin-top: 30px;
`;
const Close = styled.button`
    ${TransparantBtnStyle}

`;
const CardRow = styled.div`
  display: flex;
  margin-top: 20px;
  margin-bottom: 30px;
  img {
    justify-content: space-between;
    width: 13%;
    margin-right: 10px;
    border-radius: 3px;
    cursor: pointer;
  }
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
  const user = useTracker(() => Meteor.user(), [])
  const gameId = user?.profile.gameId
  console.log("GAMEID")
  console.log(gameId)  

  const loading = useTracker(() => {
    const handler = Meteor.subscribe('games.view', gameId);
    const handler2 =  Meteor.subscribe('games.userData');
    return !handler.ready() && !handler2.ready();
  },[gameId])

  const game = useTracker(() => {
    console.log('cool tron')
    console.log(gameId)
    const game = GamesCollection.findOne({_id: gameId});
    console.log('TRON')
    console.log(game)
    return game
  }, [gameId]);
  console.log("GM")
  console.log(game)

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
                Meteor.call("games.discord", "911391777955659819", `${formatUsername(username)} connected their wallet`)
              }
          });
        }
      });
    } catch {
      setError(true)
    }
  }

  console.log("GAME")
  console.log(game)

  console.log(loading)

  return (
    <Main>
      {
        user ? loading ? <div>loading ...</div> : (
          <>
            {
              game ? <Game user={user} game={game} /> : user.profile && user.profile.avatar ? <NoGame user={user} /> : <NoAssets user={user} />
            }

          </>
        ) : (
          <>
              <Headline>
                  <HomepageNav/>
                  <h1>Heads Up Euchre</h1>
                  <p>Earn ETH while playing Euchre online with your friends. Connect your wallet to get started.</p>
              </Headline>
              {
                error && (
                    <Error>There was an error connecting your wallet. Email david@headsupeuchre.com.</Error>
                )
              }
              <Desktop>
                <ConnectButton onClick={() => connect()}>Connect your wallet</ConnectButton>
                <SwitchLink onClick={() => setIsOpen(true)}>{`Don't have a wallet?`}</SwitchLink>
              </Desktop>
              <Mobile>
                <Error>This game is only available on desktop.</Error>
              </Mobile>
              <Content>
                <h2>Game & NFT Collection</h2>
                <p>
                  1337 unique, randomly generated cards make up the collection. NFT owners will get access to online card tournaments where they can earn ETH. You can mint one using this website or buy one from someone else on Opensea.
                </p>
                <CardRow>
                  <CardModal cardImg={"/Jokers/Zombie.png"} />
                  {['A', 'K', 'Q', 'J', '10'].map((card, i) => <CardModal key={i} cardImg={`/Hearts/${card}.png`} />)}
                </CardRow>
                <h2>Roadmap</h2>
                <ol>
                  <li>Publish online game, establish Discord community and mint all 1337 NFTs.</li>
                  <li>
                    Create a leaderboard. The first 10 players to get to 1,000 points will earn 0.1 ETH. 
                    
                  </li>
                  <li>
                    Create a day long tournament where the winner earns 0.1 ETH.  
                  </li>
                </ol>
                <h2>Frequently Asked Questions</h2>
                <br />
                <p><b>What is ETH?</b></p>
                <p><small>ETH is short for Ethereum.</small></p>
                <br />
                <p><b>What is an NFT?</b></p>
                <p><small>An NFT stands for “Non-fungible token” and is a fancy way of saying it’s a unique, one of a kind digital item that users can buy, own, and trade. Some NFTs main function are to be digital art and look cool, some offer additional utility like exclusive access to websites or participation in an event, think of it like a rare piece of art that can also act as a “membership” card.</small></p>
                <br />
                <p><b>What is a wallet?</b></p>
                <p><small>A crypto wallet is used to store your Ethereum and is needed to purchase and mint a Heads Up Euchre NFT. This will allow websites (that you authorize) access to your wallet for transactions. Having a wallet gives you an Ethereum address (i.e. 0xABCD….1234), this is where your NFT will be stored.</small></p>
                <br />
                <p><b>Why only 1337 Heads Up Euchre NFTs? </b></p>
                <p><small>1337 is a language for internet users known for replacing letters with numbers or symbols. The term itself has gone on as a slang term for “extremely skilled (at gaming or computing)” or, more generally, “awesome.” 
                  Basically, the Heads Up Euchre game is awesome.</small></p>
                <br />
                <p><b>What does minting mean?</b></p>
                <p><small>Minting NFT refers to the process of turning a digital file into a crypto collectible or digital asset on the Ethereum blockchain. The digital item or file is stored in this decentralized database or distributed ledger forever, and it is impossible to edit, modify, or delete it. You own your Heads Up Euchre card and only you can decide to keep or sell it.</small></p>
                <br />
                <p><b>How much is a Heads Up Euchre NFT?</b></p>
                <p><small>You can mint one for 0.05 ETH + gas fees.</small></p>
                <br />
                <p><b>How many NFTs can I mint? </b></p>
                <p><small>You can only mint 1 NFT. This is done to maximize the number of unique owners and hopefully, players in our Heads Up Euchre league.</small></p>
                <br />
                <p><b>What if I have more questions?</b></p>
                <p><small>Join Discord and ask away.</small></p>
              </Content>
              <HomepageNav/>
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
            Wallets are used to send, receive, and store digital assets like NFTs, tokens and cryptocurrencies like ETH. 
            We recommend signing up for <a target="_blank" href="https://metamask.io/">MetaMask</a> or <a target="_blank" href="https://wallet.coinbase.com/">Coinbase</a> and using their browser extension. 
          </p>
          <ReactPlayer width="100%" height="340px" url="https://www.youtube.com/watch?v=OsRIHlr0_Iw" />
      </Modal>
    </Main>
  )
}




