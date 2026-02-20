import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const About = () => {
  return (
    <div
      className="min-h-screen flex
      bg-linear-to-br
      from-slate-100 via-white to-slate-100
      dark:from-slate-950 dark:via-slate-900 dark:to-slate-950
      text-slate-900 dark:text-white
      transition-colors duration-500"
    >
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header Wrapper */}
        <div
          className="backdrop-blur-xl 
          bg-white dark:bg-white/5 
          border-b border-slate-200 dark:border-white/10"
        >
          <Header />
        </div>

        <div className="flex-1 p-6 md:p-10 space-y-10">
          {/* Page Title */}
          <div>
            <h1
              className="text-3xl font-bold 
              bg-linear-to-r from-blue-600 to-cyan-500
              dark:from-blue-400 dark:to-cyan-400
              bg-clip-text text-transparent"
            >
              About Laptop Price Intelligence System
            </h1>

            <p className="text-slate-600 dark:text-slate-400 mt-3 max-w-3xl">
              An AI-powered regression platform designed to predict laptop
              prices using advanced machine learning techniques and real-world
              market data.
            </p>
          </div>

          {/* Card Style Helper */}
          {[
            {
              title: "Project Overview",
              content: (
                <>
                  <p>
                    This system leverages supervised machine learning to
                    estimate laptop prices based on hardware specifications such
                    as CPU tier, RAM, storage type, GPU brand, screen
                    resolution, operating system, and physical attributes.
                  </p>

                  <p className="mt-4">
                    The goal is to provide data-driven pricing insights that
                    help users, businesses, and resellers understand fair market
                    value based on configuration.
                  </p>
                </>
              ),
            },
            {
              title: "Machine Learning Architecture",
              content: (
                <>
                  <ul className="space-y-2">
                    <li>
                      • Algorithm: XGBoost Regressor (Gradient Boosted Trees)
                    </li>
                    <li>
                      • Feature Engineering: CPU parsing, RAM normalization,
                      storage encoding
                    </li>
                    <li>• Hyperparameter Optimization: RandomizedSearchCV</li>
                    <li>• Evaluation Metrics: R², MAE, RMSE</li>
                    <li>• Dataset Size: ~1200+ laptop records</li>
                  </ul>

                  <p className="text-xs text-slate-500 dark:text-slate-500 mt-4">
                    The model explains a significant portion of market price
                    variance, achieving strong predictive reliability.
                  </p>
                </>
              ),
            },
            {
              title: "Model Evaluation Philosophy",
              content: (
                <>
                  <p>
                    The system evaluates model performance using multiple
                    regression metrics to ensure both predictive accuracy and
                    stability.
                  </p>

                  <ul className="mt-4 space-y-2">
                    <li>• R² measures explanatory power</li>
                    <li>• MAE quantifies average pricing deviation</li>
                    <li>• RMSE penalizes larger prediction errors</li>
                  </ul>
                </>
              ),
            },
            {
              title: "Technology Stack",
              content: (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Frontend</h3>
                    <ul className="space-y-1">
                      <li>• React.js</li>
                      <li>• Tailwind CSS</li>
                      <li>• Chart.js</li>
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-medium mb-2">Backend</h3>
                    <ul className="space-y-1">
                      <li>• FastAPI</li>
                      <li>• Python</li>
                      <li>• XGBoost</li>
                      <li>• Pandas / NumPy</li>
                    </ul>
                  </div>
                </div>
              ),
            },
            {
              title: "System Architecture",
              content: (
                <>
                  <p>
                    The frontend communicates with a FastAPI backend via REST
                    APIs. Prediction requests are processed in real time by the
                    trained XGBoost model.
                  </p>

                  <p className="mt-4">
                    The architecture is modular and scalable, enabling
                    integration of additional machine learning models and
                    analytics pipelines.
                  </p>
                </>
              ),
            },
          ].map((section, index) => (
            <section
              key={index}
              className="rounded-2xl
                border border-slate-200 dark:border-white/10
                bg-white dark:bg-white/5
                backdrop-blur-xl
                p-6 shadow-xl
                transition-colors duration-500"
            >
              <h2
                className="text-xl font-semibold 
                text-slate-800 dark:text-slate-300 mb-4"
              >
                {section.title}
              </h2>

              <div className="text-sm text-slate-700 dark:text-slate-400 leading-relaxed">
                {section.content}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
