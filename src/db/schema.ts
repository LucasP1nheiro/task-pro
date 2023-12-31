import { InferModel, relations } from 'drizzle-orm'
import {
  serial,
  text,
  timestamp,
  mysqlTable,
  varchar,
  int,
  datetime,
  index,
  uniqueIndex,
} from 'drizzle-orm/mysql-core'
import { db } from '.'

export const accounts = mysqlTable(
  'accounts',
  {
    id: varchar('id', { length: 191 }).primaryKey().notNull(),
    userId: varchar('userId', { length: 191 }).notNull(),
    type: varchar('type', { length: 191 }).notNull(),
    provider: varchar('provider', { length: 191 }).notNull(),
    providerAccountId: varchar('providerAccountId', { length: 191 }).notNull(),
    access_token: text('access_token'),
    expires_in: int('expires_in'),
    id_token: text('id_token'),
    refresh_token: text('refresh_token'),
    refresh_token_expires_in: int('refresh_token_expires_in'),
    scope: varchar('scope', { length: 191 }),
    token_type: varchar('token_type', { length: 191 }),
    createdAt: timestamp('createdAt').defaultNow().notNull(),
    updatedAt: timestamp('updatedAt').defaultNow().onUpdateNow().notNull(),
  },
  (account) => ({
    providerProviderAccountIdIndex: uniqueIndex(
      'accounts__provider__providerAccountId__idx',
    ).on(account.provider, account.providerAccountId),
    userIdIndex: index('accounts__userId__idx').on(account.userId),
  }),
)

export const sessions = mysqlTable(
  'sessions',
  {
    id: varchar('id', { length: 191 }).primaryKey().notNull(),
    sessionToken: varchar('sessionToken', { length: 191 }).notNull(),
    userId: varchar('userId', { length: 191 }).notNull(),
    expires: datetime('expires').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (session) => ({
    sessionTokenIndex: uniqueIndex('sessions__sessionToken__idx').on(
      session.sessionToken,
    ),
    userIdIndex: index('sessions__userId__idx').on(session.userId),
  }),
)

export const users = mysqlTable(
  'users',
  {
    id: varchar('id', { length: 191 }).primaryKey().notNull(),
    name: varchar('name', { length: 191 }),
    email: varchar('email', { length: 191 }).notNull(),
    emailVerified: timestamp('emailVerified'),
    image: varchar('image', { length: 191 }),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (users) => ({
    emailIndex: uniqueIndex('users__email__idx').on(users.email),
  }),
)

export const verificationTokens = mysqlTable(
  'verification_tokens',
  {
    identifier: varchar('identifier', { length: 191 }).primaryKey().notNull(),
    token: varchar('token', { length: 191 }).notNull(),
    expires: datetime('expires').notNull(),
    created_at: timestamp('created_at').notNull().defaultNow(),
    updated_at: timestamp('updated_at').notNull().defaultNow().onUpdateNow(),
  },
  (verificationToken) => ({
    tokenIndex: uniqueIndex('verification_tokens__token__idx').on(
      verificationToken.token,
    ),
  }),
)

export type User = InferModel<typeof users>

export type NewUser = InferModel<typeof users, 'insert'>

export const userRelations = relations(users, ({ many }) => ({
  tasks: many(task),
  categories: many(category),
}))

export const category = mysqlTable('category', {
  id: serial('id').primaryKey().autoincrement().notNull(),
  name: text('name').notNull(),
  userId: varchar('userId', { length: 191 }).notNull(),
})

export type Category = InferModel<typeof category>
export type NewCategory = InferModel<typeof category, 'insert'>

export const categoryRelations = relations(category, ({ many, one }) => ({
  tasks: many(task),
  user: one(users, { fields: [category.userId], references: [users.id] }),
}))

export const task = mysqlTable('task', {
  id: serial('id').primaryKey().autoincrement().notNull(),
  title: varchar('title', { length: 21 }).notNull(),
  description: text('description'),
  priority: text('priority').$type<'low' | 'medium' | 'high'>(),
  status: text('status').$type<'todo' | 'in progress' | 'completed'>(),
  createdAt: timestamp('created_at').defaultNow(),
  expiresAt: timestamp('expires_at'),
  userId: varchar('userId', { length: 191 }).notNull(),
  categoryId: int('categoryId').notNull(),
})

export type Task = InferModel<typeof task>
export type NewTask = InferModel<typeof task, 'insert'>

export const taskRelations = relations(task, ({ one }) => ({
  user: one(users, { fields: [task.userId], references: [users.id] }),
  category: one(category, {
    fields: [task.categoryId],
    references: [category.id],
  }),
}))

export const insertCategory = async (cat: NewCategory) => {
  return db.insert(category).values(cat)
}
