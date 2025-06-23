import { InventoryTemplate } from "@/module/market/template/inventory";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInventory, type InventoryItem } from "@/lib/api/market/getInventory";
import { useProduct } from "@/lib/api/market/useProduct";
import { playButtonSound } from "@/lib/utils/sound";

export const TEXT_MESSAGE = {
  not_product: {
    text: "아직 상품이 없어요. \n 다음에 찾아주세요!",
    buttonText: "",
  },
  first_and_last: {
    text: "창고를 구경해봐요!",
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

export default function Inventory() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [productIndex, setProductIndex] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState<InventoryItem | null>(null);
  const [productList, setProductList] = useState<InventoryItem[]>([]);
  const lastIndex = Math.ceil(productList.length / 3) - 1;

  useEffect(() => {
    getInventory().then((items) => {
      setProductList(items);
    });
  }, []);

  const getMessage = () => {
    if (productList.length === 0) {
      return TEXT_MESSAGE.not_product;
    }
    if (productIndex === 0 && lastIndex === 0) {
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
    if (productIndex === lastIndex) {
      return setProductIndex(0);
    }
    if (currentMessage.buttonText === "더보기") {
      setProductIndex((prev) => prev + 1);
    } else if (currentMessage.buttonText === "처음으로") {
      setProductIndex(0);
    }
  };

  const handleProductClick = (product: InventoryItem) => {
    playButtonSound();
    setSelectedProduct(product);
    setIsOpen(true);
  };

  const handleBack = () => {
    navigate("/market", { state: { from: "inventory" } });
  };

  const handleUseProduct = (exp?: number) => {
    playButtonSound();
    if (exp && exp > 0) {
      setIsOpen(false);
      navigate("/raising", { state: { from: "inventory" } });

      return; 
    }
    console.log("selectedProduct", selectedProduct);
    useProduct({ productId: selectedProduct?.productId || "" });
    setIsOpen(false);
  };

  return (
    <InventoryTemplate
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      productList={productList}
      productIndex={productIndex}
      selectedProduct={selectedProduct}
      currentMessage={currentMessage}
      handleSpeechBubbleClick={handleSpeechBubbleClick}
      handleProductClick={handleProductClick}
      handleBack={handleBack}
      handleUseProduct={handleUseProduct}
    />
  );
}
