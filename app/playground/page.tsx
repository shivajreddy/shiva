import { Playground } from "@/components/Playground";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "~/playground",
  description: "An interactive terminal playground. Explore, play games, and find easter eggs.",
};

export default function PlaygroundPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-6">
      <Playground />
    </div>
  );
}
