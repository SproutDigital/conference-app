import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { StatusBar } from 'react-native';
//import {BoardingScreen, Login, Register, ForgetPassword, Logout } from '../screens'
import  BoardingScreen  from '../screens/BoardingScreen';
import  Login  from '../screens/Login';
import  Register  from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import Logout from '../screens/Logout';
import Profile from '../screens/Profile';


const AuthStack = createStackNavigator({ 
  BoardingScreen: {
    screen: BoardingScreen,
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

  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }
  }
  
},
  {
    mode: 'modal',
    cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
    headerMode: 'none'
  },
);

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading:BoardingScreen,
  Auth:AuthStack,
  Menu: MenuStack,
},
  {
    initialRouteName: 'AuthLoading',
  }
);


export default createAppContainer(AppSwitchNavigator);

