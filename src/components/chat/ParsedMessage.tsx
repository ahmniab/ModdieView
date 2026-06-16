import { extractTimestamp } from "@/utils/extractTimestamp";
import { extractUrls } from "@/utils/extractUrls";
import { useMemo } from "react";

export const ParsedMessage = ({ text, onSeek }: { text: string; onSeek: (seconds: number) => void }) => {
  const { timestamps, urls } = useMemo(() => ({
    timestamps: extractTimestamp(text),
    urls: extractUrls(text),
  }), [text]);

  const combined = [
    ...timestamps.map(t => ({ ...t, type: "timestamp" as const })),
    ...urls.map(u => ({ ...u, type: "url" as const })),
  ].sort((a, b) => a.index - b.index);

  if (!combined.length) return text;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;

  combined.forEach((item, index) => {
    if (item.index < lastIndex) return;
    const length =
      item.type === "timestamp"
        ? item.timestamp.length
        : item.url.length;

    const chunk = text.slice(lastIndex, item.index);
    if (chunk) elements.push(chunk);

    if (item.type === "timestamp") {
      elements.push(
        <button
          key={index}
          className="text-purple-400 cursor-pointer"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onSeek(item.seconds);
          }}
        >
          {item.timestamp}
        </button>
      );
    } else {
      const href = item.url.startsWith("http")
        ? item.url
        : "https://" + item.url;

      elements.push(
        <a
          key={item.index}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 underline break-all"
          onMouseDown={(e) => e.stopPropagation()}
        >
          {item.url}
        </a>
      );
    }

    lastIndex = item.index + length;
  });
  elements.push(text.slice(lastIndex));
  return elements;
};