const BACKGROUND_SIZE = {
  xs: {
    width: 360,
    height: 258,
  },
  sm: {
    width: 430,
    height: 300,
  },
  md: {
    width: 615,
    height: 430,
  },
  xl: {
    width: 1180,
    height: 820,
  },
};

const INVESTING_GAME_INITIAL_POINT = {
  LITTLE_PIG: 700,
};

// 그냥 클릭했을때 눌리는 효과 여기에 써둘게
// active:scale-95 transition-all duration-100
// className="active:scale-95 transition-all duration-100"

const IMAGE_URLS = {
  common: {
    coin: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845855/user-coin_nbpwdm",
    name: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845855/user-name_xyiwu8",
    logout:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749847143/logout_dzoadd",
    star: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750391714/star_exp_vldb1o",
    loading_bg: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750392131/moving_bg_sge2uz",
  },
  main: {
    bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749831440/main-background_lviawu",
    popo: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-popo_b21l9f",
    quiz: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845179/main-quiz_y8wptc",
    attendance:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749845179/main-attendance_mgavdh",
    market:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-market_vgxt72",
    diary:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833241/main-diary_g3zxla",
    raising:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-raising_hj1oyq",
    saving:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-saving_afcqna",
    quest:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-quest_z5swuz",
    investing:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1749833259/main-investing_wtfhom",
  },
  market: {
    bg: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/market_bg_j6qlx5",
    popo: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/market_popo_lr9sm4",
    npc_shop:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/market_npc_shop_jn4mox",
    npc_shop_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/npc_shop_bg_twcppj",
    inventory:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/market_inventory_l4fukp",
    inventory_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/inventory_bg_mpmlen",
    parent_shop:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/market_parent_shop_oq0kvo",
    parent_shop_bg:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/parent_shop_bg_el0my1",
    wood_title:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749349063/wood_title_lfdikm",
    wood_title_parent:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/wood_title_parent_jjdjp9",
    modal_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/shop_popo_pai28k",
  },
  items: {
    donut:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/donut_nwgs8g",
    icecream:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/icecream_i4ujjj",
    cookie:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/cookie_wkipjd",
    cheese:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/cheese_hqymu2",
    hamburger:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/hamburger_md6xet",
    carrot:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/carrot_i3xbjj",
    Bungeoppang:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/Bungeoppang_lfkhh8",
    bread:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/bread_nykeqe",
    broccoli:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/broccoli_nmpcqu",
    fish: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/fish_hqsqfs",
    feed2:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/feed2_tdcvbu",
    apple:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/apple_dyzpm6",
    feed: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/feed_ipplbf",
    watermelon:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/watermelon_vrrndc",
    strawberry:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/strawberry_kkh2sv",
    dish: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749382424/dish_pnmiis",
  },
  attandance: {
    circle_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749515991/circle_popo_weqpf5",
    masic_popo:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749515991/masic_popo_sgclsk",
  },
  investing_game: {
    little_pig: {
      little_pig_bg:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_bg_ldqey6",
      little_pig_1:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_1_tkbfmy",
      little_pig_2:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_2_apemg6",
      little_pig_3:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_3_rui4m7",
      little_pig_bulb:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_bulb_ojzwkt",
      little_pig_chart:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_chart_fyizrh",
      little_pig_box:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_box_g5j55l",
      little_siren_pig:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_siren_pig_hb9qdp",
      little_pig_close:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_pig_close_gnyawi",
      little_news_pig:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749914302/little_news_pig_ogynzl",
    },
    truck: {
      truck_bg:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/truck_bg_xseoj4",
      taco_truck:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/taco_truck_i7bcbo",
      sandwich_truck:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/sandwich_truck_h2r7qf",
      icecream_truck:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/icecream_truck_akgqup",
    },
    ninja: {
      ninja_bg:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/ninja_bg_wvm8dt",
      ninja1:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/ninja1_wrrxcv",
      ninja2:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/ninja2_tbpzzb",
      ninja3:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/ninja3_nybk2b",
    },
    masic: {
      masic_bg:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/masic_bg_r3lztv",
      masic_1:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/masic1_welc4w",
      masic_2:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/masic2_zodylg",

      masic_3:
        "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1749913467/masic3_b9xjo9",
    },
  },
  investing: {
    bg: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750022907/investing-bg_pvefqn",
    poni: "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750024423/investing-poni_zrfrbe",
  },

  sound: {
    on: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750222986/sound_ga7lq2",
    off: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750222986/Xsound_q2ec8r",
  },

  quest: {
    modal_popo:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/f_auto,q_auto/v1750166596/quest-modal-popo_l4ldtl",
  },
  raising: {
    apple:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_apple_nvewgu",
    watermelon:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_watermelon_mtkh5k",
    nest: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_nest_gbvvtg",
    fish: "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_fish_b6v2o5",
    character5:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character5_oygkcg",
    character4:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character4_kcscvg",
    character3:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character3_vskzce",
    character2:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character2_sjrocs",
    character1:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_character1_eyjdnq",
    carrot:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_carrot_udhxsx",
    broccoli:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_broccoli_pt0evy",
    bread:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_bread_rjrnm2",
    background:
      "https://res.cloudinary.com/djmcg7zgu/image/upload/f_auto,q_auto/v1750155644/raising_background_nuax5h",
  },

  login: {
    bg: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1750155969/register_background_t1zcbz.png",
  },

  savings: {
    bg: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1750155990/savings_background_bf0hz5.webp",
    star: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1750155990/savings_star_jtuc8d.webp",
    popo: "https://res.cloudinary.com/djmcg7zgu/image/upload/v1750155990/savings_character_ofguqf.webp",
  },

  emotionList: {
    happy:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623811/emotion-happy_b57kwc.webp",
    angry:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623428/emotion-angry_yrpv3l.webp",
    sad: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623512/emotion-sad_ahoplf.webp",
    soso: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623755/emotion-soso_n5tczw.webp",
    love: "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623669/emotion-love_zljlxe.webp",
    embarrassed:
      "https://res.cloudinary.com/dgmbxvpv9/image/upload/v1749623606/emotion-embarrassed_npzyuk.webp",
  },
};

import MainBackgroundMusic from "@/assets/sound/main.mp3";
import LittlePigSound from "@/assets/sound/chapter_1.mp3";
import TruckSound from "@/assets/sound/chapter_2.mp3";
import MasicSound from "@/assets/sound/chapter_3.mp3";
import NinjaSound from "@/assets/sound/chapter_4.mp3";

const SOUND_URLS = {
  main: MainBackgroundMusic,
  little_pig: LittlePigSound,
  truck: TruckSound,
  masic: MasicSound,
  ninja: NinjaSound,
};

export { BACKGROUND_SIZE, INVESTING_GAME_INITIAL_POINT, IMAGE_URLS };

export const emotionList = [{}] as const;