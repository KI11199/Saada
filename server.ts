import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini AI Client
let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('GEMINI_API_KEY environment variable is missing.');
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: 'Saadah Natural Products' });
});

// AI Botanical Hair Care Advisor endpoint with High Thinking
app.post('/api/gemini/consult', async (req, res) => {
  try {
    const { query, language = 'ar', contextProduct } = req.body;

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'Query parameter is required.' });
      return;
    }

    let ai: GoogleGenAI;
    try {
      ai = getGeminiClient();
    } catch {
      // Fallback response if API key is not configured
      const fallbackMsg = language === 'ar'
        ? 'أهلاً بكِ في سعادة للمنتجات الطبيعية! ننصح دائماً بعمل اختبار حساسية قبل الاستخدام. لأصحاب الفروة الدهنية، السدر السعودي هو الخيار الأفضل كبديل طبيعي للشامبو، بينما الحناء مع الزبادي وزيت جوز الهند تمنح ترطيباً ولمعاناً لا مثيل له. مسحوق نواة التمر مثالي لإنبات الفراغات عند نقعه مع زيت الزيتون، والمشاط الأحمر يعطر ويكثف الشعر. لا تترددي في التواصل مع مستشارينا مباشرة عبر واتساب!'
        : 'Welcome to Saadah Botanical Hair Care! We always advise doing a patch test before first use. For oily scalp and dandruff, pure Saudi Sidr is your premier shampoo alternative. Henna mixed with yogurt or coconut oil yields supreme shine and strength. Roasted Date Seed powder excels in follicle rejuvenation, and Red Mshat enriches thickness and fragrance. Chat directly with us on WhatsApp for bespoke orders!';

      res.json({
        advice: fallbackMsg,
        modelUsed: 'fallback',
      });
      return;
    }

    const systemInstruction = `You are "Saadah's Master Botanical Hair Care & Herbal Specialist" (خبيرة الأعشاب والعناية الطبيعية بعلامة سعادة للمنتجات الطبيعية).
Brand Philosophy: Saadah produces 100% pure, organic, chemical-free (0% PPD, 0% parabens, 0% sulfates, 0% metallic salts) hair care products packaged in eco-friendly recyclable kraft pouches.
Saadah's core products:
1. Pure Natural Henna (حناء طبيعية): Fortifies root bulbs, seals hair cuticles, imparts brilliant sheen, reduces dandruff. Mix with warm herbal water/tea, yogurt, or coconut oil. Ferment 4-6 hours.
2. Mountain Saudi Sidr (سدر سعودي): Natural foaming plant saponins, deep scalp detox, eliminates excess sebum & dandruff from 1st use, promotes volume and density without stripping natural oils. Safe for color-treated hair (does not change dye).
3. Traditional Red Mshat (مشاط أحمر): Heritage blend of wild mahlab, damask rose, cloves, sandalwood, lavender, and botanical musk. Stimulates blood circulation, thickens follicles, gives long-lasting aromatic scent. Mix with sweet almond or argan oil.
4. Roasted Medina Date Seed Powder (نواة تمر المدينة المحمصة): Rich in Vitamin E, polyphenols, essential fatty acids. Great as infused hair oil, daily water spray tonic for thinning edges, or mask booster.
5. Saadah Complete Ritual Box: Comprehensive holistic care box with wooden spoon & applicator kit.

Important Guidelines:
- Respond in the user's requested language (${language === 'ar' ? 'Arabic (العربية)' : 'English'}).
- Use a warm, mindful, elegant, and expert tone.
- Emphasize safety: always mention the 24-hour patch test before trying any new botanical herb.
- Mention compatibility notes (e.g., Sidr and Date Seed are 100% safe for bleached/dyed hair, while Henna should be tested on a strand first or delayed 4-6 weeks after chemical dyes).
- Keep the response well-structured with bullet points, precise recipe ratios (e.g., spoons, warm water, resting time), and actionable steps.
- Conclude with a warm encouragement.`;

    const promptText = contextProduct
      ? `User question: "${query}" (The user is specifically asking in the context of the product: ${JSON.stringify(contextProduct)})`
      : `User question: "${query}"`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-pro-preview',
      contents: promptText,
      config: {
        systemInstruction,
        thinkingConfig: {
          thinkingLevel: ThinkingLevel.HIGH,
        },
      },
    });

    const advice = response.text || '';
    res.json({ advice, modelUsed: 'gemini-3.1-pro-preview' });
  } catch (err: unknown) {
    console.error('Error generating AI advice:', err);
    res.status(500).json({
      error: 'Failed to generate botanical advice.',
      details: err instanceof Error ? err.message : String(err),
    });
  }
});

// Vite Integration
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Saadah Store Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
