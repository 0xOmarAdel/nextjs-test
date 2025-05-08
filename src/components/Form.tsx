"use client";

import { useActionState } from "react";
import { createPost } from "@/actions/post";

const Form = () => {
  const [errors, formAction, isPending] = useActionState(
    async (prevErrors, formData: FormData) => {
      const payload = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
      };

      const result = await createPost(payload);

      return result;
    },
    []
  );

  console.log("errors", errors);

  return (
    <form action={formAction} className="flex flex-col">
      {errors.length > 0 && <div>{errors.join(", ")}</div>}
      <input type="text" name="title" id="title" placeholder="Title" />
      <input type="text" name="content" id="content" placeholder="Content" />
      <button type="submit" disabled={isPending}>
        Submit
      </button>
    </form>
  );
};

export default Form;
