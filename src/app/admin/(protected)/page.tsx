import { getAllContent } from "@/lib/actions/content";
import { AdminEditor } from "./AdminEditor";
import { getPopupSettingsForAdmin } from "@/lib/actions/popup";

export default async function AdminPage() {
  const [content, popup] = await Promise.all([getAllContent(), getPopupSettingsForAdmin()]);
  return <AdminEditor initialContent={content} initialPopup={popup} />;
}
