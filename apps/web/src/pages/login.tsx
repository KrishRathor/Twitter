import React from "react";
import { LoginForm } from "ui";

const Login: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '15vh'
        }} >
            <LoginForm title="Log In" onSubmit={() => console.log('first')} />
        </div>
    )
}

export default Login;