import { boolean, date, integer, pgTable, serial, text, timestamp, uuid } from 'drizzle-orm/pg-core';

// export const user = pgTable('user', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   email: text('email').notNull().unique(),
//   password: text('password').notNull()
// });

export const category = pgTable('category', {
  id: serial('id').primaryKey(), 
  name: text('name').notNull(),
  sub_category: text('sub_category').notNull()
});

export const product = pgTable('products', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  description: text('description').notNull(),
  price: integer('price'),
  category: integer('category')
    .notNull()
    .references(() => category.id, {onDelete: 'cascade'}),
  availableQuantity: integer('availableQuantity'),
  inStock: boolean('inStock').default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date()),
});

export const order = pgTable('order',{
    id: serial('id').primaryKey(),
    order_date: date('order_date'),
    user_id: uuid('user_id').notNull(),
    total_amount: integer('total_amount')
});

export const Orderitem = pgTable('Orderitem',{
    id: serial('id').primaryKey(),
    order_id: integer('order_id')
    .notNull()
    .references(() => order.id, {onDelete: 'cascade'}),
    quantity: integer('quantity').notNull(),
    price: integer('price').notNull(),
    product_id: integer('product_id')
    .notNull()
    .references(() => product.id, {onDelete: 'cascade'})
});

export const cart = pgTable('cart', {
  id: serial('id').primaryKey(),
  userId: uuid('user_id').notNull(),
  productId: integer('product_id').notNull().references(() => product.id),
  quantity: integer('quantity').notNull(),
});

export type InsertPro = typeof product.$inferInsert;
export type SelectPro = typeof product.$inferSelect;

export type InsertOrd = typeof order.$inferInsert;
export type SelectOrd = typeof order.$inferSelect;

export type InsertOrdItm = typeof Orderitem.$inferInsert;
export type SelectOrdItm = typeof Orderitem.$inferSelect;

export type InsertCart = typeof cart.$inferInsert;
export type SelectCart = typeof cart.$inferSelect;