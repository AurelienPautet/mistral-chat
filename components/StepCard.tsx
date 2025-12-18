import React from "react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";

interface StepCardProps extends React.ComponentProps<"div"> {
  name: string;
  step: number;
  children?: React.ReactNode;
}

function StepCard({
  className,
  name,
  step,
  children,
  ...props
}: StepCardProps) {
  return (
    <Card
      data-slot="step-card"
      className={cn("h-3/4 w-1/2 flex flex-col p-8 mt-auto mb-auto", className)}
      {...props}
    >
      <h1 className="text-2xl font-bold">
        Step {step}: {name}
      </h1>
      <div className="flex flex-row gap-3">
        <div className={cn("w-full h-2 bg-primary rounded-2xl")}></div>
        <div className="w-full h-2 bg-secondary rounded-2xl"></div>
        <div className="w-full h-2 bg-secondary rounded-2xl"></div>
      </div>
      {children}
    </Card>
  );
}
export { StepCard };
