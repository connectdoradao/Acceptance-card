import { useMemo, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { Check, Copy, Download, Upload, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { AcceptanceCard, type CardData } from "./AcceptanceCard";

const ROLES = [
  "Founder",
  "Builder",
  "Creator",
  "Vibecoder",
  "Designer",
  "Community Manager",
  "Product Manager",
];

const BADGES = ["Top 10%", "Top 5%", "Wave 1 Fellow", "Island Original"];

export function CardStudio() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("Builder");
  const [line, setLine] = useState("");
  const [badge, setBadge] = useState(BADGES[0]);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const exportCardRef = useRef<HTMLDivElement>(null);

  const data: CardData = { name, role, line, avatar, badge };

  const captions = useMemo(() => {
    const who = name || "I";
    return {
      LinkedIn: `Some doors don't open — they choose you.\n\nI've been accepted into the Girls Who Yap Fellowship 2.0 by DoraDAO as a ${role}, joining 3,000+ women across 18+ countries on a mission to educate and enable 100,000 girls in AI & internet skills.\n\n${line || "Grateful, focused, and ready to build."}\n\n${badge}\n#GirlsWhoYap #DoraDAO #GWYIsland`,
      Twitter: `I didn't just apply. I got chosen. 🌅\n\nAccepted into Girls Who Yap Fellowship 2.0 as a ${role}. ${badge}.\n\nChaos starts on GWY Island.\n#GirlsWhoYap #DoraDAO`,
      Instagram: `chosen. 🏝️✨\n\n${who} — Girls Who Yap Fellowship 2.0 · ${role} · ${badge}\n${line || "on a mission with 3,000+ women across 18+ countries."}\n\n#girlswhoyap #doradao #gwyisland #fellowship`,
    } as Record<string, string>;
  }, [name, role, line, badge]);

  const onUpload = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatar(String(reader.result));
    reader.readAsDataURL(file);
  };

  const waitForExportAssets = async (node: HTMLElement) => {
    await document.fonts?.ready;
    const images = Array.from(node.querySelectorAll("img"));
    await Promise.all(
      images.map(
        (image) =>
          new Promise<void>((resolve) => {
            if (image.complete && image.naturalWidth > 0) {
              resolve();
              return;
            }

            image.onload = () => resolve();
            image.onerror = () => resolve();
          }),
      ),
    );
  };

  const download = async () => {
    const node = exportCardRef.current ?? cardRef.current;
    if (!node) return;
    try {
      await waitForExportAssets(node);
      const cssWidth = node.getBoundingClientRect().width || 460;
      const pixelRatio = Math.min(6, Math.max(3, 2400 / cssWidth));
      const url = await toPng(node, {
        pixelRatio,
        cacheBust: true,
        includeQueryParams: true,
        backgroundColor: "transparent",
        skipAutoScale: true,
      });
      const a = document.createElement("a");
      a.href = url;
      a.download = `gwy-acceptance-${(name || "card").trim().toLowerCase().replace(/\s+/g, "-")}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast.success("Your acceptance card is downloading ✨");
    } catch {
      toast.error("Couldn't export the card. Try again.");
    }
  };

  const copy = async (key: string) => {
    await navigator.clipboard.writeText(captions[key]);
    setCopied(key);
    toast.success(`${key} caption copied`);
    setTimeout(() => setCopied(null), 1800);
  };

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_minmax(320px,460px)] lg:items-start">
      <div className="space-y-7">
        <div>
          <label className="mb-2 block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Your name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Amara Okonkwo"
            className="w-full rounded-2xl border border-border bg-card px-5 py-4 text-lg outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Role / identity
          </label>
          <div className="mb-3 flex flex-wrap gap-2">
            {ROLES.map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRole(r)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition hover:-translate-y-0.5 ${
                  role === r
                    ? "bg-primary text-primary-foreground shadow-[var(--shadow-soft)]"
                    : "border border-border bg-card text-foreground"
                }`}
              >
                {r}
              </button>
            ))}
          </div>
          <input
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Or write your own"
            className="w-full rounded-2xl border border-border bg-card px-5 py-3 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Your line <span className="opacity-60">(optional)</span>
          </label>
          <textarea
            value={line}
            onChange={(e) => setLine(e.target.value.slice(0, 120))}
            rows={2}
            placeholder="Building for the girls who were never handed the mic."
            className="w-full resize-none rounded-2xl border border-border bg-card px-5 py-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/15"
          />
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Badge
            </label>
            <div className="flex flex-wrap gap-2">
              {BADGES.map((b) => (
                <button
                  key={b}
                  type="button"
                  onClick={() => setBadge(b)}
                  className={`rounded-full px-3.5 py-2 text-xs font-semibold tracking-wide transition ${
                    badge === b
                      ? "bg-ink text-primary-foreground"
                      : "border border-border bg-card text-muted-foreground"
                  }`}
                >
                  {b}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="mb-2 block text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
              Avatar <span className="opacity-60">(optional)</span>
            </label>
            <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-5 py-4 text-sm text-muted-foreground transition hover:border-primary hover:text-foreground">
              <Upload className="h-4 w-4" />
              {avatar ? "Change photo" : "Upload a photo"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onUpload(e.target.files?.[0])}
              />
            </label>
          </div>
        </div>

        <button
          type="button"
          onClick={download}
          className="group flex w-full items-center justify-center gap-3 rounded-full px-8 py-5 font-display text-lg tracking-wide uppercase text-primary-foreground transition hover:-translate-y-0.5"
          style={{ background: "var(--gradient-sunset)", boxShadow: "var(--shadow-luxe)" }}
        >
          <Download className="h-5 w-5 transition group-hover:translate-y-0.5" />
          Download your card
        </button>

        <div className="space-y-3">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
            Share captions
          </p>
          {Object.keys(captions).map((k) => (
            <div key={k} className="rounded-2xl border border-border bg-card p-4">
              <div className="mb-2 flex items-center justify-between">
                <span className="font-display text-sm tracking-widest uppercase">{k}</span>
                <button
                  type="button"
                  onClick={() => copy(k)}
                  className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold text-secondary-foreground transition hover:opacity-80"
                >
                  {copied === k ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  {copied === k ? "Copied" : "Copy"}
                </button>
              </div>
              <p className="text-sm leading-relaxed whitespace-pre-line text-muted-foreground">
                {captions[k]}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-10">
        <p className="mb-3 flex items-center gap-2 text-xs font-semibold tracking-[0.2em] uppercase text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" /> Live preview
        </p>
        <div style={{ containerType: "inline-size" }}>
          <AcceptanceCard data={data} innerRef={cardRef} />
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none fixed top-0 -left-[12000px] w-[460px]"
        style={{ containerType: "inline-size" }}
      >
        <AcceptanceCard data={data} innerRef={exportCardRef} />
      </div>
    </div>
  );
}