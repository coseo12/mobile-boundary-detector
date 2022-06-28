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
let isCircles: boolean = false;
let isFit: boolean = false;

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

export const getDetectCirclePath = (square: Square, options: Options) => {
  const xRatio = options?.xRatio || 1;
  const yRatio = options?.yRatio || 1;
  const round = 8;
  const deg = 2 * Math.PI;
  const path = [];
  const circle = new Path2D();
  circle.arc(square.cx * xRatio, square.cy * yRatio, round, 0, deg);
  path.push(circle);

  for (const l of square.lines) {
    const circle = new Path2D();
    circle.arc(l.dx * xRatio, l.dy * yRatio, round, 0, deg);
    path.push(circle);
  }
  return path;
};

const getPosition = (
  startX: number,
  endX: number,
  startY: number,
  endY: number
) => {
  let cx = 0;
  let cy = 0;
  let x = 0;
  let y = 0;

  if (startX <= endX && startY <= endY) {
    cx = startX + Math.abs(startX - endX) / 1.6;
    cy = startY + Math.abs(startY - endY) / 1.6;
    x = startX + Math.abs(startX - endX) / 2.4;
    y = startY + Math.abs(startY - endY) / 2.4;
  } else if (startX >= endX && startY <= endY) {
    cx = endX + Math.abs(startX - endX) / 2.4;
    cy = startY + Math.abs(startY - endY) / 1.6;
    x = endX + Math.abs(startX - endX) / 1.6;
    y = startY + Math.abs(startY - endY) / 2.4;
  } else if (startX <= endX && startY >= endY) {
    cx = startX + Math.abs(startX - endX) / 2.4;
    cy = endY + Math.abs(startY - endY) / 1.6;
    x = startX + Math.abs(startX - endX) / 1.6;
    y = endY + Math.abs(startY - endY) / 2.4;
  } else if (startX >= endX && startY >= endY) {
    cx = endX + Math.abs(startX - endX) / 1.6;
    cy = endY + Math.abs(startY - endY) / 1.6;
    x = endX + Math.abs(startX - endX) / 2.4;
    y = endY + Math.abs(startY - endY) / 2.4;
  }
  return { cx, cy, x, y };
};

export const getDetectFitPath = async (square: Square, options: Options) => {
  const xRatio = options?.xRatio || 1;
  const yRatio = options?.yRatio || 1;
  const path = [];
  let startX = square.cx * xRatio;
  let startY = square.cy * yRatio;
  let endX = 0;
  let endY = 0;

  for (const [_, v] of Object.entries(square.lines)) {
    endX = v.dx * xRatio;
    endY = v.dy * yRatio;

    const { cx, cy, x, y } = getPosition(startX, endX, startY, endY);

    const fit = new Path2D();
    fit.moveTo(cx, cy);
    fit.lineTo(x, y);
    path.push(fit);

    startX = endX;
    startY = endY;
  }
  endX = square.cx * xRatio;
  endY = square.cy * yRatio;

  const { cx, cy, x, y } = getPosition(startX, endX, startY, endY);
  const fit = new Path2D();
  fit.moveTo(cx, cy);
  fit.lineTo(x, y);
  path.push(fit);

  return path;
};

export const drawPath = async (
  ctx: CanvasRenderingContext2D,
  paths: Path2D[],
  type: "circle" | "line" = "circle"
) => {
  ctx.save();
  if (type === "circle") {
    ctx.fillStyle = colorSet.orange;
    for (const p of paths) {
      ctx.fill(p);
    }
  } else {
    ctx.strokeStyle = colorSet.orange;
    ctx.lineWidth = 5;
    for (const p of paths) {
      ctx.stroke(p);
    }
  }
  ctx.restore();
};

export const getImgRotate = (img: HTMLImageElement) => {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = img.naturalHeight;
  canvas.height = img.naturalWidth;
  ctx.rotate((90 * Math.PI) / 180);
  ctx.drawImage(img, 0, canvas.width * -1);

  const imgEl = new Image();
  imgEl.src = canvas.toDataURL("image/png");
  return imgEl;
};

export const setRotate = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number
) => {
  const tx = width / 2;
  const ty = height / 2;
  ctx.translate(tx, ty);
  ctx.rotate((90 * Math.PI) / 180);
  ctx.translate(-tx, -ty);
};

export const setCanvasTEST = (src: string) => {
  const img = document.createElement("img");
  img.src = src;
  img.onload = async () => {
    const width = img.naturalWidth;
    const height = img.naturalHeight;
    const square = await getSquare(img);

    if (!square) {
      return;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d")!;

    canvas.width = 320;
    canvas.height = 320;

    ctx.drawImage(img, 0, 0, 320, 320);
    drawDetectLines(ctx, square, {
      xRatio: 320 / width,
      yRatio: 320 / height,
    });
    drawPath(
      ctx,
      getDetectCirclePath(square, {
        xRatio: 320 / width,
        yRatio: 320 / height,
      })
    );

    drawPath(
      ctx,
      await getDetectFitPath(square, {
        xRatio: 320 / width,
        yRatio: 320 / height,
      }),
      "line"
    );

    document.body.appendChild(canvas);
  };
};

export const setCanvasRotate = (src: string) => {
  // translate to center-canvas
  // the origin [0,0] is now center-canvas
  //TODO: TEST
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  const img = document.createElement("img");
  img.src = src;
  img.onload = async () => {
    canvas.width = img.naturalHeight;
    canvas.height = img.naturalWidth;
    ctx.rotate((90 * Math.PI) / 180);
    ctx.drawImage(img, 0, canvas.width * -1);
  };
  document.body.appendChild(canvas);
};
