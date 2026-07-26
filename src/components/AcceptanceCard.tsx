import { useRef, useState } from "react";
import { Instagram, Linkedin, Twitter, Download, Loader2 } from "lucide-react";
import html2canvas from "html2canvas";
import islandBg from "@/assets/gwy-island.jpg.asset.json";
import gwyLogo from "@/assets/gwy-logo-hd.png.asset.json";
import hostedBadge from "@/assets/hosted-by-doradao.png.asset.json";

export type CardData = {
  name: string;
  role: string;
  line: string;
  avatar: string | null;
  badge: string;
};

export function AcceptanceCard({
  data,
  innerRef,
}: {
  data: CardData;
  innerRef?: React.Ref<HTMLDivElement>;
}) {
  const localRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!localRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(localRef.current, {
        useCORS: true,
        scale: 3,
        backgroundColor: null,
      });
      const link = document.createElement("a");
      link.download = `${(data.name || "acceptance-card").trim().replace(/\s+/g, "-").toLowerCase()}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    } catch (err) {
      console.error("Failed to download card:", err);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        ref={(node) => {
          localRef.current = node;
          if (typeof innerRef === "function") innerRef(node);
          else if (innerRef && "current" in innerRef) (innerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        }}
        data-export-card="true"
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[28px] shadow-[var(--shadow-luxe)]"
        style={{ backgroundColor: "var(--sand)" }}
      >
        <img
          src={islandBg.url}
          alt=""
          width={1280}
          height={720}
          className="absolute inset-0 h-full w-full object-cover object-[50%_58%]"
          crossOrigin="anonymous"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, oklch(0.35 0.08 45 / 0.35) 0%, oklch(0.4 0.06 45 / 0.05) 30%, oklch(0.35 0.06 220 / 0.35) 70%, oklch(0.25 0.06 230 / 0.7) 100%)",
          }}
        />

        <div className="absolute inset-0 flex flex-col justify-between p-[6%] text-primary-foreground">
          <div className="flex flex-col items-center">
            <img
              src={hostedBadge.url}
              alt="Hosted by DoraDAO"
              width={900}
              height={198}
              className="mb-[3.5%] w-[38%]"
              style={{ filter: "drop-shadow(0 4px 12px oklch(0.2 0.05 40 / 0.35))" }}
              crossOrigin="anonymous"
            />
            <img
              src={gwyLogo.url}
              alt="Girls Who Yap Fellowship 2.0"
              width={2641}
              height={619}
              className="w-[84%] max-w-full"
              style={{ filter: "drop-shadow(0 6px 18px oklch(0.2 0.05 40 / 0.45))" }}
              crossOrigin="anonymous"
            />
            <p className="mt-[2%] text-center text-[clamp(0.45rem,1.7cqw,0.68rem)] font-medium italic opacity-90">
              On a mission to educate and enable 100,000 girls in AI &amp; internet skills.
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="relative">
              {data.avatar ? (
                <img
                  src={data.avatar}
                  alt=""
                  className="aspect-square w-[38cqw] rounded-full object-cover"
                  style={{
                    border: "4px solid oklch(0.99 0.02 85 / 0.9)",
                    boxShadow: "0 18px 40px oklch(0.2 0.05 40 / 0.45)",
                  }}
                  crossOrigin="anonymous"
                />
              ) : (
                <div
                  className="flex aspect-square w-[38cqw] items-center justify-center rounded-full font-display text-[clamp(1.5rem,7cqw,2.6rem)]"
                  style={{
                    background: "oklch(0.99 0.02 85 / 0.2)",
                    border: "4px solid oklch(0.99 0.02 85 / 0.9)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  {(data.name || "GWY").trim().charAt(0).toUpperCase()}
                </div>
              )}
              <span
                className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full px-3 py-1 text-[clamp(0.42rem,1.6cqw,0.65rem)] font-semibold tracking-[0.14em] whitespace-nowrap uppercase"
                style={{
                  background: "oklch(0.99 0.02 85 / 0.95)",
                  color: "var(--ink)",
                  boxShadow: "var(--shadow-soft)",
                }}
              >
                ★ {data.badge}
              </span>
            </div>

            <p className="mt-[6%] text-[clamp(0.5rem,1.9cqw,0.78rem)] tracking-[0.35em] uppercase opacity-85">
              Officially Accepted
            </p>
            <h2 className="mt-1 font-display text-[clamp(1.6rem,8cqw,3.2rem)] leading-[0.95] uppercase">
              {data.name || "Your Name"}
            </h2>
            <p
              className="mt-2 rounded-full px-4 py-1 text-[clamp(0.6rem,2.2cqw,0.9rem)] font-semibold"
              style={{ background: "oklch(0.25 0.05 40 / 0.45)" }}
            >
              {data.role || "Builder"}
            </p>
            <p className="mt-[3%] max-w-[85%] font-script text-[clamp(0.8rem,2.8cqw,1.2rem)] leading-snug opacity-95">
              “{data.line || "You weren't just selected. You were chosen."}”
            </p>
          </div>

          <div
            className="flex items-center justify-between gap-2 border-t pt-[3%] text-[clamp(0.5rem,1.8cqw,0.75rem)]"
            style={{ borderColor: "oklch(0.99 0.02 85 / 0.28)" }}
          >
            <span className="font-semibold tracking-[0.08em]">www.doradao.xyz</span>
            <span className="flex items-center gap-[3%]">
              <span className="font-semibold tracking-[0.04em]">@connectdoradao</span>
              <span className="flex items-center gap-[0.4em]">
                <Twitter className="size-[1.25em]" strokeWidth={1.75} />
                <Instagram className="size-[1.25em]" strokeWidth={1.75} />
                <Linkedin className="size-[1.25em]" strokeWidth={1.75} />
              </span>
            </span>
          </div>
        </div>
      </div>

      <button
        onClick={handleDownload}
        disabled={downloading}
        className="flex items-center gap-2 rounded-full bg-[var(--ink,#1a1a1a)] px-6 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
      >
        {downloading ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Preparing...
          </>
        ) : (
          <>
            <Download className="size-4" />
            Download Card
          </>
        )}
      </button>
    </div>
  );
}
