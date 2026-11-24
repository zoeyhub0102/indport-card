// 好口國際 LINE 電子名片 — 共用設定
// 要改資料：改 DEFAULTS；要改服務項目：改 SERVICES。改完上傳這個檔案即可。

const LIFF_ID = "2012778268-Og4OqcYs";

const NAVY = "#005491";
const LIGHT = "#BFD3EB";

const DEFAULTS = {
  name: "李依柔",
  en: "Zoey Li",
  title: "市場部經理",
  title_en: "Market Development Manager",
  phone: "+886955652299",
  email: "zoey.kindport@gmail.com",
  company: "好口國際有限公司",
  company_en: "Kind Port International Limited",
};

const SERVICES = [
  ["台灣品牌出口代理", "對接海外經銷商與通路，協助報價、訂單與出口流程，主攻日本、香港、新加坡、馬來西亞"],
  ["電商代營運", "台灣及海外市場的品牌官網與電商平台營運，含商品上架、廣告投放與社群行銷"],
  ["品牌營運顧問", "協助成長期品牌規劃採購、定價策略與日常營運流程"],
];

// 網址參數中可用的欄位（card=simple 代表簡易版，不顯示服務項目）
const KEYS = ["card", "name", "en", "title", "title_en", "phone", "email", "company", "company_en"];

function displayPhone(p) {
  const d = p.replace(/[^\d]/g, "").replace(/^886/, "0");
  return d.length === 10 ? `${d.slice(0, 4)}-${d.slice(4, 7)}-${d.slice(7)}` : p;
}

// 從網址取出名片欄位（會處理 LIFF 自動加上的 liff.state）
function readParams() {
  let search = location.search;
  const raw = new URLSearchParams(search);
  const state = raw.get("liff.state");
  if (state) search = state.includes("?") ? state.slice(state.indexOf("?")) : "";
  const all = new URLSearchParams(search);
  const clean = {};
  KEYS.forEach((k) => { if (all.get(k)) clean[k] = all.get(k); });
  return clean;
}

function toQuery(obj) {
  const s = new URLSearchParams(obj).toString();
  return s ? "?" + s : "";
}

// LINE 聊天室裡看到的精簡卡片
function buildMessage(params, baseUrl) {
  const i = { ...DEFAULTS, ...params };
  const viewUrl = new URL("view.html", baseUrl).href + toQuery(params);
  return {
    type: "flex",
    altText: `${i.name} ${i.en}｜KIND PORT ${i.title}`,
    contents: {
      type: "bubble",
      size: "mega",
      hero: {
        type: "image", url: new URL("hero.jpg", baseUrl).href,
        size: "full", aspectRatio: "1.6:1", aspectMode: "cover",
        action: { type: "uri", label: "open", uri: viewUrl },
      },
      body: {
        type: "box", layout: "vertical", paddingAll: "20px", paddingBottom: "8px",
        contents: [
          {
            type: "box", layout: "baseline", spacing: "md",
            contents: [
              { type: "text", text: i.name, size: "xxl", weight: "bold", color: NAVY, flex: 0 },
              { type: "text", text: i.en, size: "lg", weight: "bold", color: NAVY, flex: 0 },
            ],
          },
          { type: "text", text: `${i.title}・${i.company}`, size: "md", color: "#5A7FA3", margin: "sm", wrap: true },
        ],
      },
      footer: {
        type: "box", layout: "vertical", paddingAll: "16px", paddingTop: "8px",
        contents: [{
          type: "button", style: "primary", color: NAVY, height: "md",
          action: { type: "uri", label: "開啟電子名片", uri: viewUrl },
        }],
      },
    },
  };
}

if (typeof module !== "undefined") module.exports = { buildMessage, DEFAULTS, SERVICES };
