import { create } from "zustand";

interface TutorialState {
  currentStep: number;
  isCompleted: boolean;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  completeTutorial: () => void;
  resetTutorial: () => void;
}

export const useTutorialStore = create<TutorialState>()((set, get) => ({
  currentStep: 1,
  isCompleted: false,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep } = get();
    set({ currentStep: currentStep + 1 });
  },
  completeTutorial: () => set({ isCompleted: true }),
  resetTutorial: () => set({ currentStep: 1, isCompleted: false }),
})); 