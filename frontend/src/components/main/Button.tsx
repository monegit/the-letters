import { motion } from "framer-motion";

interface ButtonContent {
  content: string;
  icon: string;
}

function Button(props: ButtonContent) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        transition: { ease: "circOut", duration: 0.2 },
      }}
      className={`flex flex-col gap-3 justify-center items-center bg-slate-200 rounded-2xl border border-slate-300 cursor-pointer select-none
	md:w-[300px] sm:w-[150px] w-[150px]
	md:h-[200px] sm:h-[100px] h-[100px]`}
    >
      <span className="md:w-11 sm:w-7 w-7 bg-slate-400 p-2 rounded-lg text-center">
        {props.icon}
      </span>
      <div className="sm:text-sm md:text-2xl text-sm font-bold text-slate-600">
        {props.content}
      </div>
    </motion.div>
  );
}

export default Button;
