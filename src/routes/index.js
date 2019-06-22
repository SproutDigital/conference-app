import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import Home  from '../screens/Home/Home';
import Login  from '../screens/Login/Login';
import Register  from '../screens/Register/Register'; 
import ForgetPassword from '../screens/ForgetPassword/ForgetPassword';
// import Profile from '../screens/Profile/Profile';
// import Product from '../screens/Product/Product';
// import ProductList from '../screens/ProductList/ProductList';
// import EditProduct from '../screens/EditProduct/EditProduct';
// import Navigations from '../screens/Navigations/Navigations';
import Logout from '../screens/Logout/Logout';
import Profile from '../screens/Profile/Profile';
const AuthStack = createStackNavigator({ 
  Home: {
    screen: Home,
    navigationOptions: {
      header: null
    }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    },
  },

  Register: {
    screen: Register,
     navigationOptions : {
       header: null
     }
  },

  ForgetPassword: {
   screen: ForgetPassword,
    navigationOptions: {
     header: null
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      header: null,
    }
  },
});

export const MenuStack = createStackNavigator({ 
  // Navigations : {
  //   screen : Navigations,
  //   navigationOptions : {
  //     header : null,
  //   }
  // },
  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }
  },
  // Product: {
  //   screen: Product,
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  // ProductList: {
  //   screen: ProductList,
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  // EditProduct: {
  //   screen: EditProduct,
  //   navigationOptions: {
  //     header: null,
  //   }
  // },
  
},
  {
    mode: 'modal',
    cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
    headerMode: 'none'
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading:Home,
  Auth:AuthStack,
  Menu: MenuStack,
},
  {
    initialRouteName: 'AuthLoading',
  }
);


export default createAppContainer(AppSwitchNavigator);

