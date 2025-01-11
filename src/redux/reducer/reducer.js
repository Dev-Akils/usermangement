import { v4 as uuidv4 } from "uuid";
import {
  ADD_CUSTOMER,
  UPDATE_CUSTOMER,
  DELETE_CUSTOMER,
  SET_CUSTOMERS,
} from "../actions";

const initialState = {
  customers: [],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMERS:
      const customersWithIds = action.payload.map((customer) => ({
        ...customer,
        id: uuidv4(), 
      }));
      return {
        ...state,
        customers: [...state.customers, ...customersWithIds],
      };

    case ADD_CUSTOMER:
      const newCustomer = { ...action.payload, id: uuidv4() };
      return {
        ...state,
        customers: [...state.customers, newCustomer],
      };

    //   case UPDATE_CUSTOMER:
    //     console.log('Updating customer with payload:', action.payload); 
    //     const updatedCustomers = state.customers.map((customer) =>
    //         customer.id === action.payload.id
    //     ? { ...customer, ...action.payload } 
    //     : customer);
    //     console.log('Updated customers list:', updatedCustomers); 
    //     return { ...state, customers: updatedCustomers };

   
    case UPDATE_CUSTOMER:
    console.log('Updating customer with payload:', action.payload); // Log the payload to check

    // Replace the entire customer object with the updated one
    const updatedCustomers = state.customers.map((customer) =>
        customer.id === action.payload.id
            ? action.payload // Directly replace the customer with updated data
            : customer // Keep the rest of the customers unchanged
    );

    console.log('Updated customers list:', updatedCustomers); // Log the new customers list
    return { ...state, customers: updatedCustomers };

    

    case DELETE_CUSTOMER:
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer.id !== action.payload
        ),
      };

    default:
      return state;
  }
};

export default customerReducer;
