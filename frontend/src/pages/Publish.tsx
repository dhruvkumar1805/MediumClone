import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader } from "../components/Spinner";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handlePublish() {
    setLoading(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        {
          title,
          content: description,
        },
        {
          headers: {
            Authorization: localStorage.getItem("token"),
          },
        }
      );
      navigate(`/blog/${response.data.id}`);
    } catch (error) {
      console.error("Error publishing post:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-full pt-8">
        <div className="w-full px-8 md:max-w-screen-lg md:w-full">
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Title"
          />

          <ReactQuill
            value={description}
            onChange={(content) => setDescription(content)}
            className="mt-4 bg-white h-[300px]"
            placeholder="Write an article..."
          />

          <button
            onClick={handlePublish}
            type="submit"
            disabled={loading}
            className={`mt-20 md:mt-16 inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800 transition-all duration-200 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Loader /> : "Publish post"}
          </button>
        </div>
      </div>
    </div>
  );
};
