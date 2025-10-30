
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './reducers/reducer'

const store = configureStore({
  reducer: counterReducer
})

export default store

