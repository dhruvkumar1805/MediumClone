import { Link } from "react-router-dom";

interface BlogCardProps {
  id: number;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  publishedDate,
}: BlogCardProps) => {
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.max(1, Math.ceil(words / 200));

  const preview =
    content.length > 170 ? content.slice(0, 170).trim() + "…" : content;

  return (
    <Link
      to={`/blog/${id}`}
      className="group relative block max-w-3xl mx-auto px-7 py-8 rounded-2xl
                 transition-all duration-300
                 hover:-translate-y-[2px] hover:bg-slate-50 hover:shadow-sm
                 after:absolute after:left-8 after:right-8 after:bottom-0
                 after:h-px after:bg-slate-200/60 last:after:hidden"
    >
      <div className="flex items-center gap-3 text-sm text-slate-500 mb-5">
        <Avatar name={authorName} size="small" />
        <span className="font-medium text-slate-700">
          {authorName || "Anonymous"}
        </span>
        <Circle />
        <span className="text-slate-400">{publishedDate}</span>
      </div>

      <h2
        className="text-[1.45rem] md:text-[1.65rem]
                   font-extrabold tracking-tight leading-snug
                   text-slate-900 mb-3
                   group-hover:underline decoration-slate-300 underline-offset-4"
      >
        {title}
      </h2>

      <p className="text-slate-600 text-base leading-relaxed line-clamp-3">
        {stripHtml(preview)}
      </p>

      <div className="mt-6 flex items-center gap-3 text-sm text-slate-400">
        <span>{readingTime} min read</span>
      </div>
    </Link>
  );
};

const stripHtml = (html: string) => html.replace(/<[^>]+>/g, "");

export const Circle = () => (
  <span className="inline-block h-1 w-1 rounded-full bg-slate-400" />
);

export const Avatar = ({
  name,
  size = "small",
}: {
  name: string;
  size?: "small" | "big";
}) => {
  const initial = name?.trim()?.[0]?.toUpperCase() ?? "U";

  return (
    <div
      className={`flex items-center justify-center rounded-full
        bg-gradient-to-br from-slate-700 to-slate-600
        text-white font-medium
        ${size === "small" ? "w-7 h-7 text-xs" : "w-10 h-10 text-sm"}`}
    >
      {initial}
    </div>
  );
};
