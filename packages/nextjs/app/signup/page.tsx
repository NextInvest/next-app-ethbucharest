"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import FormSlider from "~~/components/FormSlider";
import Modal from "~~/components/SignUpModal";

const SignUp = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(true);
  const { register, handleSubmit } = useForm();
  const onSubmit = (data: any) => console.log(JSON.stringify(data));
  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormSlider register={register} />
        {isModalOpen && <Modal register={register} onClose={() => setModalOpen(false)} />}
      </form>
    </div>
  );
};

export default SignUp;
