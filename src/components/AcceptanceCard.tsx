import { Instagram, Linkedin, Twitter } from "lucide-react";
import islandBg from "@/assets/gwy-island.jpg.asset.json";
import gwyLogo from "@/assets/gwy-logo-clean.png.asset.json";
import hostedBadge from "@/assets/hosted-by-doradao-v2.png.asset.json";

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
  return (
    <div
      ref={innerRef}
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
            width={1440}
            height={322}
            className="mb-[3%] w-[24%]"
            style={{ filter: "drop-shadow(0 4px 12px oklch(0.2 0.05 40 / 0.35))" }}
            crossOrigin="anonymous"
          />
          <img
            src={gwyLogo.url}
            alt="Girls Who Yap Fellowship 2.0"
            width={1474}
            height={354}
            className="w-[82%] max-w-full"
            style={{ filter: "drop-shadow(0 6px 18px oklch(0.2 0.05 40 / 0.45))" }}
            crossOrigin="anonymous"
          />
          <p className="mt-[1.5%] text-center text-[clamp(0.42rem,1.6cqw,0.65rem)] font-medium italic opacity-90">
            On a mission to educate and enable 100,000 girls in AI &amp; internet skills.
          </p>
        </div>

        <div className="flex flex-col items-center text-center">
          <div className="relative">
            {data.avatar ? (
              <img
                src={data.avatar}
                alt=""
                className="aspect-square w-[32cqw] rounded-full object-cover"
                style={{
                  border: "3px solid oklch(0.99 0.02 85 / 0.9)",
                  boxShadow: "0 14px 34px oklch(0.2 0.05 40 / 0.45)",
                }}
              />
            ) : (
              <div
                className="flex aspect-square w-[32cqw] items-center justify-center rounded-full font-display text-[clamp(1.25rem,6cqw,2.2rem)]"
                style={{
                  background: "oklch(0.99 0.02 85 / 0.2)",
                  border: "3px solid oklch(0.99 0.02 85 / 0.9)",
                  backdropFilter: "blur(4px)",
                }}
              >
                {(data.name || "GWY").trim().charAt(0).toUpperCase()}
              </div>
            )}
            <span
              className="absolute -bottom-1 left-1/2 max-w-[92%] -translate-x-1/2 truncate rounded-full px-2.5 py-0.5 text-[clamp(0.38rem,1.4cqw,0.58rem)] font-semibold tracking-[0.12em] uppercase"
              style={{
                background: "oklch(0.99 0.02 85 / 0.95)",
                color: "var(--ink)",
                boxShadow: "var(--shadow-soft)",
              }}
            >
              ★ {data.badge}
            </span>
          </div>

          <p className="mt-[4%] text-[clamp(0.48rem,1.8cqw,0.75rem)] tracking-[0.35em] uppercase opacity-85">
            Officially Accepted
          </p>
          <h2 className="mt-[1.5%] min-w-0 font-display text-[clamp(1.5rem,7.5cqw,3rem)] leading-[1.0] break-words uppercase">
            {data.name || "Your Name"}
          </h2>
          <p
            className="mt-[1.5%] rounded-full px-3.5 py-0.5 text-[clamp(0.55rem,2cqw,0.85rem)] font-semibold"
            style={{ background: "oklch(0.25 0.05 40 / 0.45)" }}
          >
            {data.role || "Builder"}
          </p>
          <p className="mt-[2%] max-w-[88%] font-script text-[clamp(0.75rem,2.6cqw,1.15rem)] leading-snug opacity-95">
            “{data.line || "You weren't just selected. You were chosen."}”
          </p>
        </div>

        <div
          className="flex items-center justify-between gap-2 border-t pt-[2.5%] text-[clamp(0.48rem,1.7cqw,0.72rem)]"
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
  );
}