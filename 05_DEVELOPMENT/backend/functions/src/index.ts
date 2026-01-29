import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import puppeteer from "puppeteer";

admin.initializeApp();

// Robot: Product Scraper API (Real logic skeleton)
export const analyzeProduct = functions.https.onCall(async (data, context) => {
    if (!context.auth) {
        throw new functions.https.HttpsError("unauthenticated", "Auth required.");
    }

    const { url } = data;
    if (!url) {
        throw new functions.https.HttpsError("invalid-argument", "URL is required.");
    }

    let browser;
    try {
        browser = await puppeteer.launch({
            args: ["--no-sandbox", "--disable-setuid-sandbox"],
        });
        const page = await browser.newPage();

        // Set user agent to avoid basic blocks
        await page.setUserAgent("Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36");

        await page.goto(url, { waitUntil: "networkidle2" });

        let productData = {
            title: "",
            price: 0,
            currency: "TRY",
            image: "",
            url: url
        };

        if (url.includes("trendyol.com")) {
            productData.title = await page.$eval(".pr-new-br span", el => el.textContent?.trim() || "");
            const priceText = await page.$eval(".prc-dsc", el => el.textContent?.trim() || "0");
            productData.price = parseFloat(priceText.replace(/[^\d,.]/g, "").replace(",", "."));
            productData.image = await page.$eval(".base-product-image img", el => (el as HTMLImageElement).src);
        } else if (url.includes("amazon.com")) {
            productData.title = await page.$eval("#productTitle", el => el.textContent?.trim() || "");
            const priceText = await page.$eval(".a-price-whole", el => el.textContent?.trim() || "0");
            productData.price = parseFloat(priceText.replace(/[^\d,.]/g, "").replace(",", "."));
            productData.image = await page.$eval("#landingImage", el => (el as HTMLImageElement).src);
        }

        await browser.close();

        return {
            success: true,
            data: productData
        };
    } catch (error: any) {
        if (browser) await browser.close();
        console.error("Scraping error:", error);
        throw new functions.https.HttpsError("internal", "Failed to scrape product data.");
    }
});

// Fiko: Motivation Engine API
export const getFikoMessage = functions.https.onCall(async (data, context) => {
    const { trigger } = data;

    // Custom logic for different triggers
    const messages: Record<string, string> = {
        "onboarding": "Harika bir başlangıç! Ben Fiko, senin biriktirme arkadaşınım.",
        "add_money": "Kumbaraya bir fındık daha! Hedefine biraz daha yaklaştın.",
        "milestone_50": "Yolun yarısı bitti bile! Sen çok kararlısın.",
        "streak_7": "Tam 7 gündür fındık biriktiriyorsun! Gerçek bir kahramansın."
    };

    return {
        character: "fiko",
        message: messages[trigger] || "Devam et, her adım seni hedefine yaklaştırır! 🌰"
    };
});
