import { create } from "zustand";

interface TutorialState {
  currentStep: number;
  isCompleted: boolean;
  isTutorialCompleted: boolean;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  completeTutorial: () => void;
  resetTutorial: () => void;
  setTutorialCompleted: (completed: boolean) => void;
  resetAll: () => void;
}

export const useTutorialStore = create<TutorialState>()((set, get) => ({
  currentStep: 1,
  isCompleted: false,
  isTutorialCompleted: false,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  nextStep: () => {
    const { currentStep } = get();
    set({ currentStep: currentStep + 1 });
  },
  completeTutorial: () => set({ isCompleted: true }),
  resetTutorial: () => set({ currentStep: 1, isCompleted: false }),
  setTutorialCompleted: (completed: boolean) => set({ isTutorialCompleted: completed }),
  resetAll: () => set({ 
    currentStep: 1, 
    isCompleted: false, 
    isTutorialCompleted: false 
  }),
})); 