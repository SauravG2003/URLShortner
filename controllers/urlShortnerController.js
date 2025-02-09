import shortid from "shortid";
import isURL from "validator/lib/isURL.js"; 
import URL from "../models/url.js"; 

export async function urlController(req, res) {
    const { originalURL } = req.body;

    // ✅ Validate URL format
    if (!isURL(originalURL)) {
        return res.status(400).json({ error: "Invalid URL format" });
    }

    try {
        const shortURL = shortid.generate();

        // ✅ Save the short URL in the database
        const newURL = new URL({ originalUrl: originalURL, shortUrl: shortURL });
        await newURL.save();

        res.json({ shortURL });
    } catch (error) {
        console.error("Error saving URL:", error);
        res.status(500).json({ error: "Server error, could not save URL" });
    }
}

export async function redirectController(req, res) {
    try {
        const { shortURL } = req.params;

       
        const urlEntry = await URL.findOne({ shortUrl: shortURL });

        if (!urlEntry) {
            return res.status(404).json({ error: "No such URL is present" });
        }

       
        // if (!Array.isArray(urlEntry.visitedAtShortUrl)) {
        //     urlEntry.visitedAtShortUrl = [];
        // }

       
        urlEntry.clickCount += 1;
        urlEntry.visitedAtShortUrl.push({
            timestamp: new Date(),
            clicks: urlEntry.clickCount
        });

        await urlEntry.save();

        
        res.redirect(urlEntry.originalUrl);
    } catch (error) {
        console.error("Error in redirectController:", error);
        res.status(500).json({ message: "Some error occurred" });
    }
}

export async function dataController(req, res) {
    const { shortURL } = req.params;
    try {
        const urlEntry = await URL.findOne({ shortUrl: shortURL });

        if (!urlEntry) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json({
            originalUrl: urlEntry.originalUrl,
            clickCount: urlEntry.clickCount
        });
    } catch (error) {
        console.error("Error fetching URL data:", error);
        res.status(500).json({ message: "Error occurred" });
    }
}