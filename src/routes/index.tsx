import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CONTRACTHUB · PT Pelindo Cirebon" },
      { name: "description", content: "Sistem manajemen kontrak PT Pelindo Cirebon — preview tampilan XAMPP." },
      { property: "og:title", content: "CONTRACTHUB · PT Pelindo Cirebon" },
      { property: "og:description", content: "Kontrak tertib. Pelabuhan bergerak." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <iframe
      src="/contracthub/index.html"
      title="CONTRACTHUB preview"
      className="fixed inset-0 h-screen w-screen border-0"
    />
  );
}
