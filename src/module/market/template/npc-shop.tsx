import { BackArrow } from "@/components/button/BackArrow";
import { Background } from "@/components/layout/Background";
import { IMAGE_URLS } from "@/lib/constants/constants";
import { WoodTitle } from "../components/WoodTitle";
import { SpeechBubble } from "../components/SpeechBubble";
import { Modal } from "@/components/modal/Modal";
import { PurchaseModal } from "../components/PurchaseModal";
import NameAndPoint from "@/components/user/NameAndPoint";
import type { StoreItem } from "@/lib/api/market/getStore";
import { CompleteModal } from "../components/CompleteModal";
import SoundButton from "@/components/button/SoundButton";
import { playButtonSound } from "@/lib/utils/sound";
import { NoPointModal } from "@/components/modal/NoPointModal";

interface NpcShopTemplateProps {
  isPurchaseModalOpen: boolean;
  setIsPurchaseModalOpen: (isOpen: boolean) => void;
  productIndex: number;
  selectedProduct: StoreItem | null;
  currentMessage: { text: string; buttonText: string };
  handleSpeechBubbleClick: () => void;
  handleProductClick: (product: StoreItem) => void;
  storeItems: StoreItem[];
  handleBack: () => void;
  handlePurchase: () => void;
  isCompleteOpen: boolean;
  handleComplete: () => void;
  isNoPointModalOpen: boolean;
  setIsNoPointModalOpen: (isOpen: boolean) => void;
  point: number | null;
}

export const NpcShopTemplate = ({
  isPurchaseModalOpen,
  setIsPurchaseModalOpen,
  productIndex,
  selectedProduct,
  currentMessage,
  handleSpeechBubbleClick,
  handleProductClick,
  storeItems,
  handleBack,
  handlePurchase,
  isCompleteOpen,
  handleComplete,
  isNoPointModalOpen,
  setIsNoPointModalOpen,
  point,
}: NpcShopTemplateProps) => {
  return (
    <Background backgroundImage={IMAGE_URLS.market.npc_shop_bg}>
      {/* 구매 모달 */}
      <Modal isOpen={isPurchaseModalOpen}>
        <PurchaseModal
          image={selectedProduct?.imageUrl || ""}
          text={selectedProduct?.name || ""}
          price={selectedProduct?.price || 0}
          onConfirm={handlePurchase}
          onClose={() => setIsPurchaseModalOpen(false)}
        />
      </Modal>
      {/* 구매 완료 모달 */}
      <Modal isOpen={isCompleteOpen} >
        <CompleteModal
          text={`${selectedProduct?.name}을 구매했어요!`}
          price={selectedProduct?.price || 0}
          image={selectedProduct?.imageUrl || ""}
          isOpen={isCompleteOpen}
          onConfirm={handleComplete}
          onClose={handleComplete}
        />
      </Modal>
      {/* 포인트 부족 모달 */}
      <Modal isOpen={isNoPointModalOpen} >
        <NoPointModal
          isOpen={isNoPointModalOpen}
          requiredPoint={selectedProduct?.price || 0}
          currentPoint={point || 0}
          onClose={() => {
            playButtonSound();
            setIsNoPointModalOpen(false);
            setIsPurchaseModalOpen(false);
          }}
        />
      </Modal>
      {/* 뒤로가기 */}
      <BackArrow onClick={handleBack} />
      {/* 음소거 버튼 */}
      <SoundButton /> 
      {/* 이름과 포인트 */}
      <NameAndPoint />
      {/* 제목 */}
      <WoodTitle title="NPC 상점" />
      {/* 말풍선 */}
      <SpeechBubble
        text={currentMessage.text}
        buttonText={currentMessage.buttonText}
        onClick={() => {  
          handleSpeechBubbleClick()
        }}
      />
      {/* 상품 목록 */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-75 flex items-center gap-x-14">
        {storeItems.slice(productIndex * 3, (productIndex + 1) * 3).map((product) => (
          <div
            className="relative active:scale-95 transition-all duration-100"
            key={product.id}
            onClick={() => {
              handleProductClick(product)
            }}
          >
            <img src={IMAGE_URLS.items.dish} alt="dish" className="w-14 h-14 object-contain" />
            <img src={product.imageUrl} alt={product.name} className="w-8 h-8 top-0 left-3.5 absolute object-contain" />
          </div>
        ))}
      </div>
      {/* 가격표 */}
      <div className="absolute bottom-8.5 left-1/2 -translate-x-1/2 w-86 flex items-stretch gap-x-2">
        {storeItems.slice(productIndex * 3, (productIndex + 1) * 3).map((product) => (
          <div
            className="flex flex-col justify-center items-center gap-y-0.5 w-26 px-4 py-1.5 bg-[#F6D8B8] border-2 border-[#97784A] rounded-md min-h-[3.5rem] active:scale-95 transition-all duration-100"
            key={product.name}
            onClick={() => {
              handleProductClick(product)
            }}
          >
            <div className="text-[#6E532C] text-[0.65rem] font-bold">{product.name}</div>
            <div className="flex items-center gap-1">
              <img src={IMAGE_URLS.common.coin} alt="coin" className="w-3.5 h-3.5 object-contain" />
              <div className="text-[0.6rem] text-[#6E532C] font-bold">{product.price}냥</div>
            </div>
          </div>
          )
        )}
      </div>
    </Background>
  );
};
