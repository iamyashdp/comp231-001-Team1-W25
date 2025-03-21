import React, { useEffect, useState } from "react";
import './UserPage.css';
import { Link } from "react-router-dom"; 
const API_URL = process.env.REACT_APP_API_URL;

const UserPage = ({ setIsAuthenticated }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState(""); // New state for username
    const [role, setRole] = useState("Student"); // New state for role
    const [user, setUser ] = useState(null);
    const [error, setError] = useState("");
    const [isRegistering, setIsRegistering] = useState(false); // State to toggle between login and register

    console.log("API_URL:", API_URL);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserInfo(token);
        }
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();
            console.log("LOGIN Response Status:", response.status);
            console.log("LOGIN Response Data:", data);
            console.log("LOGIN DATA USER", data.user);
            console.log("LOGIN User:", );
            if (response.ok) {
                localStorage.setItem("token", data.token);
                // localStorage.setItem("userId", data.user._id);
                localStorage.setItem("userId", data.user._id);

                setIsAuthenticated(true);
                fetchUserInfo(data.token);
            } else {
                setError(data.message || "Invalid credentials!");
            }
        } catch (err) {
            setError("Server error. Try again later.");
        }
    };

    const handleDemoLogin = async () => {
        setEmail("van@gmail.com");
        setPassword("qwe123");

        try {
            const response = await fetch(`${API_URL}/api/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: "van@gmail.com", password: "qwe123" }),
            });

            const data = await response.json();
            console.log("Demo Login Response:", data);

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.user._id);
                setIsAuthenticated(true);
                fetchUserInfo(data.token);
            } else {
                setError(data.message || "Demo login failed!");
            }
        } catch (err) {
            setError("Server error. Try again later.");
        }
    };
    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username, email, password, role }),
            });
            const data = await response.json();
            console.log("Response Status:", response.status);
            console.log("Response Data:", data);
            if (response.ok) {
                setIsRegistering(false); // Switch back to login after successful registration
                setError(""); // Clear any previous errors
            } else {
                setError(data.message || "Registration failed!");
            }
        } catch (err) {
            setError("Server error. Try again later.");
        }
    };

    const fetchUserInfo = async (token) => {
        try {
            console.log("Fetching user info with token:", token);
            const response = await fetch(`${API_URL}/api/auth/me`, {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await response.json();
            console.log("Response Status:", response.status);
            console.log("Response Data:", data);
            console.log("User ID: " ,data._id,);
            if (response.ok) {
                setUser (data);
            } else {
                setError("Failed to fetch user data.");
            }
        } catch (err) {
            setError("Error fetching user details.");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser (null);
        setEmail("");
        setPassword("");
        setIsAuthenticated(false);
    };

    return (
        <div className="user-page">
            {user ? (
                <div className="user-info">
                    <h2>Welcome, {user.username}!</h2>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Role:</strong> {user.role}</p>
                    <p><strong>Joined On:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
    
                    {/* Show User Management Button Only for Admin */}
                    {user.role === "Admin" && (
                        <Link to="/user-management">
                            <button style={{ marginBottom: "10px", backgroundColor: "#007bff", color: "white" }}>
                                User Management
                            </button>
                        </Link>
                    )}
    
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <div className="form-container">
                    <h2>{isRegistering ? "Register" : "Login"}</h2>
                    {error && <p className="error">{error}</p>}
                    <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                        {isRegistering && (
                            <>
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="Student">Student</option>
                                    <option value="Professional">Professional</option>
                                    <option value="Admin">Admin</option>
                                </select>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </>
                        )}
                        <input
                            type="email"
                            placeholder=" Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
                    </form>
                    <button onClick={() => setIsRegistering(!isRegistering)}>
                        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
                    </button>
                    <button onClick={handleDemoLogin} style={{ marginTop: "10px", backgroundColor: "#28a745", color: "white" }}>
                        Demo Sign-In
                    </button>
                </div>
            )}
        </div>
    );

}

    export default UserPage;