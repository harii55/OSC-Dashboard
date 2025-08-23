import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function Login({ signInWithGithub }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  return (
    <div className="App">
      <h1>Hello, please sign in!</h1>
      <button onClick={signInWithGithub}>Sign In with GitHub</button>
    </div>
  );
}

export default Login;
