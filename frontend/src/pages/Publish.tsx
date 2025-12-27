import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { BACKEND_URL } from "../config";
import { Loader } from "../components/Spinner";

export const Publish = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const canPublish = title.trim() && content.trim();

  const handlePublish = async () => {
    if (!canPublish || loading) return;

    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      if (!token) return navigate("/signin");

      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      navigate(`/blog/${data.id}`);
    } catch {
      setError("Failed to publish article. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex justify-center px-4 pt-16">
      <div className="w-full max-w-4xl">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          className="w-full text-4xl font-extrabold tracking-tight placeholder:text-slate-400 focus:outline-none mb-6"
        />

        <div className="border rounded-xl overflow-hidden">
          <ReactQuill
            value={content}
            onChange={setContent}
            placeholder="Tell your story…"
            className="bg-white h-[320px]"
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 mt-4 text-center">{error}</p>
        )}

        <div className="flex justify-end mt-8">
          <button
            onClick={handlePublish}
            disabled={!canPublish || loading}
            className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium text-white bg-green-700 hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
          >
            {loading ? <Loader /> : "Publish"}
          </button>
        </div>
      </div>
    </div>
  );
};
