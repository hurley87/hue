import { Meteor } from 'meteor/meteor';
import React, { useState } from 'react';
import { providers } from "ethers";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { useTracker } from 'meteor/react-meteor-data';
import { NoGame } from './NoGame';
import { Game } from './Game';
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
  max-width: 1200px;
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
const Switch = styled.div`
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
  const [cardModalIsOpen, setCardModalIsOpen] = useState(false);
  const [card, setCard] = useState(null);
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

  function showCard(card) {
    setCardModalIsOpen(true)
    setCard(card)
  }
  
  function convertCard(card) {
    switch(card) {
      case "A":
        return "Ace"
      case "K":
        return "King"
      case "Q":
        return "Queen"
      case "J":
        return "Jack"
      case "10":
        return "Ten"
      case "9":
        return "Nine"
      default:
        return card;
    }
  }

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
                  <HomepageNav/>
                  <h1>Heads Up Euchre</h1>
                  <p>Earn ETH while playing Euchre online with your friends. Connect your wallet to get started. </p>
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
              <Content>
                <h2>Game & NFT Collection</h2>
                <p>
                  Traditionally, Euchre is played with four people but my Mom and I created a two player version we've been playing for years. If you’re fan of Euchre you’ll enjoy playing it heads up. Only Heads Up Euchre NFT holders will have access to the online game.</p>
                <p>
                  1337 unique, randomly generated pieces of art make up the NFT collection. You’ll need to own one to join our Euchre community as well. Community members will get access to exclusive online tournaments where winners can win ETH.
                </p>
                <CardRow>
                  {['A', 'K', 'Q', 'J', '10', '9'].map((card, i) => <img key={i} onClick={() => showCard(`/Hearts/${card}.png`)} src={`/Hearts/${card}.png`} />)}
                </CardRow>
                <p>                  
                  A Joker isn't tradionally used in Euchre but we added one to spice things up. Jokers are rarest and most valuable - there are only 33 Royal Jokers and 4 Zombie Jokers.
                </p>
                <CardRow>
                    <img src={`/Jokers/Royal.png`} onClick={() => showCard(`/Jokers/Royal.png`)}/>
                    <img src={`/Jokers/Zombie.png`} onClick={() => showCard(`/Jokers/Zombie.png`)}/>
                </CardRow>
                <h2>Roadmap</h2>
                <ol>
                  <li>Publish online game, establish Discord community and mint all 1337 Heads Up Euchre NFTs.</li>
                  <li>  
                    Create a leaderboard showcasing players with the most points. The first 10 players to get to 1,000 points will win 0.1 ETH. There'll also be day long tournament where the winner at the end of the day wins 0.1 ETH. 
                  </li>
                  <li>
                    Introduce a token so players can earn $hue while playing. Players will be able to win and lose $hue tokens based on their performance. 
                  </li>
                  <li>Create a device that'll record games played in real life. Sure, we'll start online, but it doesn't mean we can't meet for games IRL.</li>
                </ol>
                <h2>Join Our Euchre Club</h2>
                <p>
                  Ever wanted to join a club of friends who love playing Euchre and appreciate what's new in tech? Then our Euchre club is perfect for you. 
                  By owning a Heads Up Euchre NFT you’d immediately be part of the community and get access to exclusive Euchre tournaments where you can win ETH.</p>
                <h2>Frequently Asked Questions</h2>
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
                <p><b>I have more questions</b></p>
                <p><small>Join our discord and I can answer any questions you have.</small></p>
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
      <Modal
        isOpen={cardModalIsOpen}
        style={ModalStyle}
      >
          <h2>
            {card && !card.includes("Joker") && convertCard(card.split("/")[2].split(".")[0]) + " of " + card.split("/")[1]}
            {card && card.includes("Royal") && "Royal Joker"}
            {card && card.includes("Zombie") && "Zombie Joker"}
            <Close onClick={() => setCardModalIsOpen(false)}>close</Close>
          </h2>
          <br />
          <img style={{width: "400px", margin: "auto"}} src={card} />  
      </Modal>
    </Main>
  )
}




