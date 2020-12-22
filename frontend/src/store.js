import {createStore} from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from './reducer';
const persistConfig = {
    key: 'root',
    storage
  };

const enhancedReducer = persistReducer(persistConfig, reducer);
export default createStore(enhancedReducer)