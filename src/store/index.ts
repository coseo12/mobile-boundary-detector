import { defineStore } from "pinia";

type DialogType = "alert" | "confirm";

export interface Square {
  cx: number;
  cy: number;
  lines: { dx: number; dy: number }[];
}
interface Document {
  id: string;
  img: HTMLImageElement;
  square: Square;
  circlePath: Path2D[];
  fitPath: Path2D[];
}

interface State {
  documents: Document[];
  flashMode: "auto" | "off" | "flash";
  dialogText: string[];
  dialogType: DialogType;
  dialogLabels: string[];
  dialogConfirmCallback: Function | null;
  dialogCancelCallback: Function | null;
  toastMsg: string;
  cameraWidth: number;
  cameraHeight: number;
  video: HTMLVideoElement | null;
  isDialog: boolean;
  isLoading: boolean;
  isFlash: boolean;
  isToast: boolean;
}

export const useStore = defineStore("common", {
  // arrow function recommended for full type inference
  state: (): State => {
    return {
      // all these properties will have their type inferred automatically
      documents: [],
      dialogText: [],
      dialogLabels: [],
      dialogType: "alert",
      dialogConfirmCallback: null,
      dialogCancelCallback: null,
      toastMsg: "",
      flashMode: "off",
      cameraWidth: 0,
      cameraHeight: 0,
      video: null,
      isLoading: true,
      isFlash: false,
      isDialog: false,
      isToast: false,
    };
  },
  actions: {
    onDialog(
      type: DialogType,
      t: string[],
      labels?: string[],
      confirmCallback?: Function,
      cancelCallback?: Function
    ) {
      this.dialogType = type;
      this.dialogText = t;
      this.dialogLabels = labels || [];
      this.dialogConfirmCallback = confirmCallback || null;
      this.dialogCancelCallback = cancelCallback || null;
      this.isDialog = true;
    },
    onToast(msg: string) {
      this.toastMsg = msg;
      this.isToast = true;
      setTimeout(() => {
        this.isToast = false;
      }, 2000);
    },

    async capture(callback: Function) {
      if (!this.video) {
        return;
      }
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d")!;
      canvas.width = this.cameraWidth;
      canvas.height = this.cameraHeight;

      ctx.drawImage(this.video, 0, 0, this.cameraWidth, this.cameraHeight);

      const dataUrl = await canvas.toDataURL();
      const imgEl = new Image();
      imgEl.src = dataUrl;
      imgEl.onload = async () => {
        callback();
      };
    },
  },
});
