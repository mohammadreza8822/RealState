"use client";
import { ThreeCircles } from "react-loader-spinner";

export default function DashboardLoading() {
  return (
    <div className="w-full min-h-[500px] flex justify-center items-center">
      <ThreeCircles
        height="75"
        width="75"
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
