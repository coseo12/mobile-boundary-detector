// @ts-ignore
import { load } from "@/utils/detector/boundary_detector.js";

export const getModel = async () => {
  return await load("./model/model.json");
};
