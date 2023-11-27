import { Card } from "antd";
import React from "react";

const Cancel = () => {
  return (
    <div className="cancel-container px-96 pt-52">
      <Card className="items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-10 w-10"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>

        <h2>Payment Cancelled</h2>
        <p>Your payment has been cancelled.</p>
        <button className="cancel-button">
          <a href="*">Go Back Home</a>
        </button>
      </Card>
    </div>
  );
};

export default Cancel;
