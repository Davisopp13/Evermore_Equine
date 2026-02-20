import { getAllContent } from "@/lib/actions/content";
import { AdminEditor } from "./AdminEditor";

export default async function AdminPage() {
  const content = await getAllContent();
  return <AdminEditor initialContent={content} />;
}
