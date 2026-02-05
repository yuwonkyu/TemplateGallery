import { redirect } from "next/navigation";

import { defaultLocale } from "@/i18n/config";

const TemplatesPage = () => {
  redirect(`/${defaultLocale}/templates`);
};

export default TemplatesPage;
