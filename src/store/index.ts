import { defineStore } from "pinia";

interface Document {
  id: string;
  img: HTMLImageElement;
  square: number[][];
  paths: Path2D[];
}

interface State {
  model: any[];
  documents: Document[];
  flashMode: "auto" | "off" | "flash";
  isLoading: boolean;
  isFlash: boolean;
}

export const useStore = defineStore("common", {
  // arrow function recommended for full type inference
  state: (): State => {
    return {
      // all these properties will have their type inferred automatically
      model: [],
      documents: [],
      flashMode: "off",
      isLoading: true,
      isFlash: false,
    };
  },
});
