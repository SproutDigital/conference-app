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
    paddingTop: (Platform.OS) === 'ios' ? 20 : 0,

  },

  slide: {
    flex: 1,
    paddingBottom: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },

   sliderText: {
    fontSize: defaultTheme.SmallFont,
    color: defaultTheme.secondaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: defaultTheme.secondaryFont,
     paddingRight: 10,
     paddingLeft: 10,

  },


  sliderTitle: {
    fontSize: defaultTheme.MediumFont,
    color: defaultTheme.primaryTextColor,
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: defaultTheme.primaryFont

  },
  MainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text: {
    color: '#fff',
    fontSize: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  }

  

});