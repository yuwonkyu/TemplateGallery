import { Container, Panel } from "@components/common";

const HomeLoading = () => {
  return (
    <div className="page-base">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-70" />
        <Container className="relative flex flex-col gap-12 pb-24 pt-20">
          {/* 히어로 헤더 스켈레톤 */}
          <header className="flex flex-col gap-6">
            <div className="h-8 w-48 rounded-full bg-white/10" />
            <div className="h-16 w-full max-w-3xl rounded-2xl bg-white/10" />
            <div className="h-12 w-full max-w-2xl rounded-xl bg-white/10" />
            <div className="flex flex-wrap gap-4">
              <div className="h-12 w-36 rounded-full bg-white/10" />
              <div className="h-12 w-36 rounded-full bg-white/10" />
            </div>
          </header>

          {/* 카드 그리드 스켈레톤 */}
          <section className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <Panel key={`skeleton-card-${index}`}>
                <div className="h-5 w-3/4 rounded-full bg-white/10" />
                <div className="mt-3 space-y-2">
                  <div className="h-3 w-full rounded-full bg-white/10" />
                  <div className="h-3 w-5/6 rounded-full bg-white/10" />
                </div>
              </Panel>
            ))}
          </section>

          {/* 추가 섹션 스켈레톤 */}
          <section className="flex flex-col gap-6">
            <div className="h-8 w-64 rounded-full bg-white/10" />
            <div className="h-4 w-full max-w-xl rounded-full bg-white/10" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={`skeleton-step-${index}`}
                  className="h-4 w-full max-w-md rounded-full bg-white/10"
                />
              ))}
            </div>
          </section>
        </Container>
      </div>
    </div>
  );
};

export default HomeLoading;
