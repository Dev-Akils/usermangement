import { createStore } from 'redux';
import customerReducer from '../redux/reducer/reducer';

const store = createStore(customerReducer);

export default store;
