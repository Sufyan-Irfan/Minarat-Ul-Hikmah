const mongoose = require("mongoose")
const {Schema} = mongoose

const fatwaSchema = new Schema({
    heading: {
      type: String,
      required: true,
    },
    question: {
      type: String,
      required: true,
    },
    questionLanguage: {
      type: String,
      enum: ["urdu", "arabic"],
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    answerLanguage: {
      type: String,
      enum: ["urdu", "arabic"],
      required: true,
    },
    references: {
      type: [
        [
          {
            text: {
              type: String,
              required: true,
            },
            language: {
              type: String,
              enum: ["urdu", "arabic"],
              required: true,
            },
          },
        ],
      ],
      required: true,
    },
    source: {
      type: String,
      default: null,
    },
    category: {
      type: String,
      enum: ["prayer", "fast", "zakat", "hajj", "other"], // Example categories
      required: true,
  },
  });

  async function insertfatawas() {
    const fatawa = [
        {
            heading: "شک کی وجہ سے بار بار وضو کرنا",
            question: "میں ایک نماز میں دس دس مرتبہ وضو کرتا ہوں، مجھے اپنے اوپر یقین نہیں آتا کہ میرا وضو ٹوٹا ہے یا نہیں، میں ان وسوسوں میں بار بار وضو کر تا رہتا ہوں ،مجھے اپنے اوپر شک ہی رہتا ہے کہ وضو ٹوٹ گیا ہے۔ آپ مجھے بتائیے کہ میں کیا کروں ؟",
            questionlanguage: urdu,
            answer: "جب آپ ایک مرتبہ وضو کر لیں تو جب تک وضو ٹوٹنے کا یقین نہ ہو تو وسوسوں کی وجہ سے ہر گز وضو نہ کریں کہ محض شک وشبہ سے وضو نہیں ٹوٹتا۔ اور ایسی صورت میں احتیاطاً وضو کر لینا احتیاط نہیں بلکہ شیطان مردود کی اطاعت ہے جس کی ممانعت وارد ہے۔",
            answerlanguage: "urdu",
            references: [
            {
                text: "لا تتبعوا خطوات الشيطان (سورۃ البقرۃ: 208)",
                language: "arabic",
            },
            {
                text: "لا ينصرف حتى يسمع صوتاً، أو يجد ريحاً (صحیح حدیث)",
                language: "arabic",
            }
            ],
            source: "Islamic Book XYZ",
            category: "prayer",
        },
    ]  
  }

  const Fatwa = mongoose.model('fatwa' , Userschema)
  module.exports = Fatwa
