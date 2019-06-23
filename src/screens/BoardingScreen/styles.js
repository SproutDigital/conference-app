import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width /6;
import defaultTheme from '../../assets/theme';


export default styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    alignContent:'center',
    // paddingTop: (Platform.OS) === 'ios' ? 20 : 0,
    // padding : 20

  },

  slide: {
    flex: 1,
    paddingBottom: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  sliderText: {
    fontSize: defaultTheme.thinyFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: defaultTheme.secondaryFont,
    paddingRight: 10,
    paddingLeft: 10,

  },
  sliderTitle: {
    fontSize: defaultTheme.MediumFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    // marginBottom: 16,
    paddingTop : 40,
    fontFamily: defaultTheme.primaryFont
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: 'contain'
  }
  // MainContainer: {
  //   flex: 1,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   padding: 20
  // },
  // title: {
  //   fontSize: defaultTheme.MediumFont,
  //   color: defaultTheme.secondaryTextColor,
  //   fontWeight: 'bold',
  //   textAlign: 'center',
  //   marginTop: 20,
  // },
  // text: {
  //   color: defaultTheme.primaryTextColor,
  //   fontSize: defaultTheme.primaryFont,
  // },
 

  

});