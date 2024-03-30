"use client";

import React, { useState } from "react";
import FormSlider from "~~/components/FormSlider";
import Modal from "~~/components/SignUpModal";

const SignUp = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(true);
  return (
    <div className="container mx-auto p-4">
      {isModalOpen && <Modal onClose={() => setModalOpen(false)} />}
      <FormSlider />
    </div>
  );
};

export default SignUp;
