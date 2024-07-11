import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="border-b flex justify-between px-6 py-4 shadow-sm">
      <div className="flex flex-col justify-center cursor-pointer">
        <Link to={"/blogs"} className="font-medium text-xl">Medium</Link>
      </div>
      <div>
        <Link to={`/publish`}>
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-4 py-2 text-center"
          >
            Write
          </button>
        </Link>
        <Avatar name="Anonymous" size={"big"} />
      </div>
    </div>
  );
};
