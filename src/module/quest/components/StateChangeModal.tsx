import { Modal } from "@/components/modal/Modal";
import { IMAGE_URLS } from "@/lib/constants/constants";

interface StateChangeModalProps {
  isOpen: boolean;
  text: string;
  onClose: () => void;
  onConfirm: () => void;
}

export const StateChangeModal = ({
  isOpen,
  onClose,
  onConfirm,
  text,
}: StateChangeModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className="relative bg-white px-[4rem] pt-[3.5rem] pb-[1.5rem] rounded-2xl text-center shadow-lg border-[0.4rem] border-[#ff8442]"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-[#5e4632] font-bold text-[1.2rem]">{text}</p>

        <div className="flex justify-center gap-4 mt-[2rem]">
          <button
            className="bg-yellow-300 text-[#5e4632] px-[1rem] py-[0.5rem] rounded-lg shadow cursor-pointer
             transition duration-150 ease-in-out active:scale-95"
            onClick={onConfirm}
          >
            응!
          </button>

          <button
            className="bg-gray-200 text-[#5e4632] px-[1rem] py-[0.5rem] rounded-lg shadow cursor-pointer
             transition duration-150 ease-in-out active:scale-95"
            onClick={onClose}
          >
            아니
          </button>
        </div>

        {/* 포포 */}
        <img
          src={IMAGE_URLS.quest.modal_popo}
          alt="포포"
          className="absolute w-[10rem] right-[-5em] bottom-[-3rem]"
        />
      </div>
    </Modal>
  );
};
