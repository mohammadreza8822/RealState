"use client";
import { ThreeCircles } from "react-loader-spinner";

export default function ProfileDetailsLoading() {
  return (
    <div className="w-full min-h-[calc(100vh-200px)] flex justify-center items-center">
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
