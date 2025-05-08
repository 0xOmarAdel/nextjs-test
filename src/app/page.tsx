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
    <main className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
          Latest Posts
        </h1>
        <div className="space-y-6">
          {posts.data.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition-shadow"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-700 text-base">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
