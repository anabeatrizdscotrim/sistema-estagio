import React, { useState } from "react";
import ModalWrapper from "../ModalWrapper";
import { Dialog } from "@headlessui/react";
import Textbox from "../Textbox";
import { useForm } from "react-hook-form";
import UserList from "./UserList";
import SelectList from "../SelectList";
import { BiImages } from "react-icons/bi";
import Button from "../Button";

const LISTS = ["PARA FAZER", "EM PROGRESSO", "FINALIZADO"];
const PRIORIRY = ["ALTA", "MÉDIA", "NORMAL", "BAIXA"];

const uploadedFileURLs = [];

const AddTask = ({ open, setOpen }) => {
  const task = "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [team, setTeam] = useState(task?.team || []);
  const [stage, setStage] = useState(task?.stage?.toUpperCase() || LISTS[0]);
  const [priority, setPriority] = useState(
    task?.priority?.toUpperCase() || PRIORIRY[2]
  );
  
  const [assets, setAssets] = useState([]);
  const [uploading, setUploading] = useState(false);

  const submitHandler = () => {};

  const handleSelect = (e) => {
    setAssets(e.target.files);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form onSubmit={handleSubmit(submitHandler)}>
          <Dialog.Title
            as='h2'
            className='text-base font-bold leading-6 text-gray-900 mb-4'
          >
            {task ? "ATUALIZAR TAREFA" : "ADICIONAR TAREFA"}
          </Dialog.Title>

          <div className='mt-2 flex flex-col gap-6'>
            <Textbox
              placeholder='Título da Tarefa'
              type='text'
              name='title'
              label='Tarefa'
              className='w-full rounded'
              register={register("title", { required: "Escolha um título para a tarefa!" })}
              error={errors.title ? errors.title.message : ""}
            />

            <UserList setTeam={setTeam} team={team} />

            <div className='flex gap-4'>
              <SelectList
                label='Status'
                lists={LISTS}
                selected={stage}
                setSelected={setStage}
              />

              <div className='w-full'>
                <Textbox
                  placeholder='Date'
                  type='date'
                  name='date'
                  label='Data'
                  className='w-full rounded'
                  register={register("date", {
                    required: "Escolha uma data!",
                  })}
                  error={errors.date ? errors.date.message : ""}
                />
              </div>
            </div>

            <div className='flex gap-4'>
              <SelectList
                label='Prioridade'
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />

              <div className='w-full flex items-center justify-center mt-4'>
                <label
                  className='flex items-center gap-1 text-base text-ascent-2 hover:text-ascent-1 cursor-pointer my-4'
                  htmlFor='imgUpload'
                >
                  <input
                    type='file'
                    className='hidden'
                    id='imgUpload'
                    onChange={(e) => handleSelect(e)}
                    accept='.jpg, .png, .jpeg'
                    multiple={true}
                  />
                  <BiImages />
                  <span>Adicionar arquivos</span>
                </label>
              </div>
            </div>

            <div className='bg-white py-6 sm:flex sm:flex-row-reverse gap-4'>
              {uploading ? (
                <span className='text-sm py-2 text-red-400'>
                  Carregando arquivos
                </span>
              ) : (
                <Button
                  label='Enviar'
                  type='submit'
                  className='bg-blue-400 px-8 text-sm font-semibold text-white hover:bg-blue-300  sm:w-auto  rounded-xl'
                />
              )}

              <Button
                type='button'
                className='bg-red-400 px-5 text-sm font-semibold text-white hover:bg-red-300 sm:w-auto rounded-xl'
                onClick={() => setOpen(false)}
                label='Cancelar'
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;