import React, { useState } from 'react';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';
import SwitchStyle from './Styles/SwitchStyle';
import styled from 'styled-components';
import { Loading } from './Loading';

const Headline = styled.div`
    margin: auto;
    max-width: 1000px;
    text-align: center;

    h1 {
        font-size: 80px;
        line-height: 96px;
        font-family: "Domine";
        margin-bottom: 30px;
        color: #292827;
    }

    p {
        color: #2f2c2a;
        font-size: 28px;
        line-height: 150%;
        font-family: 'Montserrat', sans-serif;

        @media (max-width: 800px) {
            font-size: 24px;
        }

        b {
            background: #2f2c2a;
            color: #fff;
        }
    }
`;

const Switch = styled.div`${SwitchStyle}`;

export const Unauthenticated = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    return loading ? <Loading />
        : (
            <div>
                <Headline>
                    <h1>hue</h1>
                    <p>Challenge a friend to a game of <b>h</b>eads <b>u</b>p <b>e</b>uchre</p>
                </Headline>
                {
                    showLogin ? <LoginForm setLoading={setLoading} /> : <SignupForm setLoading={setLoading} />
                }
                <Switch onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ? "Need an account?" : "Already have an account?"}
                </Switch>
            </div>
        )
};