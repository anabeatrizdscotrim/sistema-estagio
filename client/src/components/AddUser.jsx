import React from "react";
import { useForm } from "react-hook-form";
import {useDispatch, useSelector } from "react-redux";
import ModalWrapper from "./ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "./Textbox";
import Loading from "./Loader";
import Button from "./Button";
import { useRegisterMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { useUpdateUserMutation } from "../redux/slices/api/userApiSlice";
import { setCredentials } from "../redux/slices/authSlice";


const AddUser = ({ open, setOpen, userData }) => {
  let defaultValues = userData ?? {};
  const { user } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues });

  const dispatch = useDispatch();

  const [addNewUser, {isLoading}] = useRegisterMutation();
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  
  const handleOnSubmit = async (data) => {
    try {
      if(userData){ 
        const result = await updateUser(data).unwrap();

        toast.success("Perfil atualizado com sucesso");

        if(userData?._id === user?._id){
          dispatch(setCredentials({...result.user}))
        }
      } else {
        await addNewUser({
          ...data, 
          password: data.email,
        }).unwrap();

        toast.success("Usuário adicionado com sucesso");
      }

      setTimeout(() => {
        setOpen(false);
      },1500);
    } catch (error) {
      toast.error("Algo deu errado")
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
            {userData ? "ATUALIZAR PERFIL" : "ADICIONAR USUÁRIO"}
          </Dialog.Title>
          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Nome Completo'
              type='text'
              name='name'
              label='Nome Completo'
              className='w-full rounded'
              register={register("name", {
                required: "O nome completo é obrigatório!",
              })}
              error={errors.name ? errors.name.message : ""}
            />
            <Textbox
              placeholder='Título'
              type='text'
              name='title'
              label='Título'
              className='w-full rounded'
              register={register("title", {
                required: "O título é obrigatório!",
              })}
              error={errors.title ? errors.title.message : ""}
            />
            <Textbox
              placeholder='Email'
              type='email'
              name='email'
              label='Email'
              className='w-full rounded'
              register={register("email", {
                required: "O email do usuário é obrigatório!",
              })}
              error={errors.email ? errors.email.message : ""}
            />

            <Textbox
              placeholder='Papel'
              type='text'
              name='role'
              label='Papel'
              className='w-full rounded'
              register={register("role", {
                required: "O papel do usuário é obrigatório!",
              })}
              error={errors.role ? errors.role.message : ""}
            />
          </div>

          {isLoading || isUpdating ? (
            <div className='py-5'>
              <Loading />
            </div>
          ) : (
            <div className='py-3 mt-4 sm:flex sm:flex-row-reverse'>
              <Button
                type='submit'
                className='rounded-lg border border-gray-300 bg-white px-5 py-2 text-sm font-medium text-gray-900 shadow-sm transition hover:bg-gray-50'
                label='Confirmar'
              />

              <Button
                type='button'
                className='bg-white px-5 text-sm font-semibold text-red-400 hover:text-red-300 sm:w-auto transition-colors duration-200'
                onClick={() => setOpen(false)}
                label='Cancelar'
              />
            </div>
          )}
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddUser;