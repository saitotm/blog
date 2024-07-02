import fs from "fs";
import matter from "gray-matter";

import { PostCard } from "@/components/PostCard";

type Post = {
  frontMatter: {
    title: string,
    date: Date,
    description: string,
  },
  id: string,
};

export default function Home() {
  const files = fs.readdirSync("posts");
  const posts = files.map((filename) => {
    const id = filename.replace(/\.md$/, "");
    const markdown = fs.readFileSync(`posts/${filename}`).toString();
    const { data } = matter(markdown);

    return {
      frontMatter: data,
      id,
    }
  }) as Post[];
  posts.reverse();
  posts.sort((a, b) => b.frontMatter.date.getTime() - a.frontMatter.date.getTime());

  return (
    <main>
      <div className="p-10">
        <h1 className="flex justify-center text-4xl">記事一覧</h1>
        {posts.map((post) => <PostCard key={post.id} {...post}/>)}
      </div>
    </main>
  );
}
