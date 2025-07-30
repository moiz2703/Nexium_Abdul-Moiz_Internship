import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { Database } from '@/types/supabase'
import { NextApiRequest, NextApiResponse } from 'next'

export const getSupabaseServerClient = (req: NextApiRequest, res: NextApiResponse) =>
  createServerSupabaseClient<Database>({ req, res })
