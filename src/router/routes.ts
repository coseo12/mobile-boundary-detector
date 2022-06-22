import Loading from "@/pages/Loading.vue";
import Detector from "@/pages/Detector.vue";
import Edit from "@/pages/Edit.vue";
import Resize from "@/pages/Resize.vue";
import Documents from "@/pages/Documents.vue";
import Error from "@/pages/Error.vue";

export const constants = {
  loading: {
    path: "/loading",
    name: "loading",
    component: Loading,
  },
  detector: {
    path: "/detector",
    name: "detector",
    component: Detector,
  },
  edit: {
    path: "/edit/:id",
    name: "edit",
    component: Edit,
  },
  resize: {
    path: "/resize/:id",
    name: "resize",
    component: Resize,
  },
  documents: {
    path: "/documents",
    name: "documents",
    component: Documents,
  },
  error: {
    path: "/error",
    name: "error",
    component: Error,
  },
};

export const routes = [
  { path: "/", redirect: constants.loading.path },
  {
    path: constants.loading.path,
    name: constants.loading.name,
    component: constants.loading.component,
  },
  {
    path: constants.detector.path,
    name: constants.detector.name,
    component: constants.detector.component,
  },
  {
    path: constants.edit.path,
    name: constants.edit.name,
    component: constants.edit.component,
  },
  {
    path: constants.resize.path,
    name: constants.resize.name,
    component: constants.resize.component,
  },
  {
    path: constants.documents.path,
    name: constants.documents.name,
    component: constants.documents.component,
  },
  {
    path: constants.error.path,
    name: constants.error.name,
    component: constants.error.component,
  },
  {
    path: "/:catchAll(.*)",
    redirect: constants.error.path,
  },
];
