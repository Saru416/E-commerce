import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/userSlice.js'
import productReducer from './slice/productSlice.js'
import categoryReducer from './slice/categorySlice.js'

export default configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    category: categoryReducer,
  },
})