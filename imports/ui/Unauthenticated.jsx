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

const Content = styled.div`
    width: 95%;
    max-width: 800px;
    margin: auto;
    margin-top: 100px;

    a {
        color: #2f2c2a;
    }
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
              colors: ['#000'],
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
                    <h1>hue</h1>
                    <p>Challenge a friend to a game of <b>h</b>eads <b>u</b>p <b>e</b>uchre</p>
                </Headline>
                {
                    showLogin ? <LoginForm setLoading={setLoading} /> : <SignupForm setLoading={setLoading} />
                }
                <Switch onClick={() => setShowLogin(!showLogin)}>
                    {showLogin ? "Need an account?" : "Already have an account?"}
                </Switch>
                <Content>
                    <p>Welcome! 👋</p>
                    <p>My parents taught my brother and me how to play Euchre when we were young. I have fond memories of the four of us playing. They taught us unwritten rules like “don’t trump your partner’s ace” and “kill as you go”. Since then, I’ve always been on the lookout for a game.</p>
                    <p>I moved home shortly after university to learn how to code and while I was there, my Mom and I invented a two person Euchre game, one that we still play, years later. It's called Hue. It's almost the same as the 4-person version with these differences,</p>
                    <ol>
                        <li>Each player is dealt 11 cards as follows. The first 5 cards are hand held and remain hidden from the opponent. Next, each player is dealt a row of three cards, face down, with another row of three cards on top, facing up.</li>
                        <br/>
                        <li>You get one trick for each exchange you win. That’s 11 possible tricks you can win each hand. Points are calculated as the difference between the higher score and lower score. If I won 8 tricks and you won 3, I would get 5 points in that hand. That’s if I made it trump. If you made it trump I’d get 10 points. You double the amount of points on a Euchre. </li>
                        <br/>
                        <li>We added a Joker. This card can beat any other card and when it’s led the opposing player must play their highest card. </li>
                        <br/>
                        <li>Out of convenience we used an old cribbage board to keep score. One player wins when they get 120 points.</li>
                    </ol>
                    <p>What we ended up creating was a version we actually enjoyed more than the original. It’s slightly more complex and certainly more intimate. The combination makes for a more addictive experience. Before I left home I tried to build an online version of the game but didn’t get very far. I just didn’t have the skills to create a one-on-one real-time online.</p>
                    <p>However, years later, I did have the skills and finally found the time to build it. I finished the first version just in time for Christmas but it was buggy and the user experience made it hard to play. Mom and I did end up playing a few games online but quickly went back to playing in person. It may always be a game that is more fun when played offline. The cards typically become background noise when I’m playing a game of Hue with her. </p>
                    <p>Fast forward another couple of years and I haven’t been able to play a game with my Mom since the pandemic started. This is my latest attempt at bringing Heads Up Euchre online in a way that creates a similar experience to the one played in real life. </p>
                    <p>Enjoy!</p>
                    <br/>
                    <br/>
                    <p style={{textAlign: 'center'}}>Created by <a href="https://www.davidhurley.ca/">David Hurley</a></p>
                </Content>
            </div>
        )
};