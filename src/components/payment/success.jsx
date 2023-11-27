import React from "react";
import { Card } from "antd";

const Success = () => {
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
            d="M4.5 12.75l6 6 9-13.5"
          />
        </svg>

        <h2>Payment Successful!</h2>
        <p>Thank you for your purchase.</p>
        <button className="cancel-button">
          <a href="*">Go Back Home</a>
        </button>
      </Card>
    </div>
  );
};

export default Success;
