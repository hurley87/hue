import React, { useState } from 'react';
import { JoinGame } from './JoinGame';
import { NewGame } from './NewGame';
import styled from 'styled-components';
import SwitchStyle from './Styles/SwitchStyle';
import { Loading } from './Loading';

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
        font-size: 26px;
    }

    button {
        float: right;
        color: #141414;
        padding: 5px 10px;
        border: 2px solid #e8e2dc;
        text-decoration: none;
        border-radius: 3px;
        font-family: 'Montserrat', sans-serif;
        display: block;
        background-color: transparent;
        cursor: pointer;
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
        font-family: 'Montserrat', sans-serif;
        text-align: center;

    }
    input {
        padding: 15px 10px;
        font-size: 14px;
        color: #333333;
        border: 0px none #000;
        border-radius: 2px;
        background: #ffffff;
        font-family: 'Montserrat', sans-serif;
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
        background-color: #020202;
        font-family: 'Montserrat', sans-serif;
        flex: 1;
        padding: 15px 0px;
        font-size: 14px;
        z-index: 14;
        margin: 5px;
        width: 30%;
    }
`;

const Switch = styled.div`${SwitchStyle}`;


export const NoGame = ({ user }) => {
    const [showNewGame, setShowNewGame] = useState(false);
    const logout = () => Meteor.logout();
    const [loading, setLoading] = useState(false);

    return loading ? <Loading /> : (
        <div>
            <Nav>
                <p>{user.username}</p>
                <button className='btn' onClick={logout}>logout</button>
            </Nav>
            <Main>
                {
                    showNewGame ? <NewGame setLoading={setLoading} /> : <JoinGame setLoading={setLoading} />
                }
            </Main>
            <Switch onClick={() => setShowNewGame(!showNewGame)}>{showNewGame ? "Have a code?" : "Create your own game"}</Switch>
        </div>
    );
};