import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width /6;
import colors from '../../assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 40,
    paddingBottom: 10, 
    justifyContent: 'center',
    alignItems: 'center'
  // alignContent:'center'
  },

  buttonWrapper : {
    paddingLeft : 20,
    paddingRight : 20,
    marginTop : 10,
    justifyContent : 'flex-end',
    //backgroundColor:'green',
    width :'100%',
    alignItems : 'center',
    marginBottom : 4,
  },

  logoWrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignContent:'center',
    justifyContent: 'center',
  },

  signupLinkView: {
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection: 'row',
    backgroundColor : 'transparent',
    marginBottom : 16,
    width : '40%',
    height : 40
  },
  signupText: {
    fontSize: 16,
    color: colors.button_border,
    fontFamily: 'Poppins-Regular',
    alignSelf: 'center',
  },

  logo: {
    height: IMAGE_HEIGHT,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  textView : {
    flex : 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding : 20,
  },
  welcomeTxt : {
    fontSize: 20,
    color: colors.blackShade,
    marginBottom : 16,
    fontFamily: 'Poppins-Medium',
    alignSelf: 'center',
  },
  smallWelcomeTxt : {
    fontSize : 12,
    color : colors.blackShade,
  },
  smallTxtView : {
    marginTop : 25,
    justifyContent: 'center',
    alignSelf: 'center',
  }
});