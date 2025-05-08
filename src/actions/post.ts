"use server";

import { CreatePostSchema } from "@/schemas/post";
import axios from "axios";
import { revalidatePath } from "next/cache";

type Post = {
  id: string;
  title: string;
  content: string;
};

export const getPosts = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "http://161.97.126.23:3001/api/posts",
    });

    return data as Post[];
  } catch (error) {
    console.log("error", error);
    return [];
  }
};

export const createPost = async ({ title, content }: Omit<Post, "id">) => {
  try {
    const validationResult = CreatePostSchema.safeParse({ title, content });

    if (!validationResult.success) {
      const fieldErrors = validationResult.error.flatten().fieldErrors;

      return Object.values(fieldErrors).flat();
    }

    await axios({
      method: "POST",
      url: "http://161.97.126.23:3001/api/posts",
      data: { title, content },
    });

    revalidatePath("/");

    return [];
  } catch (error) {
    console.log("error", error);
    return ["Error creating post"];
  }
};
