import React from 'react';
import { Meteor } from 'meteor/meteor';


export const ViewGame = ({ game }) => {
    const deleteGame = ({ _id }) => Meteor.call('games.remove', _id);

    return (
        <div>
            game up to {game.limit}
            <p>invite code is {game.inviteCode}</p>
            <button onClick={() => deleteGame({ _id: game._id })}>delete</button>
        </div>

    );
};