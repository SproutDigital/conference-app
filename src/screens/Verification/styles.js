import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo';
import colors from '../../assets/colors';
import theme from '../../assets/theme'
export default styles = StyleSheet.create({

  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
  },
  closeView : {
    width : 40,
    height : 40,
    marginLeft : 10,
    marginTop : 10,
    backgroundColor : 'transparent',
    justifyContent: 'center',
    alignItems : 'center',
  }, 
  closeIcon : {
    width : 18,
    height : 18,
    tintColor : colors.green_background
  },
  wrapper : {
    
  },
  textView : {
    justifyContent: 'center',
    alignItems : 'center',
    padding : 20,
  },
  Verification : {
    fontSize: theme.SmallFont,
    color: colors.darkSilver,
    marginTop: 15,
    fontFamily: theme.headerFont,
    alignSelf: 'center',
  },
  msgText: {
    fontSize: theme.SmallFont,
    color: colors.darkSilver,
    marginTop: 8,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
  },
  msgText2: {
    fontSize: theme.SmallFont,
    color: colors.darkSilver,
    fontFamily: theme.subHeaderFont,
    alignSelf: 'center',
  },
  resend : {
    fontSize: theme.SmallFont,
    marginTop : 8,
    color: colors.green_background,
    fontFamily: theme.headerFont,
    alignSelf: 'center',
  },
  buttonBorder: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '20%',
    height: 40,
    backgroundColor: colors.white,
    borderRadius : 25,
  },
  btnText : {
    fontSize: theme.MediumFont,
    color: colors.white,
    fontFamily: theme.headerFont,
    alignSelf: 'center',    
  },

  // otp design
  optView : { 
    marginTop : '20%',
    alignItems : 'center',
    justifyContent: 'center',
    padding : 20,
  },
  btnView: {
    alignItems : 'center',
    width : '100%',
    marginTop : 30,
  },
  buttonWithImage : {
    borderRadius : 30,
    width : '60%',
    height : 45,
    backgroundColor : theme.buttonPrimary,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'row',
    marginTop : 25,
    paddingRight : 8,
  },
  iconDoor : {
    height : 18,
    width : 18,
    resizeMode : 'contain',
    marginLeft: 24,
  },
  buttonTxt : {
    fontFamily : theme.headerFont,
    color : theme.colorAccent,
    fontSize: theme.SmallFont,
    alignSelf : 'center',
  },

});
