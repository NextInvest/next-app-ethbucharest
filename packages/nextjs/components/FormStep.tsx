// components/FormStep.tsx
import { FC, ReactNode } from "react";
import { motion } from "framer-motion";

export type FormStepProps = {
  children: ReactNode;
};

const FormStep: FC<FormStepProps> = ({ children }) => {
  return (
    <motion.div
      initial={{ x: "100vw", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "-100vw", opacity: 0 }}
      transition={{ type: "tween", duration: 0.3 }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
};

export default FormStep;
