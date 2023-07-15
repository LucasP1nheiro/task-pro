import { NewTask } from '@/db/schema'
import { create } from 'zustand'

type State = NewTask

type Actions = {
  updateTitle: (title: State['title']) => void
  updateDescription: (description: State['description']) => void
  updatePriority: (priority: State['priority']) => void
  updateStatus: (status: State['status']) => void
  updateExpiresAt: (expiresAt: State['expiresAt']) => void
  updateCategoryId: (categoryId: State['categoryId']) => void
}

export const useTaskStore = create<State & Actions>((set) => ({
  title: '',
  userId: 0,
  categoryId: 0,
  updateTitle: (title) => set(() => ({ title })),
  updateDescription: (description) => set(() => ({ description })),
  updatePriority: (priority) => set(() => ({ priority })),
  updateStatus: (status) => set(() => ({ status })),
  updateExpiresAt: (expiresAt) => set(() => ({ expiresAt })),
  updateCategoryId: (categoryId) => set(() => ({ categoryId })),
}))
