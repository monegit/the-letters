import { AnimationControls } from "framer-motion";
import React from "react";
import { useNavigate } from "react-router-dom";
import { useModalStore } from "../../store/modal/modal";
import { useLetterStore } from "../../store/write/letter";
import Button from "../Button";

function WriteExit(props: { bodyAnimation: AnimationControls }) {
  const { setVisible } = useModalStore();
  const { setInit } = useLetterStore();

  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-8 text-center">
      <div className="flex flex-col gap-4">
        <span className="text-rose-600 md:text-2xl sm:text-base text-base">
          작성을 중단합니다!
        </span>
        <div className="flex flex-col md:text-base sm:text-xs text-xs">
          <span>
            작성을 중단하면{" "}
            <span className="text-rose-500">
              작성 중이던 내용이 사라집니다.
            </span>
          </span>
          <span>그래도 작성을 중단하시겠습니까?</span>
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <Button
          content={"취소"}
          onClick={() => {
            setVisible(false);
          }}
        />
        <Button
          content={"확인"}
          background="bg-rose-500"
          onClick={() => {
            props.bodyAnimation.start({ opacity: 0 }).then(() => {
              navigate("/");
              setVisible(false);
            });
          }}
        />
      </div>
    </div>
  );
}

export default WriteExit;
