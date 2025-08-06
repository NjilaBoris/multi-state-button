import { ShieldAlert, ShieldCheck } from "lucide-react";
import { AppleSpinner } from "./apple-spinner";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { cva } from "class-variance-authority";
import { useState } from "react";
import { cn } from "tailwind-cn";

const buttonStates = {
  idle: {
    text: "secure",
    icon: <ShieldAlert className="h-4 w-4" />,
  },
  loading: {
    text: "securing",
    icon: <AppleSpinner size={16} color="rgba(255, 255, 255, 0.65)" />,
  },
  success: {
    text: "secured",
    icon: <ShieldCheck className="h-4 w-4" />,
  },
};

const animationVariants: Variants = {
  initial: { opacity: 0, y: -25 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 25 },
};
const App = () => {
  const [buttonState, setButtonState] =
    useState<keyof typeof buttonStates>("idle");

  const buttonStyleVariants = cva(
    "w-[150px] overflow-hidden rounded-2xl bg-zinc-900 shadow-[inset_0px_0.5px_0px_1px_#65656522] drop-shadow-md transition-colors disabled:opacity-100",
    {
      variants: {
        variant: {
          idle: "text-red-500 hover:bg-red-300/10",
          loading: "text-neutral-200 hover:bg-neutral-700",
          success: "text-green-500 bg-green-300/10",
        },
      },
      defaultVariants: {
        variant: "idle",
      },
    }
  );
  return (
    <div className="flex w-full items-center justify-center p-6 h-dvh">
      <button
        className={cn(buttonStyleVariants({ variant: buttonState }))}
        disabled={buttonState !== "idle"}
        onClick={() => {
          setButtonState("loading");

          setTimeout(() => {
            setButtonState("success");
          }, 2550);

          setTimeout(() => {
            setButtonState("idle");
          }, 4000);
        }}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={buttonState}
            className="flex items-center gap-2 py-3 px-4 cursor-pointer justify-center"
            variants={animationVariants}
            initial="initial"
            animate="visible"
            exit="exit"
            transition={{
              type: "spring",
              duration: 0.4,
              bounce: 0,
            }}
          >
            {buttonStates[buttonState].icon}
            {buttonStates[buttonState].text}
          </motion.span>
        </AnimatePresence>
      </button>
    </div>
  );
};

export default App;
