import { Meteor } from 'meteor/meteor';
import React, {useState} from 'react';
import { providers } from "ethers";
import WalletLink from "walletlink";
import Web3Modal from "web3modal";
import { useTracker } from 'meteor/react-meteor-data';
import { Loading } from './Loading';
import { NoGame } from './NoGame';
import { Game } from './Game';
import { GamesCollection } from "../db/GamesCollection";
import styled from 'styled-components';

const Headline = styled.div`
    margin: auto;
    width: 95%;
    max-width: 1000px;
    text-align: center;

    h1 {
        font-size: 80px;
        line-height: 96px;
        font-family: "Domine";
        color: #292827;
        margin-top: 60px;
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

const ConnectButton = styled.button`
  color: white;
  border: 0;
  line-height: inherit;
  text-decoration: none;
  cursor: pointer;
  border-radius: 3px;
  background-color: #B366FF;
  font-family: 'Montserrat', sans-serif;
  flex: 1;
  padding: 10px 0px;
  font-size: 14px;
  z-index: 14;
  margin: 5px;
  width: 30%;
  max-width: 100px;
  margin: auto;
  display: block;
`;

// address of creature collection now - should update to NFTs Opensea collection id
const collectionAddress = "0xc92ceddfb8dd984a89fb494c376f9a48b999aafc";

// https://github.com/Web3Modal/web3modal - has to be a better way to do this
const INFURA_ID = "d8fe044a671e41e6b3697f1167a3a5be";
const providerOptions = {
  "custom-walletlink": {
    display: {
      logo: "https://play-lh.googleusercontent.com/PjoJoG27miSglVBXoXrxBSLveV6e3EeBPpNY55aiUUBM9Q1RCETKCOqdOkX2ZydqVf0",
      name: "Coinbase",
      description: "Connect to Coinbase Wallet",
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


export default Main = styled.div`
    width: 95%;
    margin: auto;
`;

export const App = () => {
  const [address, setAddress] = useState(null);
  const [assets, setAssets] = useState(null);
  const { user, game, isLoading } = useTracker(() => {
    const noDataAvailable = { game: null, isLoading: true };
    const handler = Meteor.subscribe('games', address);

    if (!handler.ready()) {
      return { ...noDataAvailable };
    }
    const game = GamesCollection.find().fetch()[0];
    const user = Meteor.user();

    return { user, game, isLoading: false };
  });

  async function connect() {
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
            if (err) console.log(err)
        });
      }
  });


    fetch(`https://api.opensea.io/api/v1/assets?owner=${address}&limit=20`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        const assetIds = response.assets.map((asset) => asset.id);
        setAssets(assetIds);
      })
      .catch((err) => console.error(err));

    setAddress(address);
    setUsername(username);
  }

  return (
    <Main>
      {
        isLoading ? <Loading /> : user ? (
          <div>
            {
              game ? <Game game={game} /> : <NoGame user={user} />
            }
          </div>
        ) : (
          <div>
              <Headline>
                  <h1>Hue</h1>
                  <p>Challenge a friend to a game of <b>h</b>eads <b>u</b>p <b>e</b>uchre</p>
              </Headline>
              <ConnectButton onClick={() => connect()}>Connect</ConnectButton>
          </div>
      )
      }
    </Main>
  )
}




