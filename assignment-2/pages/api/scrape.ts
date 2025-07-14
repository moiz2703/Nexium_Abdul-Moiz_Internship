import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
import * as cheerio from 'cheerio'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url } = req.body
  if (!url) {
    return res.status(400).json({ error: 'No URL provided' })
  }

  try {
    const { data: html } = await axios.get(url)
    const $ = cheerio.load(html)
    const paragraphs: string[] = []

    $('p').each((_, el) => {
      paragraphs.push($(el).text().trim())
    })

    res.status(200).json({ fullText: paragraphs.join('\n\n') })
  } catch (err: unknown) {
      if (err instanceof Error) {
        console.error('Scraping error:', err.message);
      } else {
        console.error('Scraping error:', err);
      }
   }

}
