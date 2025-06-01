import { Dialog } from "@headlessui/react";
import clsx from "clsx";
import { FaQuestion } from "react-icons/fa";
import ModalWrapper from "./ModalWrapper";
import Button from "./Button";

export default function ConfirmatioDialog({
  open,
  setOpen,
  msg,
  setMsg = () => {},
  onClick = () => {},
  type = "delete",
  setType = () => {},
}) {
  const closeDialog = () => {
    setType("delete");
    setMsg(null);
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as='h3' className=''>
            <p
              className={clsx(
                "p-3 rounded-full ",
                type === "restore" || type === "restoreAll"
                  ? "text-yellow-400 bg-yellow-100"
                  : "text-red-400 bg-red-200"
              )}
            >
              <FaQuestion size={38} />
            </p>
          </Dialog.Title>

          <p className='text-center text-gray-700'>
            {msg ?? "Tem certeza que deseja deletar o registro selecionado?"}
          </p>

          <div className='bg-white py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='button'
              className={clsx(
                " px-8 text-sm font-semibold text-white sm:w-auto rounded-md",
                type === "restore" || type === "restoreAll"
                  ? "bg-yellow-400"
                  : "bg-red-400 hover:bg-red-300 transition-colors duration-200"
              )}
              onClick={onClick}
              label={type === "restore" ? "Restaurar" : "Deletar"}
            />

            <Button
              type='button'
              className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto rounded-md border hover:bg-gray-100 transition-colors duration-200'
              onClick={() => closeDialog()}
              label='Cancelar'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}

export function UserAction({ open, setOpen, onClick = () => {} }) {
  const closeDialog = () => {
    setOpen(false);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={closeDialog}>
        <div className='py-4 w-full flex flex-col gap-4 items-center justify-center'>
          <Dialog.Title as='h3' className=''>
            <p className={clsx("p-3 rounded-full ", "text-red-400 bg-red-200")}>
              <FaQuestion size={60} />
            </p>
          </Dialog.Title>

          <p className='text-center text-gray-700'>
            {"Tem certeza que deseja ativar ou desativar esta conta?"}
          </p>

          <div className='bg-white py-3 sm:flex sm:flex-row-reverse gap-4'>
            <Button
              type='button'
              className={clsx(
                " px-8 text-sm font-semibold text-white sm:w-auto rounded-md transition-colors duration-200'",
                "bg-red-400 hover:bg-red-300"
              )}
              onClick={onClick}
              label={"Sim"}
            />

            <Button
              type='button'
              className='bg-white px-8 text-sm font-semibold text-gray-900 sm:w-auto rounded-md border hover:bg-gray-100 transition-colors duration-200'
              onClick={() => closeDialog()}
              label='Não'
            />
          </div>
        </div>
      </ModalWrapper>
    </>
  );
}