import { useState } from "react";
import { useNavigate } from "react-router-dom";

import logo from "../assets/school_logo.png";

import Button from "../components/common/Button";
import InputField from "../components/common/InputField";

import { login } from "../services/api";

import "../styles/Login.css";

function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: "",
        password: "",
    });

    const [error, setError] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));

        if (error) {
            setError("");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        setError("");

        if (!formData.username.trim()) {
            setError("Username is required.");
            return;
        }

        if (!formData.password.trim()) {
            setError("Password is required.");
            return;
        }

        try {
            await login(formData);

            navigate("/dashboard");
        } catch (err) {
            if (err?.message === "Invalid username or password.") {
                setError("Incorrect username or password.");
            } else {
                setError(
                    err?.message ||
                    err?.errors?.message ||
                    "An expected error occurred. Please try again."
                );
            }
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <img
                            src={logo}
                            alt="School Logo"
                            className="school-logo"
                        />

                        <h1 className="system-title">
                            Student Information System
                        </h1>

                        <p className="system-subtitle">
                            Manage. Organize. Empower.
                        </p>
                    </div>

                    <div className="error-container">
                        {error ? (
                            <div
                                className="alert alert-danger py-1 px-3 m-0 text-center small w-100"
                                role="alert"
                            >
                                {error}
                            </div>
                        ) : (
                            <div className="error-placeholder"></div>
                        )}
                    </div>

                    <form
                        onSubmit={handleLogin}
                        autoComplete="on"
                    >
                        <div className="form-fields">
                            <InputField
                                label="Username"
                                type="text"
                                name="username"
                                value={formData.username}
                                placeholder="Enter your username"
                                onChange={handleChange}
                                autoComplete="username"
                                icon="bi-person-fill"
                            />

                            <InputField
                                label="Password"
                                type="password"
                                name="password"
                                value={formData.password}
                                placeholder="Enter your password"
                                onChange={handleChange}
                                autoComplete="current-password"
                                icon="bi-lock-fill"
                            />
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            className="login-btn"
                            fullWidth
                        >
                            Login
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;