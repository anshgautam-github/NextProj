import { z } from 'zod'

export const signInSchema = z.object({
  identifier: z.string(),       //identifier -> here means username
  password: z.string(),
});
