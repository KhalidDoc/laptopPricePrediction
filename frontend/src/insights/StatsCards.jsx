const StatsCards = ({ stats }) => {
  if (!stats) return null;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
      <div className="p-5 rounded-xl bg-white dark:bg-white/5 border dark:border-white/10">
        <p className="text-sm text-slate-500">Total Laptops</p>
        <h2 className="text-2xl font-bold">{stats.total_laptops}</h2>
      </div>

      <div className="p-5 rounded-xl bg-white dark:bg-white/5 border dark:border-white/10">
        <p className="text-sm text-slate-500">Average Price</p>
        <h2 className="text-2xl font-bold">
          ₹ {stats.avg_price.toLocaleString()}
        </h2>
      </div>
    </div>
  );
};

export default StatsCards;
