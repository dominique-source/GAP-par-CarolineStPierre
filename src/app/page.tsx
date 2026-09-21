import { GroupGapDashboard } from "@/components/gap/GroupGapDashboard";
import { gapDataProvider } from "@/data/gap-data-provider";

export default function Home() {
  const doctors = gapDataProvider.getDoctors();
  const collectif = gapDataProvider.getCollectif();

  return <GroupGapDashboard collectif={collectif} doctors={doctors} />;
}
