import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({

  container: {
    flex: 1,
  },
  navBar: {
    flexDirection : 'row',
    // paddingTop : (Platform.OS === "ios") ? 16 : 14,
    height : 60,
    backgroundColor: theme.toolBarColor,
    width: '100%',
    alignItems: 'center',
    paddingBottom: 4,
    shadowColor: theme.secondaryTextColor,
    shadowOffset: { 
      width: 0, 
      height: 4 
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,  
  },
  headerIcon: {
    height: 18,
    width: 18,
    tintColor : theme.primaryColor,
  },
  headerLogoIcon: {
    height: 35,
    width: 80,
  },
  headerImage: {
    borderRadius: 30,
    height: 40,
    width: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft : 8,
  },
  balanceTxtView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '50%'
  },
  nameView: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'center',
    alignItems : 'center'
  },
  txtHeader: {
    fontSize: 18,
    color: theme.primaryTextColor,
    marginLeft: 16,
    alignSelf: 'center',
    fontFamily : theme.secondaryFont
  },
  exitTxt: {
    fontSize: 40,
    color: colors.text_color,
    fontFamily: 'Poppins-Regular',
    marginLeft: 16
  },
  slideCarosel : {
    width:  '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  sliderView : {
    height : 160,
    width : '100%',
    shadowOpacity: 0.25, 
    shadowOffset: {height: 2, width:0},
    shadowColor: theme.textGray, 
    shadowRadius: 2.56,
    elevation : 1,
  },
  viewBody :{
    flex : 1,
    width : '100%',
    // marginTop :2,
    // backgroundColor : 'red'
  },
  srollContent :{
    flexDirection : 'column',
    padding : 16,
    paddingTop: 8,

  },
  aboutHeaderTxt : {
    fontFamily : theme.headerFont,
    fontSize : theme.MediumFont,
    color : theme.primaryTextColor,
  },
  aboutBodyTxt : {
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallerFont,
    color : theme.secondaryTextColor,
    textAlign : 'justify',
    lineHeight: 25,

  },

  formContainer : {
    width : '100%',
    justifyContent : 'center',
    paddingLeft : 20,
    paddingRight : 20,
    // paddingBottom : 50

  },

  formView : {
    flexDirection : 'column', 
    width : '100%', 
    borderBottomColor : theme.formBorderColor,
    borderBottomWidth : 0.8,
    marginTop : 4
  },


  titleText : {
    fontSize :theme.SmallFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont,
  },
  textInfo : {
    fontSize :theme.SmallFont,
    color : theme.primaryTextColor,
    fontFamily : theme.secondaryFont,
    marginTop : 8
  },

});