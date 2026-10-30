import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { generateMetadata as buildMeta } from "@/lib/seo";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SlotPage from "@/components/slot-page/SlotPage";
import { SLOTS } from "@/lib/slots";

export function generateStaticParams() {
  return SLOTS.map((s) => ({ slug: s.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const s = SLOTS.find((x) => x.id === slug);
  if (!s) return {};
  return buildMeta({
    title: `${s.name}: ${s.title}`,
    description: `${s.monthly}. ${s.tooltip}`,
    path: `/slots/${s.id}`,
    noindex: false,
  });
}

export default async function SlotRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!SLOTS.some((x) => x.id === slug)) notFound();
  return (
    <main className="bai relative overflow-x-clip">
      <Navigation />
      <SlotPage id={slug} />
      <Footer />
    </main>
  );
}
