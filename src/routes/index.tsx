import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { CardStudio } from "@/components/CardStudio";

const TITLE = "GWY Acceptance Studio — Girls Who Yap Fellowship 2.0";
const DESC =
  "Generate your personalized Girls Who Yap Fellowship 2.0 acceptance card. You weren't just selected. You were chosen.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="min-h-screen bg-background">
      <Toaster position="top-center" />

      <section id="studio" className="mx-auto max-w-6xl px-6 pt-16 pb-28">
        <div className="animate-rise mb-12 max-w-2xl">
          <h1 className="font-display text-[clamp(2rem,6vw,3.4rem)] leading-none uppercase">
            The Acceptance Studio
          </h1>
          <p className="mt-4 text-muted-foreground">
            Make it yours in seconds — then post it everywhere. You weren't just selected. You were
            chosen.
          </p>
        </div>
        <CardStudio />
      </section>

      <footer className="border-t border-border py-10 text-center text-xs tracking-[0.25em] uppercase text-muted-foreground">
        Girls Who Yap · doradao.xyz
      </footer>
    </main>
  );
}
