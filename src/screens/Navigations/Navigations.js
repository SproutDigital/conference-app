'use strict';
import React, {Component} from 'react';
import {View, StatusBar, Image, ScrollView, SafeAreaView,TouchableOpacity} from 'react-native';
import styles from './styles';
import colors from '../../assets/colors';
import theme from '../../assets/theme';
import {DisplayText} from '../../components';

import { 
  createDrawerNavigator, 
  createAppContainer, 
  createStackNavigator,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

//Import screen
// import InvestmentDetails from '../InvestmentDetails/InvestmentDetails';
import DashBoard from '../DashBoard/DashBoard';
import Settings from '../Settings/Settings';
import Programs from '../Programs/Programs';
import People from '../People/People';
import Help from '../Help/Help';
import Notification from '../Notification/Notification';
import Profile from '../Profile/Profile';
import Logout from '../Logout/Logout';

import CustomSidebarMenu from './CustomSidebarMenu';

class Navigations extends Component {

  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  
  render(){
    return(
      <SafeAreaView style={{ flexDirection: 'row' }}>
        <StatusBar barStyle="default"/>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../../assets/images/menu.png')}
            style={styles.imageLogo}
            onPress={this.toggleDrawer.bind(this)}
          />
        </TouchableOpacity>
      </SafeAreaView>
    )
  }
}

const DashBoard_StackNavigator = createStackNavigator({
  //All the screen from the DashBoard will be indexed here
  DashBoard: {
    screen: DashBoard,
    navigationOptions: {
      header : null
    }
  },
});

const Profile_StackNavigator = createStackNavigator({
  //All the screen from the Profile will be indexed here
  Profile: {
    screen: Profile,
    navigationOptions: {
      header : null,
    }
  },
});
const Notification_StackNavigator = createStackNavigator({
  //All the screen from the Investment will be indexed here
  Notification: {
    screen: Notification,
    navigationOptions: {
      header : null
    }
  },
});

const Settings_StackNavigator = createStackNavigator({
  //All the screen from the Referral will be indexed here
  Settings: {
    screen: Settings,
    navigationOptions: {
      header : null,
    }
  },
});
const Logout_StackNavigator = createStackNavigator({
  //All the screen from the Referral will be indexed here
  Forth: {
    screen: Logout,
    navigationOptions: {
      header : null,
    }
  },
});

const DrawerNavigator = createDrawerNavigator({
  DashBoard: {
    screen : DashBoard_StackNavigator,
    navigationOptions: {
      // drawerLabel: "DashBoard"
      header : null
    }
  },

  Profile : {
    screen : Profile_StackNavigator,
    navigationOptions: {
      header: null
    }
  },
  Notification : {
    screen : Notification_StackNavigator,
    navigationOptions: {
      header : null,
    }
  },
  Settings : {
    screen : Settings_StackNavigator,
    navigationOptions: {
      header : null
    }
  },
  Logout : {
    screen : Logout_StackNavigator,
    navigationOptions: {
      drawerLabel: "Logout",
    },
    tab : {}
  },
},
{
  contentComponent : CustomSidebarMenu,
  drawerWidth : 250,
  contentOptions : {
    activeTintColor : theme.backgroundColor
  }
});
const AppDrawer = createAppContainer(DrawerNavigator);

const BottomTab = createBottomTabNavigator({
  DashBoard: {
    screen: AppDrawer,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/home.png')} 
        style={{height: 20, width: 20, tintColor: tintColor, resizeMode: 'contain' }} />      
      )
    }
  },
  Programs: {
    screen: Programs,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/program.png')} 
        style={{height: 20, width: 20, tintColor: tintColor, resizeMode: 'contain' }} />      
      )
    }
  },
  People: {
    screen: People,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/group.png')} 
        style={{height: 20, width: 20, tintColor: tintColor, resizeMode: 'contain' }} />      
      )
    }
  },
  Help: {
    screen: Help,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/book.png')} 
        style={{height: 20, width: 20, tintColor: tintColor,resizeMode: 'contain' }} />      
      )
    }
  },
  Notification: {
    screen: Notification,
    navigationOptions: {
      // tabBarLabel: 'Bara.ng',
      tabBarIcon: ({tintColor}) => (
      <Image 
        source={require('../../assets/images/group.png')} 
        style={{height: 20, width: 20, tintColor: tintColor, resizeMode: 'contain' }} />      
      )
    }
  },
},
{
  tabBarOptions: {
    activeTintColor: theme.primaryColor,
    inactiveTintColor: theme.secondaryTextColor,
    style: {
      backgroundColor: colors.white,
      borderTopWidth: 0,
      shadowOffset: {width: 5, height: 3},
      shadowColor: 'gray',
      shadowOpacity: 0.2,
      elevation: 4,
      height : 60
    }
  }
});



const App = createAppContainer(BottomTab);

export default App;


  //All the screen from the DashBoard will be indexed here
//   First: {
//     screen: DashBoard,
//     navigationOptions: ({ navigation }) => ({
//       title: 'Dashboard',
//       headerLeft: <Navigations navigationProps={navigation} />,
//       headerStyle: {
//         backgroundColor: colors.green_background,
//       },
//       headerTintColor: '#fff',
//     }),
//   },
// });