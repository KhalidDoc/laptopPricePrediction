import { Bar } from "react-chartjs-2";

const PriceHistogram = ({ data }) => {
  if (!data) return null;

  const chartData = {
    labels: data.price_dist_labels,
    datasets: [
      {
        label: "Laptop Count",
        data: data.price_dist_values,
        backgroundColor: "rgba(59,130,246,0.6)",
        borderRadius: 6,
      },
    ],
  };

  return (
    <div className="p-6 bg-white dark:bg-white/5 rounded-xl">
      <h3 className="mb-4 font-semibold">Price Distribution</h3>
      <Bar data={chartData} />
    </div>
  );
};

export default PriceHistogram;
