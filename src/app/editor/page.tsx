import { redirect } from "next/navigation";

import { defaultLocale } from "@/i18n/config";

const EditorPage = () => {
  redirect(`/${defaultLocale}/editor`);
};

export default EditorPage;
