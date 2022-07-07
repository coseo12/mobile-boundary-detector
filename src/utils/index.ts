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
  transparent: "transparent",
};

export const setModel = async () => {
  model = await load("./model/model.json");
};

export const getRotatePosition = (x: number, y: number) => {
  const pointer = {
    x: y,
    y: x,
  };
  return pointer;
};

export const getRotateSqure = async (square: Square) => {
  const { x, y } = getRotatePosition(square.cx, square.cy);
  const s1: Square = {
    cx: x,
    cy: y,
    lines: [],
  };
  for (const l of square.lines) {
    const { x, y } = getRotatePosition(l.dx, l.dy);
    const p = { dx: x, dy: y };
    s1.lines.push(p);
  }

  return s1;
};

export const getImgRotate = (img: HTMLImageElement) => {
  const deg = -90 * (Math.PI / 180);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  canvas.width = img.naturalHeight;
  canvas.height = img.naturalWidth;
  ctx.rotate(deg);
  ctx.drawImage(img, canvas.height * -1, 0);
  const imgEl = new Image();
  imgEl.src = canvas.toDataURL("image/png");
  return imgEl;
};

export const getCropImg = (img: HTMLImageElement, square: Square) => {
  const clipCanvas = document.createElement("canvas");
  const clipCtx = clipCanvas.getContext("2d")!;
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;
  let cx = square.cx;
  let cy = square.cy;
  let cxMax = cx;
  let cyMax = cy;
  let cWidth = 0;
  let cHeight = 0;

  for (const s of square.lines) {
    cx = s.dx < cx ? s.dx : cx;
    cy = s.dy < cy ? s.dy : cy;
    cxMax = s.dx > cxMax ? s.dx : cxMax;
    cyMax = s.dy > cyMax ? s.dy : cyMax;
  }
  cWidth = cxMax - cx;
  cHeight = cyMax - cy;

  clipCanvas.width = img.naturalWidth;
  clipCanvas.height = img.naturalHeight;
  clipCtx.save();
  clipCtx.beginPath();
  clipCtx.moveTo(square.cx, square.cy);
  for (const l of square.lines) {
    clipCtx.lineTo(l.dx, l.dy);
  }
  clipCtx.closePath();
  clipCtx.stroke();
  clipCtx.clip();
  clipCtx.drawImage(img, 0, 0);
  clipCtx.restore();

  canvas.width = cWidth;
  canvas.height = cHeight;
  ctx.drawImage(clipCanvas, cx, cy, cWidth, cHeight, 0, 0, cWidth, cHeight);

  const imgEl = new Image();
  imgEl.src = canvas.toDataURL();
  return imgEl;
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
  img.dispose();

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

export const getDetectCirclePath = (
  square: Square,
  options: Options,
  round: number = 8
) => {
  const xRatio = options?.xRatio || 1;
  const yRatio = options?.yRatio || 1;
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
  endY: number,
  type: "touches" | "line" = "line"
) => {
  let cx = 0;
  let cy = 0;
  let x = 0;
  let y = 0;

  if (type === "line") {
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
  } else {
    if (startX <= endX && startY <= endY) {
      cx = startX + Math.abs(startX - endX) / 2;
      cy = startY + Math.abs(startY - endY) / 2;
      x = startX + Math.abs(startX - endX) / 2;
      y = startY + Math.abs(startY - endY) / 2;
    } else if (startX >= endX && startY <= endY) {
      cx = endX + Math.abs(startX - endX) / 2;
      cy = startY + Math.abs(startY - endY) / 2;
      x = endX + Math.abs(startX - endX) / 2;
      y = startY + Math.abs(startY - endY) / 2;
    } else if (startX <= endX && startY >= endY) {
      cx = startX + Math.abs(startX - endX) / 2;
      cy = endY + Math.abs(startY - endY) / 2;
      x = startX + Math.abs(startX - endX) / 2;
      y = endY + Math.abs(startY - endY) / 2;
    } else if (startX >= endX && startY >= endY) {
      cx = endX + Math.abs(startX - endX) / 2;
      cy = endY + Math.abs(startY - endY) / 2;
      x = endX + Math.abs(startX - endX) / 2;
      y = endY + Math.abs(startY - endY) / 2;
    }
  }
  return { cx, cy, x, y };
};

export const getDetectFitPath = async (
  square: Square,
  options: Options,
  type: "touches" | "line" = "line",
  size: number = 20
) => {
  const xRatio = options?.xRatio || 1;
  const yRatio = options?.yRatio || 1;
  const path = [];
  let startX = square.cx * xRatio;
  let startY = square.cy * yRatio;
  let endX = 0;
  let endY = 0;

  const deg = 2 * Math.PI;
  const round = 30;

  for (const [_, v] of Object.entries(square.lines)) {
    endX = v.dx * xRatio;
    endY = v.dy * yRatio;

    const { cx, cy, x, y } = getPosition(startX, endX, startY, endY, type);

    const fit = new Path2D();

    if (type === "line") {
      fit.moveTo(cx, cy);
      fit.lineTo(x, y);
    } else {
      fit.arc(cx, cy, round, 0, deg);
    }
    path.push(fit);

    startX = endX;
    startY = endY;
  }
  endX = square.cx * xRatio;
  endY = square.cy * yRatio;

  const { cx, cy, x, y } = getPosition(startX, endX, startY, endY, type);

  const fit = new Path2D();

  if (type === "line") {
    fit.moveTo(cx, cy);
    fit.lineTo(x, y);
  } else {
    fit.arc(cx, cy, round, 0, deg);
  }
  path.push(fit);

  return path;
};

export const drawPath = async (
  ctx: CanvasRenderingContext2D,
  paths: Path2D[],
  type: "fill" | "line" = "fill",
  color: "orange" | "transparent" = "orange"
) => {
  ctx.save();
  for (const p of paths) {
    if (type === "fill") {
      ctx.fillStyle =
        color === "orange" ? colorSet.orange : colorSet.transparent;
      ctx.fill(p);
    } else {
      ctx.lineWidth = 5;
      ctx.strokeStyle =
        color === "orange" ? colorSet.orange : colorSet.transparent;

      ctx.stroke(p);
    }
  }

  ctx.restore();
};

export const getCopyImg = (img: HTMLImageElement) => {
  return img.cloneNode(true) as HTMLImageElement;
};

// -------- Experiment ---------
