import { create } from "zustand";
import { IPricingPlan } from "../types";

interface IDeployStore { 
  planSelected: IPricingPlan | null;
  setPlanSelected: (plan: IPricingPlan) => void;
}

export const useDeployStore = create<IDeployStore>((set) => ({
  planSelected:null,
  setPlanSelected: (plan: IPricingPlan) => {
    console.log('planSelected', plan);
    return set({ planSelected: plan });
  },
}));
