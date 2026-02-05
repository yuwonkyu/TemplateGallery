import { Container, Panel } from "@components/common";

const TemplatesLoading = () => {
  return (
    <div className="page-base">
      <Container className="flex flex-col gap-6 pb-24 pt-16">
        <div className="h-4 w-40 rounded-full bg-white/10" />
        <div className="h-10 w-80 rounded-full bg-white/10" />
        <div className="h-4 w-72 rounded-full bg-white/10" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <Panel key={`skeleton-${index}`}>
              <div className="h-36 rounded-xl bg-white/10" />
              <div className="mt-5 space-y-3">
                <div className="h-4 w-2/3 rounded-full bg-white/10" />
                <div className="h-3 w-full rounded-full bg-white/10" />
                <div className="h-3 w-4/5 rounded-full bg-white/10" />
              </div>
            </Panel>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default TemplatesLoading;
