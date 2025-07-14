import type { NextApiRequest, NextApiResponse } from 'next';
import { chromium } from 'playwright';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ userAgent: 'Mozilla/5.0' });
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });

    const text = await page.$$eval('p', (ps: Element[]) =>
        ps.map((p: Element) => (p as HTMLElement).innerText.trim())
            .filter(p => p.length > 0)
            .join('\n\n')
        );


    await browser.close();
    return res.status(200).json({ fullText: text || 'No paragraph text found.' });
  } catch (err: any) {
    console.error('Scraper error:', err);
    return res.status(500).json({ error: 'Failed to scrape URL.', details: err.message });
  }
}
