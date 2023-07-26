import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

type DrawerProps = {
  title?: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function Drawer({
  title = "",
  description = "",
  children,
  isOpen,
  setIsOpen,
}: DrawerProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog
        unmount={false}
        onClose={() => setIsOpen(false)}
        className="fixed z-30 inset-0 overflow-y-auto"
      >
        <div className="w-screen h-screen">
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-in duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-30"
            entered="opacity-30"
            leave="transition-opacity ease-out duration-300"
            leaveFrom="opacity-30"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="z-40 fixed inset-0 bg-black" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div
              className={`fixed right-0 h-full flex flex-col justify-between bg-[#4B4545] z-50
                          w-full max-w-sm overflow-hidden text-left
                          align-middle shadow-xl rounded-l-2xl`}
            >
              <div>
                <Dialog.Title className="font-bold text-2xl md:text-4xl text-blue-500">
                  {title}
                </Dialog.Title>
                <Dialog.Description>{description}</Dialog.Description>
                {children}
              </div>

            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}
