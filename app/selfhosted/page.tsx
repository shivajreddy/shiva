import { SelfhostedCard } from "@/components/SelfhostedCard";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "~/selfhosted",
  description: "Apps I self-host on my own infrastructure.",
};

const mediaApps = [
  {
    name: "Audiobookshelf",
    description:
      "Audiobook and podcast server with progress tracking across devices.",
    url: "https://abs.shiva.computer",
    local: "http://192.168.5.156:13378",
    status: "online" as const,
  },
  {
    name: "Kavita",
    description:
      "Book, comic, and manga server with a built-in web reader. Supports EPUB, PDF, CBZ, CBR.",
    url: "https://books.shiva.computer",
    local: "http://192.168.5.156:5000",
    status: "online" as const,
  },
  {
    name: "Jellyfin",
    description:
      "Open-source media server. No accounts, no tracking, free hardware transcoding via VAAPI.",
    url: "https://caseflix.shiva.computer",
    local: "http://192.168.5.156:8096",
    status: "online" as const,
  },
  {
    name: "Plex",
    description:
      "Media streaming server for movies, TV shows, and music with hardware transcoding.",
    url: "https://plex.shiva.computer",
    local: "http://192.168.4.100:32400/web",
    status: "wip" as const,
  },
  {
    name: "Overseerr",
    description:
      "Media request management. Users can request movies and TV shows, integrates with Plex.",
    url: "https://requests.shiva.computer",
    local: "http://192.168.4.100:5055",
    status: "wip" as const,
  },
  {
    name: "Tautulli",
    description:
      "Plex monitoring and statistics. Tracks watch history and server usage analytics.",
    local: "http://192.168.4.100:8181",
    status: "wip" as const,
  },
];

const automationApps = [
  {
    name: "Home Assistant",
    description:
      "Smart home automation hub with 2000+ integrations. Controls lights, sensors, and everything in between.",
    url: "https://ha.shiva.computer",
    local: "http://192.168.4.100:8123",
    status: "wip" as const,
  },
  {
    name: "Node-RED",
    description:
      "Visual flow-based automation builder for IoT and home automation workflows.",
    local: "http://192.168.4.100:1880",
    status: "wip" as const,
  },
];

const infraApps = [
  {
    name: "Nextcloud",
    description:
      "Private cloud storage and file sync. Docs, calendars, contacts — all self-hosted.",
    url: "https://cloud.shiva.computer",
    local: "http://192.168.5.156:8080",
    status: "wip" as const,
  },
  {
    name: "Pi-hole",
    description:
      "Network-wide DNS ad blocker. Upstream DNS via Cloudflare with DNSSEC enabled.",
    local: "http://192.168.4.101/admin",
    status: "wip" as const,
  },
  {
    name: "Uptime Kuma",
    description:
      "Service monitoring dashboard. Tracks uptime and health of all selfhosted services.",
    url: "https://monitor.shiva.computer",
    local: "http://192.168.4.101:3001",
    status: "wip" as const,
  },
  {
    name: "Portainer",
    description:
      "Docker management UI. Visual container management, resource monitoring, and log viewing.",
    url: "https://portainer.shiva.computer",
    local: "https://192.168.4.100:9443",
    status: "wip" as const,
  },
  {
    name: "Homepage",
    description:
      "Unified dashboard for all services. Central portal with live Docker status integration.",
    url: "https://home.shiva.computer",
    local: "http://192.168.5.156:3847",
    status: "wip" as const,
  },
  {
    name: "Vaultwarden",
    description:
      "Self-hosted Bitwarden-compatible password manager. All credentials, zero cloud.",
    url: "https://vault.shiva.computer",
    local: "http://192.168.4.100:8090",
    status: "wip" as const,
  },
  {
    name: "Duplicati",
    description:
      "Automated encrypted backups. AES-256 encryption, scheduled daily to DAS and Backblaze B2.",
    local: "http://192.168.4.100:8200",
    status: "wip" as const,
  },
  {
    name: "Nginx Proxy Manager",
    description:
      "Reverse proxy with automatic SSL. Routes subdomain traffic to backend services.",
    local: "http://192.168.4.100:81",
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
          Apps running on my own hardware across 3 hosts &mdash; a Beelink
          SER3, a Raspberry Pi, and a workstation. Tunneled to the internet via
          Cloudflare, no ports forwarded.
        </p>
      </div>

      {/* Media & Entertainment */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-muted mb-3 uppercase tracking-wider">
          <span className="text-accent mr-2">#</span>
          Media &amp; Entertainment
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {mediaApps.map((app) => (
            <SelfhostedCard key={app.name} {...app} />
          ))}
        </div>
      </section>

      {/* Automation */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-muted mb-3 uppercase tracking-wider">
          <span className="text-accent mr-2">#</span>
          Automation
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {automationApps.map((app) => (
            <SelfhostedCard key={app.name} {...app} />
          ))}
        </div>
      </section>

      {/* Infrastructure */}
      <section className="mb-10">
        <h2 className="text-sm font-semibold text-muted mb-3 uppercase tracking-wider">
          <span className="text-accent mr-2">#</span>
          Infrastructure &amp; Management
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {infraApps.map((app) => (
            <SelfhostedCard key={app.name} {...app} />
          ))}
        </div>
      </section>
    </div>
  );
}
