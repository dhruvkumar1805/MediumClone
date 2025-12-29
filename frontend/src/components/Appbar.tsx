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
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link
          to="/blogs"
          className="text-xl font-extrabold tracking-tight text-slate-900 hover:opacity-90 transition"
        >
          OpenDraft
        </Link>

        <div className="flex items-center gap-3">
          <Link
            to="/publish"
            className="hidden sm:inline-flex items-center rounded-full
                       bg-green-700 px-4 py-2 text-sm font-medium text-white
                       hover:bg-green-800 transition"
          >
            Write
          </Link>

          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <Avatar name={userName || "U"} size="big" />

            <button
              onClick={handleLogout}
              className="rounded-full p-2 hover:bg-slate-100 transition"
              aria-label="Logout"
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M304 336v40a40 40 0 01-40 40H104a40 40 0 01-40-40V136a40 40 0 0140-40h152c22.09 0 48 17.91 48 40v40M368 336l80-80-80-80M176 256h256"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="32"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
