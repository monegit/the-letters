import {
  AnimationControls,
  Target,
  TargetAndTransition,
  VariantLabels,
} from "framer-motion";

export interface AnimationTypes {
  animate?: boolean | AnimationControls | TargetAndTransition | VariantLabels;
  initial?: boolean | Target | VariantLabels;
}
