import { NpcShopTemplate } from "@/module/market/template/npc-shop";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../../lib/zustand/authStore";
import { playButtonSound, playSound } from "@/lib/utils/sound";
import { getStoreItems, type StoreItem } from "@/lib/api/market/getStore";
import { buyProduct } from "@/lib/api/market/buyProduct";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import NpcShopTTS from "@/assets/sound/tutorial/npc_stop_tts_“오~ 왔구나! 포포 먹이 사러 왔니_”_2025-06-27.wav"


export const TEXT_MESSAGE = {
  not_product: {
    text: "아직 상품이 없어요. \n 다음에 찾아주세요!",
    buttonText: "",
  },
  first_and_last: {
    text: "상점을 구경해봐요!",
    buttonText: "",
  },
  first: {
    text: "더 많은 상품을 보고 싶나요?",
    buttonText: "더보기",
  },
  middle: {
    text: "좋은 물건 많죠? \n 다음 것도 볼래요?",
    buttonText: "더보기",
  },
  last: {
    text: "이제 마지막이에요. 처음부터 \n 보고싶으면 여기를 눌러요!",
    buttonText: "처음으로",
  },
};

export default function NpcShop() {
  const navigate = useNavigate();
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [isNoPointModalOpen, setIsNoPointModalOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);
  const { setPoint, point } = useAuthStore();
  const queryClient = useQueryClient();

  useEffect(() => {
    playSound(NpcShopTTS, 1);
  }, []);

  // 상점 아이템 조회
  const { data: storeItems } = useQuery({
    queryKey: ["store-items", "npc"],
    queryFn: () => getStoreItems("npc"),
  });

  const purchaseMutation = useMutation({
    mutationFn: (productId: string) => buyProduct({ productId, amount: 1 }),
    onSuccess: (response) => {
      setPoint(response.currentPoint);
      setIsCompleteOpen(true);

      // 상점 아이템 캐시 무효화, 모든 캐시 무효화
      queryClient.invalidateQueries({ queryKey: ["inventory-items"], refetchType: "all" });
    },
    onError: (error) => {
      console.error("Failed to buy product", error);
    }
  });

  // 마지막 페이지 인덱스
  const lastIndex = Math.ceil((storeItems?.length || 0) / 3) - 1;
  
  const getMessage = () => {
    if (storeItems?.length === 0) {
      return TEXT_MESSAGE.not_product;
    }
    if (productIndex === 0 && productIndex === lastIndex) {
      return TEXT_MESSAGE.first_and_last;
    }
    if (productIndex === 0) {
      return TEXT_MESSAGE.first;
    }
    if (productIndex === lastIndex) {
      return TEXT_MESSAGE.last;
    } 
    return TEXT_MESSAGE.middle;
  };

  const currentMessage = getMessage();

  const handleSpeechBubbleClick = () => {
    playButtonSound();

    if (currentMessage.buttonText === "더보기") {
      setProductIndex((prev) => prev + 1);
    } else if (currentMessage.buttonText === "처음으로") {
      setProductIndex(0);
    }
  };

  const handleProductClick = (product: StoreItem) => {
    playButtonSound();
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  const handleBack = () => {
    navigate("/market", { state: { from: "npc-shop" } });
  };

  const handlePurchase = async () => {
    playButtonSound();

    if (selectedProduct?.price && point !== null && point >= 0 && selectedProduct.price > point) {
      setIsNoPointModalOpen(true);
      return;
    } 
    
    purchaseMutation.mutate(selectedProduct?.id || "");
  };

  const handleComplete = () => {
    playButtonSound();
    setIsCompleteOpen(false);
    setIsPurchaseModalOpen(false);
  };

  return (
    <NpcShopTemplate
      isPurchaseModalOpen={isPurchaseModalOpen}
      setIsPurchaseModalOpen={setIsPurchaseModalOpen}
      productIndex={productIndex}
      selectedProduct={selectedProduct}
      currentMessage={currentMessage}
      handleSpeechBubbleClick={handleSpeechBubbleClick}
      handleProductClick={handleProductClick}
      storeItems={storeItems || []}
      handleBack={handleBack}
      handlePurchase={handlePurchase}
      isCompleteOpen={isCompleteOpen}
      handleComplete={handleComplete}
      isNoPointModalOpen={isNoPointModalOpen}
      setIsNoPointModalOpen={setIsNoPointModalOpen}
      point={point}
    />
  );
}
