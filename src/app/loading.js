"use client";
import { ThreeCircles } from "react-loader-spinner";

export default function Loading() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <ThreeCircles
        height="100"
        width="100"
        color="#304ffe"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor="#304ffe"
        innerCircleColor="#1a237e"
        middleCircleColor="#bbdefb"
      />
    </div>
  );
}
