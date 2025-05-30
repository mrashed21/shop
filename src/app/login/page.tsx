"use client";

// import { signIn } from "next-auth";
import { useState } from "react";
import { useDispatch } from "react-redux";
// import { setUser } from "../lib/features/user/userSlice";
import { Button } from "@/components/ui/button";
import { setUser } from "@/redux/slice/userSlice";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.ok) {
      // Fetch session to get user data
      const sessionResponse = await fetch("/api/auth/session");
      const session = await sessionResponse.json();

      // Store user data in RTK
      dispatch(
        setUser({
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        })
      );

      // Send user data to backend
      try {
        await axios.post("http://your-backend-api/user", {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name,
        });
      } catch (error) {
        console.error("Error sending user data to backend:", error);
      }

      router.push("/dashboard");
    } else {
      alert("Login failed");
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <Button
        variant="outline"
        onClick={() => {
          signIn("google");
        }}
      >
        Contineu With Google
      </Button>
    </div>
  );
}
