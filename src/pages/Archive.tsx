import DashboardContent from "../components/DashboardContent";
import { RecommendationsProvider } from "../provider/RecommendationsProvider";

const ArchivePage = () => (
  <RecommendationsProvider isArchive>
    <DashboardContent />
  </RecommendationsProvider>
);

export default ArchivePage;