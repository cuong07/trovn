import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_APP_GEMINI_AI_KEY);

export const generateDescription = async () => {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt =
        "tôi muốn tạo một đoạn mô tả dài 500 chữ bằng html chỉ trong thẻ body giới thiệu phòng trọ không cần giải thích chỉ html không cần hình ảnh không cần giải thích tương tự  ";
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    return text;
};
