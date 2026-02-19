import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const About = () => {
  return (
    <div className="app">
      <Sidebar />
      <div className="main">
        <Header />
        <h2>About Project</h2>
      </div>
    </div>
  );
};

export default About;
