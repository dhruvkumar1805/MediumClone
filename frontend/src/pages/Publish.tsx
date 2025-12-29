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
        { headers: { Authorization: `Bearer ${token}` } }
      );

      navigate(`/blog/${data.id}`);
    } catch {
      setError("Failed to publish article. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex justify-center px-4 pt-16">
      <div className="w-full max-w-3xl">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 px-8 py-10">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="w-full text-[2.6rem] font-extrabold leading-tight tracking-tight
                       placeholder:text-slate-300 focus:outline-none mb-8"
          />

          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <ReactQuill
              value={content}
              onChange={setContent}
              placeholder="Tell your story…"
              className="h-[360px]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 mt-6 text-center">{error}</p>
          )}
        </div>

        <div className="sticky bottom-6 mt-10 flex justify-end">
          <div className="bg-white border border-slate-200 shadow-md rounded-full px-2 py-2">
            <button
              onClick={handlePublish}
              disabled={!canPublish || loading}
              className="inline-flex items-center justify-center gap-2
                         px-6 py-2.5 rounded-full text-sm font-medium
                         text-white bg-green-700 hover:bg-green-800
                         transition disabled:opacity-50 disabled:cursor-not-allowed
                         min-w-[130px]"
            >
              {loading ? <Loader /> : "Publish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
