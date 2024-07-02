import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';

export async function getStaticPaths() {
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    params: {
      id: filename.replace(/\.md$/, ""),
    },
  }));
  return {
    paths,
    fallback: false,
  };
}

export default function ArticlePage({ params }) {
  const markdown = fs.readFileSync(`posts/${params.id}.md`).toString();
  const { data, content } = matter(markdown);

  return (
    <main className="mx-10">
      <h1 className="flex justify-center text-5xl p-5">{data.title}</h1>
      <p className="flex justify-end text-gray-600">{format(data.date, "yyyy/MM/dd")}</p>
      <ReactMarkdown className="markdown">{content}</ReactMarkdown>
    </main>
  );
}
