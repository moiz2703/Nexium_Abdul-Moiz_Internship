import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from '@/lib/mongoClient'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { url, fullContent } = req.body

  if (!url || !fullContent) {
    return res.status(400).json({ error: 'Missing url or fullContent in request body' })
  }

  try {
    const client = await clientPromise
    const db = client.db('blogData')  // Database name
    const collection = db.collection('fullContents') // Collection name
    const existing = await collection.findOne({ url })

    if (existing) {
      return res.status(200).json({ message: 'Content already saved for this URL.' })
    }

    const result = await collection.insertOne({
      url,
      fullContent,
      createdAt: new Date()
    })

    console.log('Full content saved to MongoDB:', {
        url,
        length: fullContent.length,
        insertedId: result.insertedId
    })

    return res.status(200).json({ message: 'Full content saved.', id: result.insertedId })
  } catch (error) {
    console.error('MongoDB Insert Error:', error)
    return res.status(500).json({ error: 'Failed to save full content to MongoDB.' })
  }
}
