import { motion, useAnimation } from "framer-motion";

export const ParagraphItem = (props: { paragraph: string }) => {
  const paragraphAnimation = useAnimation();

  return (
    <motion.div
      className="text-center font-bold text-slate-600"
      animate={paragraphAnimation}
      initial={{ opacity: 0, top: 10 }}
      onViewportEnter={() => paragraphAnimation.start({ opacity: 1, top: 0 })}
    >
      {props.paragraph}
    </motion.div>
  );
};
