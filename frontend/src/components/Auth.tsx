import { ChangeEvent, FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { SignupInput } from "@dhruvkumar1805/medium-common-module";
import { BACKEND_URL } from "../config";
import { Loader } from "./Spinner";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const navigate = useNavigate();
  const [form, setForm] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange =
    (key: keyof SignupInput) => (e: ChangeEvent<HTMLInputElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type}`,
        form
      );
      localStorage.setItem("token", data);
      navigate("/blogs");
    } catch {
      setError(
        type === "signup" ? "Failed to create account" : "Invalid credentials"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl border shadow-sm p-8">
        <h1 className="text-3xl font-bold text-center">
          {type === "signin" ? "Welcome back" : "Create your account"}
        </h1>

        <p className="text-slate-500 text-center mt-2">
          {type === "signin" ? "New here?" : "Already have an account?"}
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="ml-2 underline font-medium"
          >
            {type === "signin" ? "Sign up" : "Sign in"}
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          {type === "signup" && (
            <Input
              label="Name"
              placeholder="Your full name"
              value={form.name ?? ""}
              onChange={handleChange("name")}
            />
          )}

          <Input
            label="Email"
            placeholder="you@example.com"
            value={form.username}
            onChange={handleChange("username")}
          />

          <Input
            label="Password"
            type="password"
            placeholder="••••••••"
            value={form.password}
            onChange={handleChange("password")}
          />

          {error && <p className="text-sm text-red-600 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white rounded-lg py-2.5 font-medium transition disabled:opacity-50"
          >
            {loading ? <Loader /> : type === "signup" ? "Sign up" : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
};

interface InputProps {
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

const Input = ({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        value={value}
        onChange={onChange}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-gray-900"
        required
      />
    </div>
  );
};
