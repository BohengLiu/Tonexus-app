import GraphViewer from "@/components/GraphViewer";
import Header from "./Header";

export default function WalletDetailPage({
  params,
}: {
  params: { address: string };
}) {
  console.log(params);
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <GraphViewer id={params.address} />
    </div>
  );
}
