import { Dialog } from "@headlessui/react";
import React from "react";
import { useForm } from "react-hook-form";
import Button from "./Button";
import Loading from "./Loader";
import ModalWrapper from "./ModalWrapper";
import Textbox from "./Textbox";
import { toast } from "sonner";
import { useChangePasswordMutation } from "../redux/slices/api/userApiSlice";

const ChangePassword = ({ open, setOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [changeUserPassword, { isLoading }] = useChangePasswordMutation();

  const handleOnSubmit = async (data) => {
    if (data.password !== data.cpass) {
      toast.warning("A senha não é a mesma!");
      return;
    }
    try {
      const res = await changeUserPassword(data).unwrap();
      toast.success("Novo usuário adicionado com sucesso");

      setTimeout(() => {
        setOpen(false);
      }, 1500);
    } catch (err) {
      console.log(err);
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(handleOnSubmit)} className=''>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            MUDAR A SENHA
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Nova Senha'
              type='password'
              name='password'
              label='Nova Senha'
              className='w-full rounded'
              register={register("password", {
                required: "Campo obrigatório!",
              })}
              error={errors.password ? errors.password.message : ""}
            />
            <Textbox
              placeholder='Confirme sua nova senha'
              type='password'
              name='cpass'
              label='Confirme sua nova senha'
              className='w-full rounded'
              register={register("cpass", {
                required: "Confirme sua nova senha!",
              })}
              error={errors.cpass ? errors.cpass.message : ""}
            />
          </div>

          {isLoading ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50'
                label='Salvar'
              />

              <button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-red-400 sm:w-auto'
                onClick={() => setOpen(false)}
              >
                Cancelar
              </button>
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default ChangePassword;