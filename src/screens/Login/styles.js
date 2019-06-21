import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width /6;
import colors from '../../assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
   // alignItems: 'center'
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
    paddingBottom: 10, 
    //backgroundColor: colors.background_color,
    //opacity: 0.2,
  },
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 15,
    paddingTop: 8,
    justifyContent: 'center',
  },
  headerView: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 28,
    color: colors.gold,
    marginBottom: 10,
    marginTop: 16,
    fontFamily: 'Montserrat-Regular',
    alignItems: 'center',
    justifyContent : 'center',
  },
  btnView: {
    alignItems : 'center',
    width : '100%',
  },
  welcome: {
    fontSize: 20,
    color: colors.gold,
    marginBottom: 10,
    marginTop:20,
    fontFamily: 'Montserrat-Bold',
    alignItems: 'center',
    justifyContent : 'center',
  },
  
  signupLinkView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  signupText: {
    fontSize: 16,
    color: colors.button_border,
    marginTop: 15,
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },

  signupLink: {
    fontSize: 15,
    color: colors.gold,
    marginTop: 20,
    fontWeight: 'bold',
    fontFamily: 'Montserrat-Regular',
    alignSelf: 'center',
  },

  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    marginBottom: 20,
    padding:10,
    marginTop:20,
    alignSelf: 'center',

  },
  
});