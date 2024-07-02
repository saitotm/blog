import { format } from "date-fns";
import Link from "next/link";

export function PostCard({ frontMatter, id } : { frontMatter: { title: string, date: Date, description: string }, id: string }) {
  return (
    <Link href={`/posts/${id}`} className="p-4">
      <h2 className="text-2xl font-bold">{frontMatter.title}</h2>
      <p className="text-sm text-gray-600">{format(frontMatter.date, "yyyy/MM/dd")}</p>
      <p className="text-sm text-gray-600">{frontMatter.description}</p>
    </Link>
  );
}
