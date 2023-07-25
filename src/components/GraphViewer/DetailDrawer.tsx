import { MapPinIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Drawer from "./Drawer";

interface DetailDrawerProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function DetailDrawer({ isOpen, setIsOpen }: DetailDrawerProps) {
  return (
    <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className="w-full flex flex-col text-white">
        <h2 className="flex flex-col relative">
          <div className="flex items-center">
            <MapPinIcon className="w-5 h-5" />
            <span>Address</span>
          </div>
          <span className="text-xs mt-2">{`EQabcd`}</span>
          <ChevronRightIcon className="w-5 h-5 absolute" />
        </h2>
      </div>
    </Drawer>
  );
}
