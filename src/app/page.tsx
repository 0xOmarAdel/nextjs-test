import { getPosts } from "@/actions/post";
import Form from "@/components/Form";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="flex flex-col md:grid md:grid-cols-5">
      <div className="order-2 md:col-span-3 md:order-1">
        <main className="min-h-screen bg-gray-100 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8 text-center">
              Latest Posts
            </h1>
            {posts.length > 0 ? (
              <div className="space-y-6">
                {posts.map((post) => (
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
            ) : (
              <div className="text-center text-gray-600 text-lg mt-10">
                No posts found.
              </div>
            )}
          </div>
        </main>
      </div>
      <div className="order-1 md:col-span-2 md:order-2">
        <Form />
      </div>
    </div>
  );
}
