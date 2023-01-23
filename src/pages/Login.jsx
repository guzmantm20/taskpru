import React from "react";
import { useState } from "react";
import { client } from "../dbconnect/client";

function Login() {
  const [email, setEmail] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await client.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: "https://example.com/welcome",
        },
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="youremailsite.com"
          onChange={(e) => setEmail(e.target.value)}
        />
        <button>Send</button>
      </form>
    </div>
  );
}

export default Login;
