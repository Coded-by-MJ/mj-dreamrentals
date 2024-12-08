import StatsCard from "./StatsCard";
import { fetchReservationStats } from "@/utils/actions";
import { formatCurrencyWithSuffix } from "@/utils/format";

async function ReservationsStats() {
  const stats = await fetchReservationStats();
  return (
    <div className="mt-8 grid md:grid-cols-2 gap-4 lg:grid-cols-3">
      <StatsCard title="properties" value={stats.properties} />
      <StatsCard title="nights" value={stats.nights} />
      <StatsCard
        title="amount"
        value={formatCurrencyWithSuffix(stats.amount)}
      />
    </div>
  );
}
export default ReservationsStats;
