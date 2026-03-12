import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Landing = () => {
  return (
    <div
      className="
      min-h-screen
      bg-linear-to-br
      from-slate-100 via-white to-slate-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      text-slate-900 dark:text-white
      transition-colors duration-500
      overflow-hidden"
    >
      {/* HERO SECTION */}

      <section className="max-w-7xl mx-auto px-6 py-28 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT HERO */}

        <div className="space-y-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="
            text-5xl lg:text-6xl font-bold leading-tight
            bg-linear-to-r
            from-blue-600 via-cyan-500 to-indigo-600
            dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400
            bg-clip-text text-transparent"
          >
            AI Powered Laptop Price Prediction
          </motion.h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl">
            Predict laptop prices using machine learning and explore market
            insights with interactive analytics dashboards.
          </p>

          <div className="flex gap-5">
            <Link
              to="/dashboard"
              className="
              px-7 py-3 rounded-xl
              bg-blue-600 text-white
              hover:bg-blue-700
              dark:bg-blue-500 dark:hover:bg-blue-600
              shadow-lg hover:shadow-blue-500/40
              transition"
            >
              Start Prediction
            </Link>

            <Link
              to="/insights"
              className="
              px-7 py-3 rounded-xl
              border border-slate-300 dark:border-white/10
              hover:bg-slate-100 dark:hover:bg-white/10
              transition"
            >
              Explore Insights
            </Link>
          </div>
        </div>

        {/* RIGHT DASHBOARD PREVIEW */}

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <DashboardPreview />
        </motion.div>
      </section>

      {/* FEATURES */}

      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="mb-16">
          <h2 className="text-3xl font-bold">
            Built for Intelligent Market Analysis
          </h2>

          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-xl">
            Our system combines machine learning with data analytics to provide
            powerful insights into laptop market pricing.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <FeatureCard
            title="Machine Learning Prediction"
            desc="Powered by an optimized XGBoost regression model trained on real laptop market data."
          />

          <FeatureCard
            title="Market Analytics"
            desc="Analyze brand trends, RAM influence, GPU impact and hardware price patterns."
          />

          <FeatureCard
            title="Interactive Dashboard"
            desc="Visualize pricing insights through modern data dashboards and charts."
          />
        </div>
      </section>

      {/* ANALYTICS PREVIEW */}

      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">
              Understand Laptop Market Trends
            </h2>

            <p className="text-slate-600 dark:text-slate-400">
              Explore powerful analytics about laptop pricing patterns. Compare
              brands, RAM configurations, GPU performance and more using
              intuitive visual dashboards.
            </p>
          </div>

          <AnalyticsPreview />
        </div>
      </section>

      {/* CTA */}

      <section className="text-center py-24">
        <h2 className="text-4xl font-bold">Start Predicting Laptop Prices</h2>

        <p className="mt-4 text-slate-600 dark:text-slate-400">
          Discover insights from thousands of laptop configurations.
        </p>

        <Link
          to="/dashboard"
          className="
          inline-block mt-8
          px-10 py-4
          rounded-xl
          bg-linear-to-r
          from-blue-600 to-indigo-600
          text-white
          hover:opacity-90
          shadow-lg"
        >
          Launch Dashboard
        </Link>
      </section>

      {/* FOOTER */}

      <footer
        className="
        border-t border-slate-200 dark:border-white/10
        py-8 text-center text-sm
        text-slate-500 dark:text-slate-400"
      >
        © 2026 LaptopAI · Machine Learning Price Prediction System
      </footer>
    </div>
  );
};

/* ---------------- DASHBOARD PREVIEW ---------------- */

const DashboardPreview = () => {
  return (
    <div
      className="
      rounded-2xl
      border border-slate-200 dark:border-white/10
      bg-white dark:bg-white/5
      backdrop-blur-xl
      shadow-2xl
      p-6 space-y-6"
    >
      {/* STATS */}

      <div className="grid grid-cols-3 gap-4">
        <Stat label="R² Score" value="0.89" />

        <Stat label="MAE" value="₹6200" />

        <Stat label="RMSE" value="₹9400" />
      </div>

      {/* MINI BAR CHART */}

      <div className="flex items-end gap-2 h-32">
        <Bar h="h-10" />
        <Bar h="h-16" />
        <Bar h="h-8" />
        <Bar h="h-20" />
        <Bar h="h-14" />
      </div>

      {/* FEATURE IMPORTANCE */}

      <div className="space-y-3">
        <FeatureBar label="RAM Impact" width="75%" />

        <FeatureBar label="CPU Tier" width="65%" />

        <FeatureBar label="GPU Performance" width="50%" />
      </div>
    </div>
  );
};

const Stat = ({ label, value }) => (
  <div className="text-center p-3 rounded-lg bg-blue-500/10">
    <div className="text-xs text-slate-500">{label}</div>
    <div className="font-semibold">{value}</div>
  </div>
);

const Bar = ({ h }) => <div className={`w-6 ${h} bg-blue-500/60 rounded`} />;

const FeatureBar = ({ label, width }) => (
  <div>
    <div className="text-xs text-slate-500">{label}</div>

    <div className="w-full h-2 bg-slate-200 dark:bg-white/10 rounded mt-1">
      <div
        style={{ width }}
        className="h-2 bg-linear-to-r from-blue-500 to-cyan-400 rounded"
      />
    </div>
  </div>
);

/* ---------------- ANALYTICS PREVIEW ---------------- */

const AnalyticsPreview = () => {
  return (
    <div
      className="
      rounded-2xl
      border border-slate-200 dark:border-white/10
      bg-white dark:bg-white/5
      backdrop-blur-xl
      shadow-xl
      p-6"
    >
      <h4 className="text-sm mb-4 text-slate-500">Laptop Price Trend</h4>

      <div className="flex items-end gap-3 h-40">
        <ChartBar h="h-10" />
        <ChartBar h="h-16" />
        <ChartBar h="h-14" />
        <ChartBar h="h-24" />
        <ChartBar h="h-20" />
        <ChartBar h="h-28" />
        <ChartBar h="h-22" />
      </div>
    </div>
  );
};

const ChartBar = ({ h }) => (
  <div
    className={`flex-1 ${h} bg-linear-to-t from-blue-500 to-cyan-400 rounded`}
  />
);

/* ---------------- FEATURE CARD ---------------- */

const FeatureCard = ({ title, desc }) => (
  <motion.div
    whileHover={{ y: -6 }}
    className="
    p-6
    rounded-xl
    border border-slate-200 dark:border-white/10
    bg-white dark:bg-white/5
    backdrop-blur-xl
    shadow-lg"
  >
    <h3 className="text-lg font-semibold mb-3">{title}</h3>
    <p className="text-sm text-slate-600 dark:text-slate-400">{desc}</p>
  </motion.div>
);

export default Landing;
