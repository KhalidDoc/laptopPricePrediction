import { motion } from "framer-motion";

const Model = () => {
  return (
    <div
      className="
      min-h-screen
      bg-linear-to-br
      from-slate-100 via-white to-slate-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      text-slate-900 dark:text-white
      transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* TITLE */}

        <div>
          <h1
            className="
            text-3xl md:text-4xl font-bold
            bg-linear-to-r
            from-blue-600 via-cyan-500 to-indigo-600
            dark:from-blue-400 dark:via-cyan-400 dark:to-indigo-400
            bg-clip-text text-transparent"
          >
            AI Prediction Model
          </h1>

          <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-3xl">
            This page explains the machine learning architecture used to predict
            laptop prices based on hardware specifications and market data.
          </p>
        </div>

        {/* MODEL OVERVIEW */}

        <Section title="Model Overview">
          <p>
            The system uses an <b>XGBoost Regressor</b>, a powerful gradient
            boosted decision tree algorithm designed for structured data.
          </p>

          <p className="mt-3">
            XGBoost is widely used in machine learning competitions and
            production systems because it handles feature interactions,
            nonlinear relationships, and tabular datasets extremely well.
          </p>
        </Section>

        {/* DATASET */}

        <Section title="Dataset Features">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
            <Feature>Company</Feature>
            <Feature>TypeName</Feature>
            <Feature>Screen Size</Feature>
            <Feature>CPU Tier</Feature>
            <Feature>RAM</Feature>
            <Feature>Storage</Feature>
            <Feature>GPU Brand</Feature>
            <Feature>Operating System</Feature>
            <Feature>Weight</Feature>
            <Feature>Screen Resolution</Feature>
          </div>
        </Section>

        {/* FEATURE ENGINEERING */}

        <Section title="Feature Engineering">
          <ul className="space-y-2 text-sm">
            <li>• CPU string parsing to detect brand and performance tier</li>
            <li>• RAM normalization into numeric values</li>
            <li>• Storage classification (SSD / HDD / Hybrid)</li>
            <li>• Screen resolution converted to pixel density (PPI)</li>
            <li>• GPU classification for integrated vs dedicated GPUs</li>
          </ul>
        </Section>

        {/* TRAINING PIPELINE */}

        <Section title="Training Pipeline">
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <PipelineBox>Dataset</PipelineBox>
            <Arrow />
            <PipelineBox>Data Cleaning</PipelineBox>
            <Arrow />
            <PipelineBox>Feature Engineering</PipelineBox>
            <Arrow />
            <PipelineBox>Train / Test Split</PipelineBox>
            <Arrow />
            <PipelineBox>XGBoost Training</PipelineBox>
            <Arrow />
            <PipelineBox>Evaluation</PipelineBox>
          </div>
        </Section>

        {/* PREDICTION FLOW */}

        <Section title="Prediction Flow">
          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <PipelineBox>User Input</PipelineBox>
            <Arrow />
            <PipelineBox>React Form</PipelineBox>
            <Arrow />
            <PipelineBox>FastAPI Backend</PipelineBox>
            <Arrow />
            <PipelineBox>Feature Engineering</PipelineBox>
            <Arrow />
            <PipelineBox>XGBoost Model</PipelineBox>
            <Arrow />
            <PipelineBox>Price Prediction</PipelineBox>
          </div>
        </Section>

        {/* MODEL METRICS */}

        <Section title="Model Performance Metrics">
          <div className="grid md:grid-cols-3 gap-6">
            <Metric
              title="R² Score"
              desc="Measures how well the model explains price variability."
              color="text-blue-500"
            />

            <Metric
              title="MAE"
              desc="Average absolute difference between predicted and actual prices."
              color="text-green-500"
            />

            <Metric
              title="RMSE"
              desc="Penalizes large prediction errors more heavily."
              color="text-purple-500"
            />
          </div>
        </Section>
      </div>
    </div>
  );
};

export default Model;

/* ---------- COMPONENTS ---------- */

const Section = ({ title, children }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="
    rounded-2xl
    border border-slate-200 dark:border-white/10
    bg-white dark:bg-white/5
    backdrop-blur-xl
    p-6 shadow-xl"
  >
    <h2 className="text-xl font-semibold mb-4">{title}</h2>

    <div className="text-slate-700 dark:text-slate-400 leading-relaxed">
      {children}
    </div>
  </motion.div>
);

const Feature = ({ children }) => (
  <div
    className="
    px-3 py-2
    rounded-lg
    bg-slate-100 dark:bg-white/10
    border border-slate-200 dark:border-white/10"
  >
    {children}
  </div>
);

const PipelineBox = ({ children }) => (
  <div
    className="
    px-4 py-3
    rounded-xl
    bg-linear-to-r
    from-blue-500/10 to-cyan-500/10
    border border-blue-200 dark:border-white/10
    text-sm font-medium"
  >
    {children}
  </div>
);

const Arrow = () => <span className="text-xl text-slate-400">→</span>;

const Metric = ({ title, desc, color }) => (
  <div
    className="
    p-6
    rounded-xl
    border border-slate-200 dark:border-white/10
    bg-white dark:bg-white/5
    backdrop-blur-xl
    shadow-lg"
  >
    <h3 className={`text-lg font-semibold ${color}`}>{title}</h3>

    <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{desc}</p>
  </div>
);
