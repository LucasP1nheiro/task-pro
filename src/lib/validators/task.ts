import { z } from 'zod'

const PriorityEnum = z.union([
  z.literal('low'),
  z.literal('medium'),
  z.literal('high'),
  z.literal(null),
  z.literal(undefined),
])

const DescriptionEnum = z.union([
  z.string(),
  z.literal(null),
  z.literal(undefined),
])

const today = new Date()

const yesterday = new Date(today.setDate(today.getDate() - 1))

const isDateAfterToday = (date: Date) => date > yesterday

const ExpiresAtEnum = z.union([
  z.coerce.date().refine(isDateAfterToday, {
    message: 'Picking a past date is forbbiden',
  }),
  z.literal(null),
  z.literal(undefined),
])

export const TaskValidator = z.object({
  title: z.string().min(3).max(21),
  description: DescriptionEnum.optional().nullable(),
  categoryId: z.number(),
  priority: PriorityEnum.optional().nullable(),
  expiresAt: ExpiresAtEnum.optional().nullable(),
})

export type CreateTaskPayload = z.infer<typeof TaskValidator>
