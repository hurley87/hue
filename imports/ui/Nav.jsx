import React from 'react';
import styled from 'styled-components';
import TransparantBtnStyle from './Styles/TransparantBtnStyle';
import { About } from './About';
import formatUsername from '../lib/formatUsername';
import { CardModal } from './CardModal';

const NavStyle = styled.div`
    width: 95%;
    margin: auto;
    padding: 10px;
    clear: both;
    margin-bottom: 100px;
    background-color: #fbf6f1;

    img {
        height: 40px;   
        width: auto;
        border-radius: 5px;
        float: left;
        margin-right: 5px;
    }

    p {
        font-family: "Domine";
        float: left;
        font-weight: 700;
        margin: 0px;
        font-size: 16px;
        line-height: 40px;
    }

    button {
        ${TransparantBtnStyle}
    }
`;


export const Nav = ({ user }) => {
    return (
        <NavStyle>
            <p> {user.profile && <CardModal cardImg={user.profile.avatar} />}  {formatUsername(user.username)}</p>
            <button onClick={() => Meteor.logout()}>logout</button>
            <About />
            <button onClick={() => window.open("https://opensea.io/collection/headsupeuchre", "_blank")}>opensea</button>
            <button onClick={() => window.open("https://discord.gg/rfpqYcmHPu", "_blank")}>discord</button>
        </NavStyle>
    )
};