"use client";
import React, { createContext, useContext, useEffect, useReducer } from "react";
import Cookies from "js-cookie";
import { info } from "console";

type AppState = {
  state: any;
  cartItems: any[];
  customerInfo: {};
  info: {};
  totalAmount: number;
  customerEmail: string;
  addToCart: (...args: any) => void;
  removeFromCart: (...args: any) => void;
  updateItemQuantity: (...args: any) => void;
  updateCustomer: (...args: any) => void;
  updateCustomerEmail: (...args: any) => void;
  saveState: () => void;
  setState?: (s: any) => void;
};
/**
 *  {
    full_name: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: '',
  },
 */

// Initial state for the cart
const initialState: AppState = {
  state: {},
  customerEmail: "",
  cartItems: [],
  totalAmount: 0,
  info: {},
  customerInfo: {
    fullName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  },
  addToCart: (...args: any) => {},
  removeFromCart: (...args: any) => {},
  updateItemQuantity: (...args: any) => {},
  updateCustomer: (...args: any) => {},
  updateCustomerEmail: (...args: any) => {},
  saveState: () => {},
  setState: (s: any) => {},
};

// Actions for the reducer
const enum ActionType {
  ADD_TO_CART = "ADD_TO_CART",
  REMOVE_FROM_CART = "REMOVE_FROM_CART",
  UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY",
  CUSTOMER_INFOMATION = "CUSTOMER_INFOMATION",
  UPDATE_CUSTOMER_EMAIL = "UPDATE_CUSTOMER_EMAIL",
  SET_STATE = "SET_STATE",
}

// Reducer function to handle cart actions
const appReducer = (state: AppState, action: any) => {
  switch (action.type) {
    case ActionType.ADD_TO_CART:
      const itemExists = state.cartItems.find(
        (item: any) => item.$id === action.payload.$id
      );
      if (itemExists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.$id === action.payload.$id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
          totalAmount: state.totalAmount + action.payload.price,
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
          totalAmount: state.totalAmount + action.payload.price,
        };
      }

    case ActionType.REMOVE_FROM_CART:
      const updatedCartItems = state.cartItems.filter(
        (item) => item.$id !== action.payload.$id
      );
      return {
        ...state,
        cartItems: updatedCartItems,
        totalAmount:
          state.totalAmount - action.payload.price * action.payload.quantity,
      };

    case ActionType.UPDATE_ITEM_QUANTITY:
      const updatedItems = state.cartItems.map((item) =>
        item.$id === action.payload.product_id
          ? { ...item, quantity: action.payload.newQuantity }
          : item
      );
      return {
        ...state,
        cartItems: updatedItems,
        totalAmount:
          state.totalAmount +
          (action.payload.newQuantity - action.payload.oldQuantity) *
            action.payload.price,
      };
    case ActionType.CUSTOMER_INFOMATION:
      return {
        ...state,
        info: {
          ...state.info, // Preserve existing fields
          ...action.payload, // Update with new values from payload
        },
      };
      break;
    case ActionType.UPDATE_CUSTOMER_EMAIL:
      return {
        ...state,
        customerEmail: action.payload.email,
      };
    case ActionType.SET_STATE:
      console.log(action.payload.s);
      return {
        ...state,
        cartItems: action.payload.s.cartItems,
        totalAmount: action.payload.s.totalAmount,
        customerInfo: action.payload.s.customerInfo,
        info: action.payload.s.info,
      };
    default:
      return state;
  }
};

// Create context
const AppContext = createContext(initialState);

// Create provider component
export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load cartItems from cookies on first load
  useEffect(() => {
    const storedCart = Cookies.get("state");
    if (storedCart) {
      const s = JSON.parse(storedCart); // Set the cart items from cookies
      dispatch({ type: ActionType.SET_STATE, payload: { s } });
    }
  }, []); // This will run only once on component mount
  
  useEffect(() => {

  }, [state])


  // Add item to cart
  const addToCart = (product: any) => {
    dispatch({ type: ActionType.ADD_TO_CART, payload: product });
  };

  // Remove item from cart
  const removeFromCart = (product: any) => {
    dispatch({ type: ActionType.REMOVE_FROM_CART, payload: product });  };

  // Update item quantity
  const updateItemQuantity = (product: any, newQuantity: number) => {
    dispatch({
      type: ActionType.UPDATE_ITEM_QUANTITY,
      payload: {
        product_id: product.$id,
        newQuantity,
        oldQuantity: product.quantity,
        price: product.price,
      },
    });  };

  // Update Customer
  const updateCustomer = (customerInfo: any) => {
    dispatch({
      type: ActionType.CUSTOMER_INFOMATION,
      payload: {
        ...customerInfo,
      },
    });
  };
  // Update Customer Email
  const updateCustomerEmail = (email: string) => {
    dispatch({
      type: ActionType.UPDATE_CUSTOMER_EMAIL,
      payload: {
        email,
      },
    });
  };

  const saveState = () => {
    const stateObject = {
      cartItems: state.cartItems,
      totalAmount: state.totalAmount,
      customerInfo: state.customerInfo,
      info: state.info,
    };

    Cookies.set("state", JSON.stringify(stateObject), {expires: 30});
  };

  return (
    <AppContext.Provider
      value={{
        cartItems: state.cartItems,
        totalAmount: state.totalAmount,
        customerInfo: state.customerInfo,
        customerEmail: state.customerEmail,
        updateCustomerEmail,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        updateCustomer,
        saveState,
        state,
        info: state.info,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the cart context
export const useAppContext = () => {
  return useContext(AppContext);
};
