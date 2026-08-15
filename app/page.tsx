import { content } from "@/data";
import PageClient from "./PageClient";

export default function Page() {
  return <PageClient initial={content} />;
}
