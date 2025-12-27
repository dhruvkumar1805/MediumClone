import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Avatar } from "./BlogCard";
import { BACKEND_URL } from "../config";

export const Appbar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      .get(`${BACKEND_URL}/api/v1/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      })
      .then((res) => setUserName(res.data.name))
      .catch(() => {});

    return () => controller.abort();
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    navigate("/signin");
  }, [navigate]);

  return (
    <header className="border-b flex justify-between px-4 py-4">
      <Link to="/blogs" className="text-2xl font-semibold tracking-tight">
        OpenDraft
      </Link>

      <div className="flex items-center gap-4">
        <Link
          to="/publish"
          className="text-white bg-green-700 hover:bg-green-800 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2"
        >
          Write
        </Link>

        <Avatar name={userName || "U"} size="big" />

        <button
          onClick={handleLogout}
          className="hover:bg-gray-300 transition-all duration-200 p-1.5 rounded-full"
        >
          <svg
            width="25"
            height="25"
            viewBox="0 0 512 512"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
              fill="none"
              stroke="#6B6B6B"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
            />
          </svg>
        </button>
      </div>
    </header>
  );
};
