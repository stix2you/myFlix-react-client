import React from "react";
import { useState } from "react";

export const LoginView = ({ onLoggedIn }) => {   // receive the onLoggedIn prop from the MainView component, which contains
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Button clicked");

        const data = {
            username: username,
            password: password
        };
        console.log("data value", data);

        fetch("https://stix2you-myflix-5cbcd3c20372.herokuapp.com/login/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("login response:", data);
                if (data.user) {
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("token", data.token);
                    onLoggedIn(data.user, data.token);
                } else {
                    alert("No such user");
                }
            })
            .catch((e) => {
                alert("something went wrong ");
            });
    };

    return (
        <div className="login-signup-container">
            <form className="login-signup-detail" onSubmit={handleSubmit}>
                <h1>Login</h1>
                <label>
                    Username:
                    <input id="loginForm"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required />
                </label>
                <label>
                    Password:
                    <input id="loginForm"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </label>
                <button type="submit">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default LoginView;