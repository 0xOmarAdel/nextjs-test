"use client";

import { useActionState } from "react";
import { createPost } from "@/actions/post";

const Form = () => {
  const [errors, formAction, isPending] = useActionState(
    async (_prevErrors: string[], formData: FormData) => {
      const payload = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
      };

      const result = await createPost(payload);
      return result;
    },
    []
  );

  return (
    <form
      action={formAction}
      className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Create a New Post</h2>

      {errors.length > 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded">
          {errors.map((error, idx) => (
            <p key={idx}>{error}</p>
          ))}
        </div>
      )}

      <div className="flex flex-col">
        <label htmlFor="title" className="mb-1 font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          name="title"
          id="title"
          placeholder="Post title"
          className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength={1}
          maxLength={100}
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="content" className="mb-1 font-medium text-gray-700">
          Content
        </label>
        <textarea
          name="content"
          id="content"
          placeholder="Write your content here..."
          rows={5}
          className="border border-gray-300 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          minLength={1}
          maxLength={100}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className={`w-full py-2 px-4 font-semibold text-white rounded ${
          isPending
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        } transition-colors`}
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default Form;
