import { StepCard } from "@/components/StepCard";
import { Step1Content } from "@/components/steps/Step1Content";

export default function Page() {
  return (
    <StepCard name="Import Content" step={1}>
      <Step1Content />
    </StepCard>
  );
}
