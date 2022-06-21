import { defineStore } from "pinia";

interface State {
  model: any[];
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
      flashMode: "off",
      isLoading: true,
      isFlash: false,
    };
  },
});
