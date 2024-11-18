"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cart = exports.Orderitem = exports.order = exports.product = exports.category = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
// export const user = pgTable('user', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   email: text('email').notNull().unique(),
//   password: text('password').notNull()
// });
exports.category = (0, pg_core_1.pgTable)('category', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    sub_category: (0, pg_core_1.text)('sub_category').notNull()
});
exports.product = (0, pg_core_1.pgTable)('products', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    name: (0, pg_core_1.text)('name').notNull(),
    description: (0, pg_core_1.text)('description').notNull(),
    price: (0, pg_core_1.integer)('price'),
    category: (0, pg_core_1.integer)('category')
        .notNull()
        .references(() => exports.category.id, { onDelete: 'cascade' }),
    availableQuantity: (0, pg_core_1.integer)('availableQuantity'),
    inStock: (0, pg_core_1.boolean)('inStock').default(false),
    createdAt: (0, pg_core_1.timestamp)('created_at').notNull().defaultNow(),
    updatedAt: (0, pg_core_1.timestamp)('updated_at')
        .notNull()
        .$onUpdate(() => new Date()),
});
exports.order = (0, pg_core_1.pgTable)('order', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    order_date: (0, pg_core_1.date)('order_date'),
    user_id: (0, pg_core_1.uuid)('user_id').notNull(),
    total_amount: (0, pg_core_1.integer)('total_amount')
});
exports.Orderitem = (0, pg_core_1.pgTable)('Orderitem', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    order_id: (0, pg_core_1.integer)('order_id')
        .notNull()
        .references(() => exports.order.id, { onDelete: 'cascade' }),
    quantity: (0, pg_core_1.integer)('quantity').notNull(),
    price: (0, pg_core_1.integer)('price').notNull(),
    product_id: (0, pg_core_1.integer)('product_id')
        .notNull()
        .references(() => exports.product.id, { onDelete: 'cascade' })
});
exports.cart = (0, pg_core_1.pgTable)('cart', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    userId: (0, pg_core_1.uuid)('user_id').notNull(),
    productId: (0, pg_core_1.integer)('product_id').notNull().references(() => exports.product.id),
    quantity: (0, pg_core_1.integer)('quantity').notNull(),
});
