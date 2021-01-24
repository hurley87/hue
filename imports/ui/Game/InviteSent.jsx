import React  from 'react';
import useClipboard from "react-use-clipboard";
import styled from 'styled-components';
import MagicRainbowButton from '../MagicRainbowButton';

const WrappedButton = styled(MagicRainbowButton)`

`;


export const InviteSent = ({ game }) => {
    const [isCopied, setCopied] = useClipboard(game.inviteCode);

    return (
        <div>
            <p>Share this code with a friend</p>
            <input
                type="text"
                placeholder="00000"
                name="code"    
                defaultValue={game.inviteCode}
                style={{ width: "58%"}}
            />
            { document.queryCommandSupported('copy') && <WrappedButton onClick={setCopied}>{isCopied ? "copied!" : "copy"}</WrappedButton> }
            
        </div>

    );
};