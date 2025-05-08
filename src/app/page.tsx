import axios from "axios";

type Post = {
  id: string;
  title: string;
  content: string;
};

export default async function Home() {
  const posts: { data: Post[] } = await axios({
    method: "GET",
    url: "http://161.97.126.23:3001/api/posts",
  });

  return (
    <div>
      {posts.data.map((post) => (
        <div key={post.id}>
          <h1 className="text-xl font-bold">{post.title}</h1>
          <p className="text-lg">{post.content}</p>
        </div>
      ))}
    </div>
  );
}
