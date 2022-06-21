import { defineStore } from "pinia";

interface State {
  isLoading: boolean;
  model: any[];
}

export const useStore = defineStore("common", {
  // arrow function recommended for full type inference
  state: (): State => {
    return {
      // all these properties will have their type inferred automatically
      isLoading: true,
      model: [],
    };
  },
});
