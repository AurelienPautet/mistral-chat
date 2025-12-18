"use-client";

import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
function Step1Content() {
  return (
    <div className="h-full flex flex-col mt-4">
      <div>
        <Label htmlFor="repo-url">Repo URL</Label>
        <Input id="repo-url"></Input>
      </div>
      <Button className="mt-auto mx-auto w-1/2">
        Next
        <ArrowRight className="ml-2" />
      </Button>
    </div>
  );
}

export { Step1Content };
