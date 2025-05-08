"use server";

import axios from "axios";

export const createPost = async ({
  title,
  content,
}: {
  title: string;
  content: string;
}) => {
  const post = await axios({
    method: "POST",
    url: "http://161.97.126.23:3001/api/posts",
    data: { title, content },
  });

  return null;
};
