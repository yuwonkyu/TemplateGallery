import { getTranslations } from "next-intl/server";

import type { Locale } from "@/i18n/config";
import templatesData from "@/shared/constants/templates.json";
import { Container, Pill } from "@components/common";

import { TemplatesGallery } from "./TemplatesGallery";

type PageProps = {
  params: Promise<{
    locale: Locale;
  }>;
};

type TemplateItem = {
  id: string;
  titleKey: string;
  summaryKey: string;
  tagKeys: string[];
  updatedAt: string;
  popularity: number;
};

const TemplatesPage = async ({ params }: PageProps) => {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "templates" });
  const common = await getTranslations({ locale, namespace: "common" });

  const templates = (templatesData as TemplateItem[]).map((template) => ({
    id: template.id,
    title: t(`catalog.${template.titleKey}`),
    summary: t(`catalog.${template.summaryKey}`),
    tags: template.tagKeys.map((tagKey) => t(`tags.${tagKey}`)),
    updatedAt: template.updatedAt,
    popularity: template.popularity,
  }));

  const filterAllLabel = t("filters.all");
  const filterOptions = [t("tags.developer")];

  const sortOptions = [
    { value: "latest", label: t("sort.options.latest") },
    { value: "popular", label: t("sort.options.popular") },
    { value: "title", label: t("sort.options.title") },
  ] as const;

  return (
    <main className="page-base">
      <Container className="flex flex-col gap-10 pb-24 pt-16">
        <header className="flex flex-col gap-4">
          <Pill>{t("label")}</Pill>
          <h1 className="text-3xl font-semibold sm:text-4xl">{t("title")}</h1>
          <p className="max-w-2xl text-sm text-muted">{t("description")}</p>
        </header>

        <TemplatesGallery
          locale={locale}
          templates={templates}
          filterAllLabel={filterAllLabel}
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          sortLabel={t("sort.label")}
          searchLabel={t("search.label")}
          searchPlaceholder={t("search.placeholder")}
          emptyLabel={t("empty")}
          previewLabel={common("preview.label")}
          openEditorLabel={common("cta.openEditor")}
        />
      </Container>
    </main>
  );
};

export default TemplatesPage;
