import { z } from 'zod'

export const CategoryValidator = z.object({
  name: z.string().min(3).max(21),
})

export type CreateCategoryPayload = z.infer<typeof CategoryValidator>
