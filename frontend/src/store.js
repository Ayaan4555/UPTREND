import {applyMiddleware , combineReducers ,  createStore} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import {cartReducer} from './reducers/cartReducer';
import {
         productDetailsReducer,
         productListReducer ,
        productDeleteReducer,
        productCreateReducer,
        productUpdateReducer,
        productReviewCreateReducer
} from './reducers/productReducer';
import { 
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderMyListReducer,
    orderListReducer,
    orderDeliverReducer
} from './reducers/orderReducer';
import { 
    userLoginReducer , 
    userRegisterReducer , 
    userDetailsReducer , 
    userUpdateProfileReducer ,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
    getUserByIdReducer,
} from './reducers/userReducer';

const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    productDelete : productDeleteReducer,
    productCreate : productCreateReducer,
    productUpdate : productUpdateReducer,
    productReviewCreate : productReviewCreateReducer,
    cart:cartReducer,
    userLogin : userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails : userDetailsReducer,
    userUpdateProfile : userUpdateProfileReducer,
    userList : userListReducer,
    userDelete : userDeleteReducer,
    userUpdate : userUpdateReducer,
    getUserId : getUserByIdReducer,
    orderCreate : orderCreateReducer,
    orderDetails : orderDetailsReducer,
    orderPay : orderPayReducer,
    orderMyList : orderMyListReducer,
    orderList : orderListReducer,
    orderDeliver : orderDeliverReducer,
});

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ?JSON.parse(localStorage.getItem('cartItems')) :[];

const userInfoFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null ;

const shippingAddressFromStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('shippingAddress')) : {};

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') ? JSON.parse(localStorage.getItem('paymentMethod')) : 'paypal';

const intialState = {
    cart : {cartItems : cartItemsFromStorage , shippingAddress : shippingAddressFromStorage,
    paymentMethod : paymentMethodFromStorage
    },
    userLogin : {userInfo : userInfoFromStorage},
};

const middlewares = [thunk];

const store = createStore(
    reducer,
    intialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;