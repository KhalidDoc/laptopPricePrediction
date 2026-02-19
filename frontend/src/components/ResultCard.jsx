import { useEffect, useState } from "react";

const ResultCard = ({ prediction }) => {
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    if (!prediction?.price) return;

    let start = 0;
    const interval = setInterval(() => {
      start += prediction.price / 20;
      if (start >= prediction.price) {
        setDisplayPrice(prediction.price);
        clearInterval(interval);
      } else {
        setDisplayPrice(Math.floor(start));
      }
    }, 30);

    return () => clearInterval(interval);
  }, [prediction]);

  if (!prediction) return null;

  return (
    <div className="glass-card result-card">
      <h3>Prediction Result</h3>
      <div className="price">₹ {displayPrice}</div>
      <div className={`category ${prediction.category.toLowerCase()}`}>
        {prediction.category}
      </div>
    </div>
  );
};

export default ResultCard;
