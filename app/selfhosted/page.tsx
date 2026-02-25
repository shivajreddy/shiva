import { SelfhostedCard } from "@/components/SelfhostedCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "~/selfhosted",
  description: "Apps I self-host on my own infrastructure.",
};

const apps = [
  {
    name: "Audiobookshelf",
    description:
      "Self-hosted audiobook and podcast server. Streams my entire library with progress tracking across devices.",
    url: "https://abs.shiva.computer",
    status: "online" as const,
  },
  {
    name: "Jellyfin",
    description:
      "Free software media system for streaming movies, shows, and music. No subscriptions, no tracking.",
    status: "wip" as const,
  },
];

export default function SelfhostedPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">
          <span className="text-accent mr-2">$</span>
          ls ~/selfhosted
        </h1>
        <p className="text-muted text-sm">
          Apps I run on my own hardware. No clouds, no subscriptions.
        </p>
      </div>

      {apps.length === 0 ? (
        <div className="text-center py-16 text-muted">
          <p className="text-sm">
            <span className="text-accent">$</span> ls ~/selfhosted
          </p>
          <p className="text-sm mt-2">No apps yet. Check back soon.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {apps.map((app) => (
            <SelfhostedCard key={app.name} {...app} />
          ))}
        </div>
      )}
    </div>
  );
}
