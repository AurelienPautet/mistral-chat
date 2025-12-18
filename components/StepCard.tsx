import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface StepCardProps extends React.ComponentProps<"div"> {
  name: string;
  step: number;
  totalSteps: number;
  children?: React.ReactNode;
}

function StepCard({
  className,
  name,
  step,
  totalSteps,
  children,
  ...props
}: StepCardProps) {
  return (
    <Card
      data-slot="step-card"
      className={cn("h-1/2 w-1/2 flex flex-col p-8 mt-auto mb-auto", className)}
      {...props}
    >
      <h1 className="text-2xl font-bold">
        Step {step}: {name}
      </h1>
      <div className="flex flex-row gap-3">
        {Array.from({ length: step }).map((_, idx) => (
          <div
            key={idx}
            className="w-full h-2 bg-primary rounded-full mt-2"
          ></div>
        ))}
        {Array.from({ length: totalSteps - step }).map((_, idx) => (
          <div
            key={idx + step}
            className="w-full h-2 bg-gray-300 rounded-full mt-2"
          ></div>
        ))}
      </div>
      {children}
    </Card>
  );
}
export { StepCard };
