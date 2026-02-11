import { Container, Panel } from "@components/common";

const EditorLoading = () => {
  return (
    <div className="page-base">
      <Container className="flex flex-col gap-6 pb-16 pt-12">
        {/* 헤더 스켈레톤 */}
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div className="flex-1">
            <div className="h-8 w-32 rounded-full bg-white/10" />
            <div className="mt-2 h-10 w-80 rounded-full bg-white/10" />
            <div className="mt-3 h-4 w-96 rounded-full bg-white/10" />
          </div>
          <div className="flex gap-3">
            <div className="h-9 w-20 rounded-full bg-white/10" />
            <div className="h-9 w-28 rounded-full bg-white/10" />
          </div>
        </header>

        {/* 2컬럼 레이아웃 스켈레톤 */}
        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* 왼쪽: 섹션 리스트 */}
          <Panel className="rounded-3xl">
            <div className="h-6 w-32 rounded-full bg-white/10" />
            <div className="mt-2 h-4 w-full rounded-full bg-white/10" />
            <div className="mt-6 space-y-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={`skeleton-section-${index}`}
                  className="rounded-2xl border border-white/10 bg-white/5 p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-4 w-24 rounded-full bg-white/10" />
                    <div className="h-3 w-10 rounded-full bg-white/10" />
                  </div>
                  <div className="mt-3 h-2 w-full rounded-full bg-white/10" />
                </div>
              ))}
            </div>
          </Panel>

          {/* 오른쪽: 프리뷰 */}
          <Panel className="rounded-3xl">
            <div className="h-6 w-28 rounded-full bg-white/10" />
            <div className="mt-2 h-4 w-40 rounded-full bg-white/10" />
            <div className="mt-6 space-y-6">
              <div className="h-32 w-full rounded-2xl bg-white/10" />
              <div className="space-y-3">
                <div className="h-8 w-3/4 rounded-full bg-white/10" />
                <div className="h-5 w-full rounded-full bg-white/10" />
                <div className="h-5 w-5/6 rounded-full bg-white/10" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="h-24 rounded-xl bg-white/10" />
                <div className="h-24 rounded-xl bg-white/10" />
              </div>
            </div>
          </Panel>
        </section>
      </Container>
    </div>
  );
};

export default EditorLoading;
