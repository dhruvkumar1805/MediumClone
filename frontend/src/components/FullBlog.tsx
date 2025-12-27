import { Blog } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const wordCount = blog.content.split(/\s+/).length;
  const readingTime = Math.ceil(wordCount / 200);

  const formattedDate = new Date(blog.createdAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-white">
      <Appbar />

      <div className="flex justify-center px-4 md:px-8">
        <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-10 pt-10 pb-20">
          <article className="lg:col-span-8 col-span-12">
            <header className="mb-8 border-b border-slate-100 pb-8">
              <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                {blog.title}
              </h1>

              <div className="flex items-center text-slate-500 text-sm md:text-base space-x-2">
                <span>Posted on {formattedDate}</span>
                <span>•</span>
                <span>{readingTime} min read</span>
              </div>
            </header>

            <div className="lg:hidden mb-8 p-4 bg-slate-50 rounded-lg">
              <AuthorInfo author={blog.author} />
            </div>

            <div
              className="prose prose-lg prose-slate max-w-none 
                           prose-headings:font-bold prose-headings:text-slate-800 
                           prose-a:text-blue-600 hover:prose-a:text-blue-500"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </article>
          <aside className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-24 pl-4 border-l border-slate-100">
              <div className="text-slate-600 font-medium mb-4 uppercase text-sm tracking-wide">
                About the Author
              </div>
              <AuthorInfo author={blog.author} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

const AuthorInfo = ({ author }: { author: any }) => {
  return (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0">
        <Avatar name={author.name || "Anonymous"} size="big" />
      </div>
      <div>
        <div className="text-xl font-bold text-slate-900">
          {author.name || "Anonymous"}
        </div>
        <p className="text-slate-500 text-sm mt-1 leading-snug">
          {author.bio || "Random catchphrase about the author goes here."}
        </p>
      </div>
    </div>
  );
};
