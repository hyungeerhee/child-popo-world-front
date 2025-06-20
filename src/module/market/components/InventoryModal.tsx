import { IMAGE_URLS } from "@/lib/constants/constants";

interface InventoryModalProps {
  text: string;
  price?: number;
  image?: string;
  exp?: number;
  onConfirm?: () => void;
  onClose?: () => void;
}

export const InventoryModal = ({
  text,
  price,
  image,
  exp,
  onConfirm,
  onClose,
}: InventoryModalProps) => {
  return (
    <div
      className="relative flex flex-col items-center gap-y-4 w-100 min-h-64 py-4 px-13 bg-[#FFF6D5] border-4 lg:border-6 border-[#FEA95E] rounded-3xl"
      onClick={(e) => e.stopPropagation()}
    >
      <img
        src={IMAGE_URLS.market.modal_popo}
        alt="modal_popo"
        className="w-24 h-24 object-contain absolute bottom-0 -left-10"
      />
      <h4 className="text-[#EE9223] text-[1.5rem] font-extrabold">{!!exp ? "npc 먹이" : "부모님 아이템"} </h4>
      <div className="flex items-center justify-center gap-x-10">
        <img src={image} alt="coin" className="w-24 h-24 object-contain" />
        <div className="flex flex-col gap-y-2">
          <div className="text-xl text-[#6E532C] font-bold">{text}</div>
          {!!exp && (
          <div className="flex items-center gap-x-1">
          <img
            src={IMAGE_URLS.common.star}
            alt="star"
            className="w-7 h-7 object-contain"
          />
          <div className="text-lg text-[#6E532C] font-bold">{exp}경험치</div>
        </div>          )}
          <div className="flex items-center gap-x-2">
            <img
              src={IMAGE_URLS.common.coin}
              alt="coin"
              className="w-6 h-6 ml-0.5 object-contain"
            />
            <div className="text-lg text-[#6E532C] font-bold">{price}냥</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-x-3 w-full mt-auto">
        <div
          className="py-2 text-center rounded-xl bg-[#EE9223] text-[#FFF6D5] text-sm font-bold w-full active:scale-95 transition-all duration-100"
          onClick={onConfirm}
        >
          {!!exp ? "이동" : "사용"}
        </div>
        <div
          className="py-2 text-center rounded-xl bg-[#FFB55B] text-[#FFF6D5] text-sm font-bold w-full active:scale-95 transition-all duration-100"
          onClick={onClose}
        >
          취소
        </div>
      </div>
    </div>
  );
};
