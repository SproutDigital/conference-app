'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, StyleSheet, Text,TouchableOpacity, Animated,Dimensions,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import { DrawerActions } from "react-navigation";
import {connect} from 'react-redux';
import {  EventCode, post, EventDetailsEndpoint, getProfile} from '../../utils';
import { setEventDetails, } from '../../redux/actions/EventActions';
import { setSponsorDetails } from '../../redux/actions/SponsorActions';
import { setProgramDetails } from '../../redux/actions/ProgramActions';
import { setResources } from '../../redux/actions/ResourceActions';
import {setSpeakers} from '../../redux/actions/SpeakerActions';
import {setAttendees} from '../../redux/actions/AttendeeActions';
import theme from '../../assets/theme';

const deviceWidth = Dimensions.get('window').width;

 class DashBoard extends Component {
  animVal = new Animated.Value(0);


  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      restoring: true,
      data:{}

    }
  }

   async componentDidMount () {
    let profile = await getProfile();
     await this.fetchEventDetails(profile.sessionToken);
  }

 

  fetchEventDetails = async(token) => {
    const { setEventProfile, setSponsor, setProgram, setResource, setAttendee, setSpeaker} = this.props;

    let data = await JSON.stringify({
      'query' :  {'eventCode' : EventCode}, 
    });

     await post (EventDetailsEndpoint, data, token )
      .then((res) => {
        this.setState({
          restoring:false,
          data:res.data[0]
        })
          console.log({'dashboard' : res.data[0].sponsors})
        setEventProfile(res.data);
        setSponsor(res.data[0].sponsors);
        setProgram(res.data[0].program);
        setResource(res.data[0].resources);
        setAttendee(res.data[0].attendees);
        setSpeaker(res.data[0].speakers);
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
  handleProgram = ()=> {
    return this.props.navigation.navigate('Programs');
  }
  handleResources = () => {
    return this.props.navigation.navigate('Resources')
  }
  handleSponsors = () => {
    return this.props.navigation.navigate('Sponsor')
  }
  handlepeople = () => {
    return this.props.navigation.navigate('People')
  }

  render () {
    const {restoring, data} = this.state;
    if(restoring) {
      return (
        <View style={styles.container} >
          <Text>loading page... message from Dashboard</Text>
        </View>
      );
    }
    else {

      let imageArray = [],
      // barArray = [],
       images = data.header_image;

      images.forEach((image, i) => {
        const thisImage = (
          <Image
            key={`image${i}`}
            source={{uri: image}}
            style={{ width: deviceWidth, marginTop:0, height:190, resizeMode : 'cover'}}
          />
        )
        imageArray.push(thisImage) 
      });

      return(
        <SafeAreaView style={styles.container}> 
          <StatusBar barStyle="default"/>
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
                source = {{uri:data.logo}}
                style = {StyleSheet.flatten(styles.headerLogoIcon)}
              />
          </View>
          </View>
          <View style = {styles.sliderView}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              scrollEventThrottle={10}
              pagingEnabled
              onScroll={
                Animated.event(
                  [{ nativeEvent: { contentOffset: { x: this.animVal } } }]
                )
              }
            >

            {imageArray}
          </ScrollView>
            <View style = {styles.sliderDot}>
              <View style ={styles.sliderTxtView}>
                <DisplayText
                  text={'Africas Leading Media Conference for Women '}
                  styles = {styles.boxText}
                />
              </View>
              <View style = {styles.dotsView}>
                <View style ={styles.dots}></View>
                <View style ={styles.dots}></View>
                <View style ={styles.dots}></View>
              </View>
            </View>            
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
                <TouchableOpacity 
                  onPress = { this.handleProgram }
                  style={styles.boxes}>
                  <Image
                    source = {require('../../assets/images/program.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    text={'Programs'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress = {this.handlepeople}
                  style={styles.boxes}>
                  <Image
                    onPress = {this.handlepeople}
                    source = {require('../../assets/images/group.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    onPress = {this.handlepeople}
                    text={'People'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress = {this.handleSponsors}
                  style={styles.boxes}>
                  <Image
                    onPress = {this.handleSponsors}
                    source = {require('../../assets/images/sponsors.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    onPress = {this.handleSponsors}
                    text={'Sponsors'}
                    styles = {styles.boxText}
                  />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress = {this.handleResources}
                  style={styles.boxes}>
                  <Image
                    onPress = {this.handleResources}
                    source = {require('../../assets/images/resources.png')}
                    style = {StyleSheet.flatten(styles.boxIcon)}
                  />
                  <DisplayText
                    onPress = {this.handleResources}
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
    setEventProfile: (data) =>dispatch(setEventDetails(data)),
    setSponsor: (data)=>dispatch(setSponsorDetails(data)),
    setProgram: (data)=>dispatch(setProgramDetails(data)),
    setResource: (data)=>dispatch(setResources(data)),
    setAttendee: (data)=>dispatch(setAttendees(data)),
    setSpeaker: (data)=>dispatch(setSpeakers(data)),


  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard)
