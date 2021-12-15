import React from 'react';
import styled from 'styled-components';
import { About } from './About';
import { Discord } from './Discord';
import { Opensea } from './Opensea';

const NavStyle = styled.nav`
    max-width: 300px;
    margin: auto;
    padding: 50px 0px;
    width: 100%;

    ul {
      display: flex;
      align-items: stretch; /* Default */
      justify-content: space-between;
      width: 100%;
      margin: 0;
      padding: 0;
    }

    ul li {
      display: block;
      flex: 0 1 auto; /* Default */
      list-style-type: none;
      background: #fafafa;
    }

    ul li button{
      margin: 0px;
      background-color: #fbf6f1;
    }

`;


export const HomepageNav = () => {
    return (
        <NavStyle>
            <ul>
                <li><About /></li>
                <li><Opensea /></li>
                <li><Discord /></li>
            </ul>
        </NavStyle>
    )
};