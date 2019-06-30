import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { StatusBar } from 'react-native';
//import {BoardingScreen, Login, Register, ForgetPassword, Logout } from '../screens'
import BoardingScreen  from '../screens/BoardingScreen';
import Register  from '../screens/Register';
import ForgetPassword from '../screens/ForgetPassword';
import Logout from '../screens/Logout';
import Profile from '../screens/Profile';
import Login  from '../screens/Login';
import LinkExpire from '../screens/LinkExpire';
import ActivateEmail from '../screens/ActivateEmail';
import ResetPassword from '../screens/ResetPassword';
import Verification from '../screens/Verification';
import DashBoard from '../screens/DashBoard';
import OnboardingProfile from '../screens/OnboardingProfile';
import OnboardingBio from '../screens/OnboardingBio';
import LastPage from '../screens/LastPage';
import OnboardingSocial from '../screens/OnboardingSocial';
import AllDone from '../screens/AllDone/AllDone';
import Navigations from '../screens/Navigations/Navigations';

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

  OnboardingProfile: {
    screen: OnboardingProfile,
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

<<<<<<< HEAD

export const OnBoardingStack = createStackNavigator({ 
  
  OnboardingBio: {
    screen: OnboardingBio,
    navigationOptions: {
      header: null,
    }
  },
=======
export const MenuStack = createStackNavigator({ 
  DashBoard : {
    screen : DashBoard,
    navigationOptions : {
      header : null,
    }
  },

>>>>>>> 5f1a827db039c94b08efdea15c63c7694301a850
  OnboardingProfile : {
    screen : OnboardingProfile,
    navigationOptions : {
      header : null,
    }
  },
  
  OnboardingBio: {
    screen: OnboardingBio,
    navigationOptions: {
      header: null,
    }
  },
  
  LastPage : {
    screen : LastPage,
    navigationOptions : {
      header : null,
    }
  },
  OnboardingSocial : {
    screen : OnboardingSocial,
    navigationOptions : {
      header : null,
    }
  },
  AllDone : {
    screen : AllDone,
    navigationOptions : {
      header : null,
    }
  }
},
  {
    mode: 'modal',
    cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
    headerMode: 'none'
  });
  export const MenuStack = createStackNavigator({
  
    Navigations : {
      screen : Navigations,
      navigationOptions : {
        header : null,
      }
    },
    DashBoard : {
      screen : DashBoard,
      navigationOptions : {
        header : null,
      }
    },
  },
  {
    mode: 'modal',
    cardStyle: {paddingTop: StatusBar.currentHeight}, //Setting the tb to go under the sb
    headerMode: 'none'
  });

const AppSwitchNavigator = createSwitchNavigator({
  AuthLoading:BoardingScreen,
  Auth:AuthStack,
  OnBoard : OnBoardingStack,
  Menu: MenuStack,
},
  {
    initialRouteName: 'AuthLoading',
  }
);


export default createAppContainer(AppSwitchNavigator);

