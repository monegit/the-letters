import React from "react";

interface ButtonProps {
  background?: string;
  fontColor?: string;
  onClick?: () => void;
  content: string;
}

function Button(props: ButtonProps) {
  return (
    <button
      className={`${props.background || "bg-slate-500"} ${
        props.fontColor || "text-white"
      } px-6 py-2 w-fit place-self-center rounded-lg `}
      onClick={props.onClick}
    >
      {props.content}
    </button>
  );
}

export default Button;
