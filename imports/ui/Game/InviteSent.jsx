import React  from 'react';
import useClipboard from "react-use-clipboard";
import styled from 'styled-components';

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
            { document.queryCommandSupported('copy') && <button onClick={setCopied}>{isCopied ? "copied!" : "copy"}</button> }
            
        </div>

    );
};