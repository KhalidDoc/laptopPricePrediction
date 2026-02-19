import { useEffect, useState } from "react";
const ResultCard = ({ price }) => {
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    if (!price) return;

    let start = 0;
    const interval = setInterval(() => {
      start += price / 20;
      if (start >= price) {
        setDisplayPrice(price);
        clearInterval(interval);
      } else {
        setDisplayPrice(Math.floor(start));
      }
    }, 30);
  }, [price]);

  if (!price) return null;
  return (
    <div className="glass-card result-card">
      <h3>Prediction Result</h3>
      <div className="price">₹ {displayPrice}</div>
      <div className="category premium">
        {price > 80000 ? "Premium" : price > 40000 ? "Mid-Range" : "Budget"}
      </div>
    </div>
  );
};

export default ResultCard;
