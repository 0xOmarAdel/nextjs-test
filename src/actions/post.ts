"use server";

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
    await axios({
      method: "POST",
      url: "http://161.97.126.23:3001/api/posts",
      data: { title, content },
    });

    revalidatePath("/");

    return null;
  } catch (error) {
    console.log("error", error);
    return "Error creating post";
  }
};
