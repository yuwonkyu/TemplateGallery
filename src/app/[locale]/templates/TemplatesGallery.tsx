"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";

import { Button, ButtonLink, Panel } from "@components/common";

type TemplateCard = {
  id: string;
  title: string;
  summary: string;
  tags: string[];
  previewImage?: string;
  updatedAt: string;
  popularity: number;
};

type SortOption = {
  value: "latest" | "popular" | "title";
  label: string;
};

type TemplatesGalleryProps = {
  locale: string;
  templates: TemplateCard[];
  filterAllLabel: string;
  filterOptions: string[];
  sortOptions: ReadonlyArray<SortOption>;
  sortLabel: string;
  searchLabel: string;
  searchPlaceholder: string;
  emptyLabel: string;
  previewLabel: string;
  openEditorLabel: string;
};

const INITIAL_PAGE_SIZE = 6;
const PAGE_SIZE = 6;

// 이미지 확대 모달 컴포넌트
const ImageModal = ({
  isOpen,
  imageUrl,
  onClose,
}: {
  isOpen: boolean;
  imageUrl: string;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div
        className="relative h-[90vh] w-[90vw]"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={imageUrl}
          alt="Preview"
          fill
          className="object-contain rounded-lg"
          quality={95}
        />
        <button
          onClick={onClose}
          className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition text-white cursor-pointer"
          aria-label="Close modal"
        >
          <Image
            src="/icon/cancel.svg"
            alt=""
            width={18}
            height={18}
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  );
};

export const TemplatesGallery = ({
  locale,
  templates,
  filterAllLabel,
  filterOptions,
  sortOptions,
  sortLabel,
  searchLabel,
  searchPlaceholder,
  emptyLabel,
  previewLabel,
  openEditorLabel,
}: TemplatesGalleryProps) => {
  const [activeFilter, setActiveFilter] = useState(filterAllLabel);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortValue, setSortValue] = useState<SortOption["value"]>(
    sortOptions[0]?.value ?? "latest",
  );
  const [visibleCount, setVisibleCount] = useState(INITIAL_PAGE_SIZE);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  // 모달이 열렸을 때 body 스크롤 방지
  useEffect(() => {
    if (modalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [modalOpen]);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredTemplates = useMemo(() => {
    const byFilter =
      activeFilter === filterAllLabel
        ? templates
        : templates.filter((template) =>
            template.tags.some((tag) => tag === activeFilter),
          );

    const bySearch = normalizedQuery
      ? byFilter.filter((template) => {
          const haystack = [
            template.title,
            template.summary,
            template.tags.join(" "),
          ]
            .join(" ")
            .toLowerCase();
          return haystack.includes(normalizedQuery);
        })
      : byFilter;

    const sorted = [...bySearch].sort((left, right) => {
      if (sortValue === "popular") {
        return right.popularity - left.popularity;
      }

      if (sortValue === "title") {
        return left.title.localeCompare(right.title, locale);
      }

      return (
        new Date(right.updatedAt).getTime() - new Date(left.updatedAt).getTime()
      );
    });

    return sorted;
  }, [
    activeFilter,
    filterAllLabel,
    locale,
    normalizedQuery,
    sortValue,
    templates,
  ]);

  const visibleTemplates = filteredTemplates.slice(0, visibleCount);
  const hasMore = visibleCount < filteredTemplates.length;

  useEffect(() => {
    setVisibleCount(INITIAL_PAGE_SIZE);
  }, [activeFilter, normalizedQuery, sortValue]);

  useEffect(() => {
    if (!hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((count) => count + PAGE_SIZE);
        }
      },
      { rootMargin: "120px" },
    );

    const sentinel = sentinelRef.current;
    if (sentinel) {
      observer.observe(sentinel);
    }

    return () => {
      if (sentinel) {
        observer.unobserve(sentinel);
      }
      observer.disconnect();
    };
  }, [hasMore]);

  return (
    <section className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <Button
          key={filterAllLabel}
          variant={activeFilter === filterAllLabel ? "primary" : "ghost"}
          size="sm"
          type="button"
          onClick={() => setActiveFilter(filterAllLabel)}
          className="cursor-pointer"
        >
          {filterAllLabel}
        </Button>
        {filterOptions.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "primary" : "ghost"}
            size="sm"
            type="button"
            onClick={() => setActiveFilter(filter)}
            className="cursor-pointer"
          >
            {filter}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex min-w-55 flex-1 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2">
          <span className="text-xs text-muted">{searchLabel}</span>
          <input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-sm text-white placeholder:text-muted focus:outline-none"
          />
        </div>
        <label className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs text-muted">
          <span>{sortLabel}</span>
          <select
            value={sortValue}
            onChange={(event) =>
              setSortValue(event.target.value as SortOption["value"])
            }
            className="cursor-pointer bg-gray-900 text-xs text-white focus:outline-none rounded px-2 py-1"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {filteredTemplates.length === 0 ? (
        <Panel className="text-center text-sm text-muted">{emptyLabel}</Panel>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleTemplates.map((template) => (
            <Panel
              key={template.id}
              className="transition hover:-translate-y-1"
            >
              <div className="group relative flex h-36 items-center justify-center rounded-xl bg-white/5 overflow-hidden cursor-pointer">
                {template.previewImage ? (
                  <>
                    <Image
                      src={template.previewImage}
                      alt={template.title}
                      width={400}
                      height={144}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                    <button
                      onClick={() => handleImageClick(template.previewImage!)}
                      className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                      aria-label="Expand preview"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                        <Image
                          src="/icon/magnifier.svg"
                          alt=""
                          width={16}
                          height={16}
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                      </div>
                    </button>
                  </>
                ) : (
                  <span className="text-sm text-muted">{previewLabel}</span>
                )}
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <h2 className="text-lg font-semibold">{template.title}</h2>
                <p className="text-sm text-muted">{template.summary}</p>
                <div className="flex flex-wrap gap-2">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-white/10 px-3 py-1 text-[11px] text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <ButtonLink
                  href={`/${locale}/editor?template=${template.id}`}
                  size="sm"
                  className="mt-4 w-fit"
                >
                  {openEditorLabel}
                </ButtonLink>
              </div>
            </Panel>
          ))}
        </div>
      )}

      {hasMore ? <div ref={sentinelRef} className="h-10" /> : null}

      <ImageModal
        isOpen={modalOpen}
        imageUrl={selectedImage}
        onClose={handleCloseModal}
      />
    </section>
  );
};
