import { redirect } from "next/navigation";

export default function ImgPage({
  searchParams,
}: {
  searchParams: { content?: string };
}) {
  if (!searchParams.content) {
    redirect("/");
  }

  redirect(decodeURIComponent(searchParams.content));
}
