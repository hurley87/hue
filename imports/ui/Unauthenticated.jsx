import React, { useState, useEffect } from 'react';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';
import SwitchStyle from './Styles/SwitchStyle';
import styled from 'styled-components';
import { Loading } from './Loading';
import ConfettiGenerator from "canvas-confetti";

const Headline = styled.div`
    margin: auto;
    width: 95%;
    max-width: 1000px;
    text-align: center;

    h1 {
        font-size: 80px;
        line-height: 96px;
        font-family: "Domine";
        margin-bottom: 30px;
        color: #292827;
        margin-top: 0px;
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
const Canvas = styled.canvas`
    height: 100px;    
`;


var duration = 2 * 1000;
var animationEnd = Date.now() + duration;
var skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}


export const Unauthenticated = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (function frame() {
            var timeLeft = animationEnd - Date.now();
            var ticks = Math.max(200, 500 * (timeLeft / duration));
            skew = Math.max(0.8, skew - 0.001);
          
            new ConfettiGenerator({
              target: 'my-canvas',
              particleCount: 1,
              startVelocity: 0,
              ticks: ticks,
              gravity: 0.5,
              origin: {
                x: Math.random(),
                y: (Math.random() * skew) - 0.2
              },
              colors: ['#1A0033'],
              shapes: ['circle'],
              scalar: randomInRange(0.4, 1)
            });
          
            if (timeLeft > 0) {
              requestAnimationFrame(frame);
            }
        }());
    }, []);

    return loading ? <Loading />
        : (
            <div>
                <Canvas id="my-canvas"></Canvas>
                <Headline>
                    <h1>Hue</h1>
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