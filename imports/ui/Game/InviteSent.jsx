import React  from 'react';
import useClipboard from "react-use-clipboard";

export const InviteSent = ({ game }) => {
    const [isCopied, setCopied] = useClipboard(game.inviteCode);

    return (
        <div>
            <p>Share this invite code with a friend.</p>
            <input
                type="text"
                placeholder="00000"
                name="code"    
                defaultValue={game.inviteCode}
                style={{ width: "58%"}}
            />
            <button onClick={setCopied}>{isCopied ? "copied!" : "copy"}</button>
        </div>

    );
};