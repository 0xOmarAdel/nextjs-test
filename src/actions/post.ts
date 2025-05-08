"use server";

import { CreatePostSchema } from "@/schemas/post";
import axios from "axios";
import { revalidatePath } from "next/cache";

export const createPost = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
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
