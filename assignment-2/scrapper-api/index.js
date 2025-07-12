const express = require('express');
const { chromium } = require('playwright');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/scrape', async (req, res) => {
  const { url } = req.body;
  if (!url) return res.status(400).json({ error: 'No URL provided' });

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ userAgent: 'Mozilla/5.0' });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    // Extract all paragraph text
    const text = await page.$$eval('p', ps =>
      ps.map(p => p.innerText.trim()).filter(p => p.length > 0).join('\n\n')
    );

    await browser.close();
    res.json({ fullText: text || 'No paragraph text found.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to scrape URL.', details: err.message });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✅ Scraper API running on http://localhost:${PORT}`);
});
