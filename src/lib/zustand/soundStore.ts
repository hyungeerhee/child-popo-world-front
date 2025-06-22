import { create } from "zustand";

export interface NamedHTMLAudioElement extends HTMLAudioElement {
  name?: string;
}

interface SoundState {
  isMuted: boolean;
  toggleMute: () => void;
  audio: NamedHTMLAudioElement | null;
  setAudio: (audio: NamedHTMLAudioElement | null) => void;
}

export const useSoundStore = create<SoundState>()((set) => ({
  isMuted: true,
  toggleMute: () => set((state) => ({ isMuted: !state.isMuted })),
  audio: null,
  setAudio: (audio: NamedHTMLAudioElement | null) => set({ audio }),
}));
