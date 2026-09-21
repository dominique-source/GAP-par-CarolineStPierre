import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PersonalGapDashboard } from "@/components/gap/PersonalGapDashboard";
import { gapDataProvider } from "@/data/gap-data-provider";

export function generateStaticParams() {
  return gapDataProvider.getDoctors().map((doctor) => ({ slug: doctor.slug }));
}

export async function generateMetadata(props: PageProps<"/medecins/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const doctor = gapDataProvider.getDoctorBySlug(slug);
  return { title: doctor ? `Mon GAP · ${doctor.nom}` : "Médecin introuvable" };
}

export default async function MedecinPage(props: PageProps<"/medecins/[slug]">) {
  const { slug } = await props.params;
  const doctor = gapDataProvider.getDoctorBySlug(slug);
  if (!doctor) notFound();

  const collectif = gapDataProvider.getCollectif();
  return <PersonalGapDashboard doctor={doctor} collectif={collectif} />;
}
