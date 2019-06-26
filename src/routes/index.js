import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { StatusBar } from 'react-native';
//import {BoardingScreen, Login, Register, ForgetPassword, Logout } from '../screens'
import  BoardingScreen  from '../screens/BoardingScreen';
import  Register  from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import Logout from '../screens/Logout';
import Profile from '../screens/Profile';
import  Login  from '../screens/Login';
import LinkExpire from '../screens/LinkExpire';
import ActivateEmail from '../screens/ActivateEmail';
import ResetPassword from '../screens/ResetPassword';
import Verification from '../screens/Verification';

const AuthStack = createStackNavigator({ 
  BoardingScreen: {
    screen: BoardingScreen,
    navigationOptions: {
      header: null
    }
  },
  Register: {
    screen: Register,
     navigationOptions : {
       header: null
     }
  },

  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
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
  LinkExpire: {
    screen: LinkExpire,
    navigationOptions: {
      header: null,
    }
  },

  ActivateEmail: {
    screen: ActivateEmail,
    navigationOptions: {
      header: null,
    }
  }, 
  
  Logout: {
    screen: Logout,
    navigationOptions: {
      header: null,
    }
  }, 

  Profile: {
    screen: Profile,
    navigationOptions: {
      header: null,
    }
  },
  ResetPassword: {
    screen: ResetPassword,
    navigationOptions: {
      header: null,
    }
  },
  Verification : {
    screen : Verification,
    navigationOptions : {
      header : null,
    }
  }
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

