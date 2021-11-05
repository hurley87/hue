import React, {useState} from 'react';
import styled from 'styled-components';
import TransparantBtnStyle from '../Styles/TransparantBtnStyle';
import Modal from 'react-modal';

Modal.setAppElement('#react-target')

const Rules = styled.button`
    ${TransparantBtnStyle}
`;

const Close = styled.button`
    ${TransparantBtnStyle}
`;

const Results = styled.div`
    position: absolute;
    bottom: 10px;
    width: 95%;
    margin: auto;

    b {
        background-color:#2f2c2a;
        color: white;
        padding: 2px 4px;
        border-radius: 3px;
        margin-right: 3px;

    }
}
`;

const customStyles = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    width: '95%',
    maxWidth: '600px',
    margin: 'auto',
  },
  overlay: {
      zIndex: 2
  }
};

export const BottomResults = ({ player, game, renderSuit }) => {
    const [modalIsOpen,setIsOpen] = useState(false);
    return (
        <Results>
            <h5>
                {player.username} {game.dealer === player.id ? <b>Dealer</b>  : null} 
                {game.maker === player.id && game.trump !== "" ? (<span>{renderSuit(game.trump)}</span>) : null}
                <span><b>{player.score} / {game.limit}</b> {" "} Tricks: {player.trick}</span>
                <Rules onClick={() => setIsOpen(true)}>rules</Rules>
            </h5>

            <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            >
                <h2>Rules <Close onClick={() => setIsOpen(false)}>close</Close></h2>
                <br />
                <div>
                    <ol>
                        <li>Each player is dealt 11 cards. The first 5 cards are hand held and remain hidden from the opponent. Next, each player is dealt a row of three cards, face down, with another row of three cards on top, facing up.</li>
                        <br />
                        <li>You get one trick for each exchange you win. That’s 11 possible tricks you can win each hand. Points are calculated as the difference between the higher score and lower score. If I won 8 tricks and you won 3, I would get 5 points in that hand. That’s if I made it trump. If you made it trump I’d get 10 points. You double the amount of points on a Euchre. </li>
                        <br />
                        <li>The Joker can beat any other card and when it’s led the opposing player must play their highest card. </li>
                    </ol>
                </div>
            </Modal>
        </Results>
    );
};