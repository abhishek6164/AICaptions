const {
    GoogleGenAI
} = require("@google/genai");

// Prefer explicit env var names (check common possibilities)
const geminiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GENERATIVE_API_KEY;
if (!geminiKey) {
    console.error("Missing Gemini/Google API key. Please set GEMINI_API_KEY (or GOOGLE_API_KEY) in your environment.");
}

// Pass apiKey explicitly so SDK uses the provided key
const ai = new GoogleGenAI({
    apiKey: geminiKey
});
console.log("Gemini API Key loaded:", process.env.GEMINI_API_KEY ? "✅ Yes" : "❌ No");

async function generateCaption(base64ImageFile) {
    const contents = [{
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile
            }
        },
        {
            text: "Caption this image."
        },
    ];

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents,
            config: {
                systemInstruction: "You are an expert in generating short, concise social captions using hashtags and emojis.",
            },
        });

        if (!response) return "";
        if (typeof response === "string") return response;
        if (response.text) return response.text;
        if (response.candidates && response.candidates.length) {
            const cand = response.candidates[0];
            if (typeof cand === "string") return cand;
            if (cand && cand.text) return cand.text;
        }

        function findFirstString(obj) {
            if (!obj) return null;
            if (typeof obj === "string" && obj.trim()) return obj.trim();
            if (Array.isArray(obj)) {
                for (const v of obj) {
                    const s = findFirstString(v);
                    if (s) return s;
                }
            } else if (typeof obj === "object") {
                for (const k of Object.keys(obj)) {
                    const s = findFirstString(obj[k]);
                    if (s) return s;
                }
            }
            return null;
        }

        const found = findFirstString(response);
        return found || "";
    } catch (err) {
        console.error("generateCaption error:", err && err.message ? err.message : err);
        return "";
    }
}

module.exports = generateCaption;