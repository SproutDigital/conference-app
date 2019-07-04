'use strict';
import React, {Component} from 'react';
import { View, Image } from 'react-native';
import {DisplayText} from '../../components';
import styles  from './styles';
import { saveExpoToken, logout, getOnBoardingStatus, getVerification, getProfile} from '../../utils';
import AppIntroSlider from 'react-native-app-intro-slider';
import { Ionicons } from '@expo/vector-icons';
import  * as Permissions from 'expo-permissions';
import  {Notifications} from 'expo';
import { NavigationActions, StackActions } from 'react-navigation';
import { YellowBox } from 'react-native';
YellowBox.ignoreWarnings(['Remote debugger']);

const slides = [
  {
    key: 'somethun',
    title: 'Check the Conference \nCalendar',
    text: 'Pickout talks You \'d love to attend and \nset reminder',
    image: require('../../assets/images/people.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 'somethun-dos',
    title: 'Network!',
    text: 'Learn more about the organizers, speakers \nand other delegates and connect with \nthem easily via the app',
    image: require('../../assets/images/man.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 'somethun1',
    title: 'Quick Help',
    text: 'Cant find a meeting room, not sure \nabout the weather? Like we said, \n"Everything in one place"',
    image: require('../../assets/images/woman.png'),
    backgroundColor: '#22bcb5',
  }
];


 export default class BoardingScreen extends Component {
  constructor(props) {
    super(props);
    this.state ={
      restoring : true,
    }

  }

   async componentWillMount(){
   //logout();
  // console.log({'he':new Date()})
    this.checkLogin();
  }


  resetNavigationStack = (location) => {
    const navigateAction =  StackActions.reset({
       index: 0,
       actions: [
         NavigationActions.navigate({
           routeName: location,
         }),
       ],
     });
     this.props.navigation.dispatch(navigateAction);
 
   }
 

  componentDidMount () {
    this.registerForPushNotificationsAsync();
    this.listener = Notifications.addListener(this.handleNotification);
  }

  handleNotification = ({ origin, data }) => {
    //this.props.navigation.navigate('Notification')
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
    );
  };

  registerForPushNotificationsAsync = async()=> {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;
  
    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app
      // install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
  
    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return saveExpoToken('denied');
    }
  
    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    // POST the token to your backend server from where you can retrieve it to send push notifications.
    return saveExpoToken(token);
  }

  _renderItem = (item) => {
    return (
      <View style={styles.slide}>
        <View style = {{}}>
          <Image source={item.image} />
        </View>

        <DisplayText 
          styles={styles.sliderTitle}
          text={item.title}
        />

        <DisplayText 
          styles={styles.sliderText}
          text={item.text}
          />
      </View>
    );
  }

  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{ backgroundColor: 'transparent' }}
        />
      </View>
    );
  }


  checkLogin =  async() => {
    let profile = await getProfile();
    let isVerified = await getVerification();
    let completed = await getOnBoardingStatus();

    if(profile.sessionToken) {
      this.setState({
        restoring : false,
      });

      if(isVerified == true && completed) {
        return this.resetNavigationStack('DashBoard');
      }
      else if(isVerified == false){
        return this.resetNavigationStack('Verification');
      }
      else {
        return this.resetNavigationStack('OnboardingProfile');
      }
    }
    else {
      this.setState({
        restoring : false,
      });
    }
  }

  handleLogin = () => {
    return this.props.navigation.navigate('Login');
  };

  handleRegistration = () => {
    return this.props.navigation.navigate('Register');
  };

  render () {
    
    const {restoring } = this.state;
    if(restoring) {
      return (
        <View>

        </View>
      );
    }
    else {
      
      return(
        <View style={styles.container}>         

          <AppIntroSlider 
              renderItem={this._renderItem} 
              slides={slides} 
              onDone={this._onDone}
              showSkipButton ={true}
              showNextButton={true}
              onSkip={() => this.props.navigation.navigate('Register')}
              onDone={() => this.props.navigation.navigate('Register')}
              dotStyle= {styles.sliderDots}
              activeDotStyle={styles.activeDotStyle}
              renderDoneButton={this._renderDoneButton}
              renderNextButton={this._renderNextButton}
            />
        </View>
      )
    }  
  } 
   
} 

// const mapStateToProps = (state, ownProps) =>{
//   return{
//       registered: state.authReducer.registered
//   }
// }


//export default connect(mapStateToProps)(BoardingScreen)





