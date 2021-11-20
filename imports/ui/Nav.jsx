import React from 'react';
import styled from 'styled-components';
import TransparantBtnStyle from './Styles/TransparantBtnStyle';
import { Rules } from './Rules';
import { About } from './About';
import { Discord } from './Discord';

const NavStyle = styled.div`
    width: 95%;
    margin: auto;
    padding: 10px;
    clear: both;
    margin-bottom: 100px;

    img {
        height: 40px;   
        width: auto;
        border-radius: 40px;
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
    const logout = () => Meteor.logout();

    return (
        <NavStyle>
            <p> {user.profile ? <img src={user.profile.avatar} /> : "gm, "}  {user.username.includes(".eth") ? user.username : user.username.slice(0, 2) + "..." + user.username.slice(-4)}</p>
            <button onClick={logout}>logout</button>
            <Rules />
            <About />
            <Discord />
        </NavStyle>
    )
};