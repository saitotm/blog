import { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';
import { format } from 'date-fns';
import fs from 'fs';
import matter from 'gray-matter';

type PostProps = {
  params: {
    id: string;
  }
};

export const generateStaticParams = async () => {
  const files = fs.readdirSync("posts");
  const paths = files.map((filename) => ({
    id: filename.replace(/\.md$/, ""),
  }));

  return paths;
};

const PostPage : NextPage<PostProps> = ({ params }) => {
  const markdown = fs.readFileSync(`posts/${params.id}.md`).toString();
  const { data, content } = matter(markdown);

  return (
    <main className="flex flex-col justify-center items-center ">
      <div className="mx-10 max-w-[800px]">
        <h1 className="flex justify-center text-5xl p-5">{data.title}</h1>
        <p className="flex justify-end text-gray-600">{format(data.date, "yyyy/MM/dd")}</p>
        <ReactMarkdown className="markdown">{content}</ReactMarkdown>
        <div className="h-[100px]">
        </div>
      </div>
    </main>
  );
};

export default  PostPage;
