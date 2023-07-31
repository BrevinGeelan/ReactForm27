import React, {useState} from "react"


export default function SignUpForm ({ setToken }) {
    //State variables for form
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    //State variables for validation
    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);

    //SpecialCharacters
    const SpecialCharacters = /[!@#$%^&*()_+[\]{};':"\\|,.<>?]/;

    async function handleSubmit(event) {
        event.preventDefault();

        //Reset Errors
        setUsernameError(null);
        setPasswordError(null);

        //Validation requirements

        if (username.length <6) {
            setUsernameError("Username must be at least 6 characters.");
            return;
        }

        if (password.length <6) {
            setPasswordError("Password must be at least 6 characters.")
            return;
        }
        if (!SpecialCharacters.test(password)) {
            setPasswordError("Password must contain at least 1 special character.")
            return;
        }

        try {
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password}),
            });
            const result = await response.json();
            setToken(result.token);
            console.log(result);
        } catch (error) {
            setError(error.message);
        }
    }
    return (
        <>
        <h2>Sign Up!</h2>
        {error && <p className="fail">{error}</p>}
        <form onSubmit={handleSubmit}>
            <label>
                Username:{""} 
                <input value={username} onChange={(e) => setUsername(e.target.value)} />
            </label>
            {usernameError && <p className="fail">{usernameError}</p>}
            <label>
                Password:{""}
                 <input value={password} onChange={(e) => setPassword(e.target.value)} />
            </label>
            {passwordError && <p className="fail">{passwordError}</p>}
            <button>Submit</button>
        </form>
        </>
    );
}