import { NpcShopTemplate } from "@/module/market/template/npc-shop";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getStoreItems, type StoreItem } from "@/lib/api/market/getStore";
import { buyProduct } from "@/lib/api/market/buyProduct";
import { useAuthStore } from "../../../lib/zustand/store";
import { playButtonSound } from "@/lib/utils/sound";

export const TEXT_MESSAGE = {
  not_product: {
    text: "아직 상품이 없어요. \n 다음에 찾아주세요!",
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
  const [isOpen, setIsOpen] = useState(false);
  const [isCompleteOpen, setIsCompleteOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [storeItems, setStoreItems] = useState<StoreItem[]>([]);
  const lastIndex = Math.ceil(storeItems.length / 3) - 1;
  const [selectedProduct, setSelectedProduct] = useState<StoreItem | null>(null);
  const { setPoint } = useAuthStore();
  useEffect(() => {
    getStoreItems("npc").then((items) => {
      setStoreItems(items);
    });
  }, []);

  const getMessage = () => {
    if (storeItems.length === 0) {
      return TEXT_MESSAGE.not_product;
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
    setIsOpen(true);
  };

  const handleBack = () => {
    navigate("/market", { state: { from: "npc-shop" } });
  };

  const handlePurchase = async () => {
    playButtonSound();
    try {
      const response = await buyProduct({ productId: selectedProduct?.id || "", amount: 1 });
      setPoint(response.currentPoint);
      setIsCompleteOpen(true);
    } catch (error) {
      console.error("Failed to buy product", error);
    }
  };

  const handleComplete = () => {
    playButtonSound();
    setIsCompleteOpen(false);
    setIsOpen(false);
  };

  return (
    <NpcShopTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      productIndex={productIndex}
      selectedProduct={selectedProduct}
      currentMessage={currentMessage}
      handleSpeechBubbleClick={handleSpeechBubbleClick}
      handleProductClick={handleProductClick}
      product_list={storeItems}
      handleBack={handleBack}
      handlePurchase={handlePurchase}
      isCompleteOpen={isCompleteOpen}
      handleComplete={handleComplete}
    />
  );
}
