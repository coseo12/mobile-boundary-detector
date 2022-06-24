// @ts-ignore
import { load, detect } from "@/utils/detector/boundary_detector.js";
import { Square } from "@/store";

declare global {
  interface Window {
    tf: any;
  }
}

interface Options {
  xRatio: number;
  yRatio: number;
}

let model: any[] = [];

const colorSet = {
  orange: "#f34a00",
};

export const setModel = async () => {
  model = await load("./model/model.json");
};

export const getSquare = async (imgEl: HTMLImageElement) => {
  const width = imgEl.naturalWidth;
  const height = imgEl.naturalHeight;
  const wRatio = width / 320;
  const hRatio = height / 320;

  const cloneImg = imgEl.cloneNode(true) as HTMLImageElement;
  cloneImg.width = 320;
  cloneImg.height = 320;
  const img = await window.tf.browser.fromPixels(cloneImg);
  const square = await detect(img, model);
  if (square.length !== 4) {
    return null;
  }
  const originalSquare: Square = {
    cx: 0,
    cy: 0,
    lines: [],
  };

  for (const [k, v] of Object.entries(square)) {
    const i = Number(k);
    const l = v as number[];
    const x = l[0] * wRatio;
    const y = l[1] * hRatio;

    if (i === 0) {
      originalSquare.cx = Math.ceil(x);
      originalSquare.cy = Math.ceil(y);
      continue;
    }
    originalSquare.lines.push({ dx: Math.ceil(x), dy: Math.ceil(y) });
  }

  return originalSquare;
};

export const drawDetectLines = async (
  ctx: CanvasRenderingContext2D,
  square: Square,
  options?: Options
) => {
  const xRatio = options?.xRatio || 1;
  const yRatio = options?.yRatio || 1;

  ctx.save();
  ctx.strokeStyle = colorSet.orange;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(square.cx * xRatio, square.cy * yRatio);
  for (const l of square.lines) {
    ctx.lineTo(l.dx * xRatio, l.dy * yRatio);
  }
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
};

export const getDetectCirclePath = async (
  square: Square,
  options: Options
) => {};

export const getDetectFitPath = async (square: Square, options: Options) => {};

export const drawPath = async (
  ctx: CanvasRenderingContext2D,
  paths: Path2D[]
) => {
  ctx.save();
  ctx.fillStyle = colorSet.orange;
  for (const p of paths) {
    ctx.fill(p);
  }
  ctx.restore();
};
