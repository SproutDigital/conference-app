'use strict';
import React, {Component} from 'react';
import { View, ScrollView, SafeAreaView, StatusBar, Image, Text,TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, } from '../../components';
import styles from './styles';
import { DrawerActions } from "react-navigation";
import Carousel, { ParallaxImage, Pagination } from 'react-native-snap-carousel';
import {connect} from 'react-redux';
import { post, EventDetailsEndpoint, getProfile} from '../../utils';
import { setEventDetails } from '../../redux/actions/eventActions';
import theme from '../../assets/theme';
import { sliderWidth, itemWidth } from '../../utils/SliderEntry.style';
import SliderEntry from '../../utils/SliderEntry';

const SLIDER_1_FIRST_ITEM = 1;



 class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.state ={
      token : '',
      showAlert : false,
      message : '',
      restoring: true,
      slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
      data:{}

    }
  }

   async componentDidMount () {
    let profile = await getProfile();
     await this.fetchEventDetails(profile.sessionToken);
  }

  _renderItemWithParallax ({item, index}, parallaxProps) {
    return (
        <SliderEntry
          data={item}
          even={(index + 1) % 2 === 0}
          parallax={true}
          parallaxProps={parallaxProps}
        />
    );
  }


  _renderItem ({item, index}, parallaxProps) {
    return (
        <View style={styles.item}>
            <ParallaxImage
                source={{ uri: item.thumbnail }}
                containerStyle={styles.imageContainer}
                style={styles.image}
                parallaxFactor={0.4}
                {...parallaxProps}
            />
            {/* <Text style={styles.title} numberOfLines={2}>
                { item.title }
            </Text> */}
        </View>
    );
  }

  fetchEventDetails = async(token) => {

    let data = await JSON.stringify({
      'query' :  {'_id' : '5d248d45c8ce0900171f03e2'}, 
    });

     await post (EventDetailsEndpoint, data, token )
      .then((res) => {
        this.setState({
          restoring:false,
          data:res.data[0]
        })
        this.props.setEventProfile(res.data)
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
  

  render () {


    const {restoring, slider1ActiveSlide } = this.state;
    if(restoring) {
      return (
        <View style={styles.container} >
          <Text>loading page... message from Dashboard</Text>
        </View>
      );
    }
    else {
      return(
        <SafeAreaView style={styles.container}> 
          <StatusBar
            barStyle="light-content"
            backgroundColor={theme.colorAccent}/>
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
              ref={c => this._slider1Ref = c}
              data={this.state.data.header_image}
              renderItem={this._renderItemWithParallax}
              sliderWidth={sliderWidth}
              itemWidth={itemWidth}
              hasParallaxImages={true}
              firstItem={SLIDER_1_FIRST_ITEM}
              inactiveSlideScale={0.94}
              inactiveSlideOpacity={0.7}
              // inactiveSlideShift={20}
              containerCustomStyle={styles.slider}
              contentContainerCustomStyle={styles.sliderContentContainer}
              loop={true}
              loopClonesPerSide={2}
              autoplay={true}
              autoplayDelay={500}
              autoplayInterval={3000}
              onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
            />
            <Pagination
              dotsLength={this.state.data.header_image.length}
              activeDotIndex={slider1ActiveSlide}
              containerStyle={styles.paginationContainer}
              dotColor={'rgba(255, 255, 255, 0.92)'}
              dotStyle={styles.paginationDot}
              inactiveDotColor={theme.colorAccent}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
              carouselRef={this._slider1Ref}
              tappableDots={!!this._slider1Ref}
            />
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
