'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import colors from '../../assets/colors';
import { DrawerActions } from "react-navigation";
import Carousel from 'react-native-carousel';
import {connect} from 'react-redux';
import { post, EventDetailsEndpoint, getProfile} from '../../utils';
import { setEventDetails } from '../../redux/actions/eventActions';



 class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      restoring: true,
    }
  }

   async componentDidMount () {
    let profile = await getProfile();
     await this.fetchEventDetails(profile.sessionToken);
  }

  fetchEventDetails = async(token) => {

    let data = await JSON.stringify({
      'query' :  {'_id' : '5d1ca6b09b0b080017036e62'}, 
    });

     await post (EventDetailsEndpoint, data, token )
      .then((res) => {
       // console.log({res})
        this.setState({
          restoring:false,
        })
        this.props.setEventProfile(res.data)
        // if (res.status !== 'success') {  
        //   return  this.setState({ 
        //     showLoading : false,
        //     title : 'Hello',
        //     message : res.message,
        //     showAlert : true,
        //   }); 
        // }
        // else {
        //   if(res.verified) {
        //     this.setState({ 
        //       showLoading : false, 
        //       resolved: true
        //     });
        //     return this.resetNavigationStack(); 
        //   }
        //   else {
        //     return this.setState({ 
        //       showLoading : false, 
        //       resolved: true

        //     });
        //   }
             
       // }
      });

  }

  
  toggleDrawer = () => {
    //Props to open/close the drawer
    // this.props.navigation.toggleDrawer();
    this.props.navigation.dispatch(DrawerActions.toggleDrawer())
  };

  handleAboutRoute = () => {
    return this.props.navigation.navigate('About');
  }
  

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
        <SafeAreaView style={styles.container}> 
          <StatusBar
            barStyle="light-content"
            backgroundColor={colors.green_background}/>
          <View style = {styles.navBar}>
            <TouchableOpacity
              onPress={this.toggleDrawer} 
              style = {styles.headerImage}>
              <Image
                onPress={this.toggleDrawer} 
                source = {require('../../assets/images/menu.png')}
                style = {StyleSheet.flatten(styles.headerIcon)}
              />
            </TouchableOpacity>
            <View style = {styles.nameView}>
              <Image
                source = {require('../../assets/images/inapp_logo.png')}
                style = {StyleSheet.flatten(styles.headerLogoIcon)}
              />
          </View>
          </View>
          <View style = {styles.sliderView}>
            <Carousel 
              indicatorAtBottom={true}
              indicatorColor="#FFFFFF"
              indicatorSize={20}
              indicatorSpace={15}
              indicatorText= '•'
              delay={8000}
              width={375}>
              <View style={styles.slideCarosel}>
                <Text>Page 1</Text>
              </View>
              <View style={styles.slideCarosel}>
                <Text>Page 2</Text>
              </View>
              <View style={styles.slideCarosel}>
                <Text>Page 3</Text>
              </View>
            </Carousel>
          </View>
          <View style={styles.tileView}>
            <ScrollView 
              style={{flex:1}}
              showsVerticalScrollIndicator={false}>     

              <View style={styles.boxViews}>
                <TouchableOpacity 
                  onPress = {this.handleAboutRoute}
                  style={styles.boxes}>
                  <Image
                    onPress = {this.handleAboutRoute}
                    source = {require('../../assets/images/about.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    onPress = {this.handleAboutRoute}
                    text={'About'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/program.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Programs'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/group.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'People'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/sponsors.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Sponsors'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/resources.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Resources'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/news_feed.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'News Feed'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/contact.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Contact'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/floor_plan.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Floor Plan'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/message.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Message/Chat'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/photo.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Photo'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/guide.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Guide'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/feedback.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Feedback/\nSurvey'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
              </View>
                    
            </ScrollView>
          </View>
        </SafeAreaView>
        
      )
    }
  }
} 

const mapStateToProps = (state, ownProps) =>{
  return  {
     // isLoggedIn: state.authreducer.isLoggedIn
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
      setEventProfile: (data) =>{dispatch(setEventDetails(data))},
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
