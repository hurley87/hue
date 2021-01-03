import React, { useState } from 'react';
import { SignupForm } from './SignupForm';
import { LoginForm } from './LoginForm';

export const Unauthenticated = () => {
    const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
            {
                showLogin ? <LoginForm /> : <SignupForm />
            }
            <button onClick={() => setShowLogin(!showLogin)}>{showLogin ? "Need an account?" : "Already have an account?"}</button>
        </div>
    );
};