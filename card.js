// 好口國際 LINE 電子名片 — Flex Message 產生器
// 改資料：直接改 DEFAULTS，或在網址後面加參數，例如 ?name=王小明&title=業務經理&phone=0912345678
const NAVY = "#024D87";
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

function displayPhone(p) {
  // +886955652299 → 0955-652-299
  const d = p.replace(/[^\d]/g, "").replace(/^886/, "0");
  return d.length === 10 ? `${d.slice(0, 4)}-${d.slice(4, 7)}-${d.slice(7)}` : p;
}

function buildCard(info, baseUrl, shareUrl) {
  const i = { ...DEFAULTS, ...info };
  const img = (f) => new URL(f, baseUrl).href;

  const btn = (label, uri, primary) => ({
    type: "button",
    style: primary ? "primary" : "link",
    color: primary ? NAVY : undefined,
    height: "sm",
    action: { type: "uri", label, uri },
  });

  const bubble1 = {
    type: "bubble",
    size: "mega",
    hero: {
      type: "image", url: img("hero.jpg"), size: "full",
      aspectRatio: "16:10", aspectMode: "cover",
    },
    body: {
      type: "box", layout: "vertical", paddingAll: "20px", spacing: "sm",
      contents: [
        { type: "text", text: i.company, size: "xs", color: NAVY, weight: "bold" },
        { type: "separator", margin: "md", color: LIGHT },
        { type: "text", text: i.title, size: "sm", color: NAVY, margin: "lg" },
        { type: "text", text: i.title_en, size: "xxs", color: "#5B7FA6" },
        {
          type: "box", layout: "baseline", spacing: "sm", margin: "sm",
          contents: [
            { type: "text", text: i.name, size: "xxl", weight: "bold", color: NAVY, flex: 0 },
            { type: "text", text: i.en, size: "md", weight: "bold", color: NAVY, flex: 0 },
          ],
        },
        { type: "text", text: displayPhone(i.phone), size: "sm", color: NAVY, margin: "md" },
        { type: "text", text: i.email, size: "sm", color: NAVY },
        { type: "box", layout: "vertical", height: "70px", contents: [] }, // 留白給海浪
        {
          type: "box", layout: "vertical", position: "absolute",
          offsetEnd: "0px", offsetBottom: "0px", width: "50%",
          contents: [{ type: "image", url: img("wave.png"), size: "full", aspectRatio: "474:200", aspectMode: "fit" }],
        },
      ],
    },
    footer: {
      type: "box", layout: "vertical", spacing: "xs", paddingAll: "12px",
      contents: [
        btn("撥打電話", `tel:${i.phone}`, true),
        btn("寄送 Email", `mailto:${i.email}`),
        btn("轉傳這張名片", shareUrl),
      ],
    },
  };

  const service = (t, d) => ({
    type: "box", layout: "vertical", margin: "lg",
    contents: [
      { type: "text", text: t, size: "sm", weight: "bold", color: "#FFFFFF" },
      { type: "text", text: d, size: "xs", color: LIGHT, wrap: true },
    ],
  });

  const bubble2 = {
    type: "bubble",
    size: "mega",
    styles: { body: { backgroundColor: NAVY }, footer: { backgroundColor: NAVY } },
    body: {
      type: "box", layout: "vertical", paddingAll: "22px",
      contents: [
        { type: "text", text: "KIND PORT", size: "xs", color: LIGHT, weight: "bold" },
        { type: "text", text: "服務項目", size: "xl", weight: "bold", color: "#FFFFFF", margin: "sm" },
        service("台灣品牌出口代理", "對接海外經銷商與通路，協助報價、訂單與出口流程，主攻日本、香港、新加坡、馬來西亞"),
        service("電商代營運", "台灣及海外市場的品牌官網與電商平台營運，含商品上架、廣告投放與社群行銷"),
        service("品牌營運顧問", "協助成長期品牌規劃採購、定價策略與日常營運流程"),
      ],
    },
    footer: {
      type: "box", layout: "vertical", paddingAll: "12px",
      contents: [{
        type: "button", style: "secondary", color: "#FFFFFF", height: "sm",
        action: { type: "uri", label: "合作洽詢", uri: `mailto:${i.email}?subject=${encodeURIComponent("合作洽詢")}` },
      }],
    },
  };

  // ?card=simple → 只有名片資訊；其他 → 名片＋服務項目
  const simple = i.card === "simple";
  return {
    type: "flex",
    altText: `${i.name}｜${i.company} 的電子名片`,
    contents: simple ? bubble1 : { type: "carousel", contents: [bubble1, bubble2] },
  };
}

if (typeof module !== "undefined") module.exports = { buildCard, DEFAULTS };
