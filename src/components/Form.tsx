"use client";

import { useActionState } from "react";
import { createPost } from "@/actions/post";

const Form = () => {
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData: FormData) => {
      const payload = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
      };

      await createPost(payload);
    },
    null
  );

  return (
    <form action={formAction}>
      <input type="text" name="title" id="title" placeholder="Title" />
      <input type="text" name="content" id="content" placeholder="Content" />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
};

export default Form;
