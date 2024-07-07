import { NextPage } from 'next';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
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
        <ReactMarkdown 
          className="markdown" 
          components={{
            code(props) {
              const {children, className, node} = props
              const match = /language-(\w+)/.exec(className || '')
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={dark}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className={className}>
                  {children}
                </code>
              )
            }
          }}
        >
          {content}
        </ReactMarkdown>
        <div className="h-[100px]">
        </div>
      </div>
    </main>
  );
};

export default  PostPage;
