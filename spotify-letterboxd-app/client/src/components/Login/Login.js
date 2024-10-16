import React from 'react';

const LOGIN_URI = 'http://localhost:8080/auth/login'


function Login() {

    console.log("in Login")
    return (
        <div className="App">
            <header className="App-header">
                <a className="btn-spotify" href={LOGIN_URI} >
                    Login with Spotify 
                </a>
            </header>
        </div>
    );
}

export default Login;