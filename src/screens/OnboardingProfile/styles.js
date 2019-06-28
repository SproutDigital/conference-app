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
    width: '100%'
  },
  nameView: {
    flexDirection: 'row',
    width: '80%',
    justifyContent: 'center',
    marginRight : 16
  },
  txtHeader: {
    fontSize: 18,
    color: theme.primaryTextColor,
    width : '100%'
  },
  //body view
  viewBody : {
    flex : 1,
    padding: 20,
    alignItems: 'center',
  },
  imageView : {
    width : 100,
    height : 100,
    marginTop : 20,
    borderRadius : 100,
    elevation : 2,
    backgroundColor : theme.colorAccent
  },
  cameraTouch : {
    width : 40,
    height : 40,
    borderRadius : 50,
    backgroundColor : theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    opacity : 0.5,
    position : 'absolute',
    left : 70,
    top : 45
  },
  cameraIcon : {
    width : 20,
    height : 20,
    resizeMode : 'contain'
  },
  imageStyle : {
    width : '100%',
    height : '100%',
    resizeMode : 'contain'
  },
  profileNameTxt : {
    fontFamily : theme.semiBoldFont,
    fontSize : theme.MediumFont
  },
  userCathegoryView : {
    flexDirection : 'row',
    justifyContent: 'center',
    alignItems : 'center',
    width : '100%',
  },
  downArrow : {
    width : 14,
    height : 14,
    resizeMode : 'contain',
    marginLeft : 8,
    marginBottom : 2,
    tintColor : theme.primaryColor
  },
  userCathegoryTxt : {
    fontFamily : theme.LightPoppins,
    fontSize : theme.thinyFont,
    color : theme.primaryTextColor
  },

  // Modal Style 
  modalview : {
    backgroundColor : colors.red,
    justifyContent: 'center',
    alignItems : 'center'
  },
  modalContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    paddingTop: 80,
  },
  modalStyle: {
    backgroundColor: colors.whiteShade, 
    borderColor: colors.gray,
    height: '40%', 
    width: '90%',
    padding: 16,  
    borderRadius: 4
  },
  modalTxt:{
    fontSize: 18,
    color: colors.text_color,
    marginTop: 6,
    marginBottom: 6,
    fontFamily: theme.secondaryFont,
  },

  // Textinput styling
  titleView : {
    height : 50,
    width : '100%',
    flexDirection : 'column',
    borderBottomWidth : 0.5,
    borderBottomColor: theme.secondaryTextColor,
    // paddingTop : 4,
    paddingBottom : 4,
    marginTop : 16,
  },  
  titleText : {
    fontSize :theme.MediumFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont
  },
  textHeaderStyle : {
    fontSize :theme.MediumFont,
    color : theme.primaryTextColor,
    fontFamily : theme.inputHintFont
  },
  selectView : {
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  penIcon : {
    width : 16,
    height : 16,
    resizeMode : 'contain',
    marginLeft : 8,
    marginBottom : 2,
    tintColor : theme.primaryColor
  },
  inputTxt : {
    fontFamily : theme.subHeaderFont,
    fontSize : theme.thinyFont,
    color : theme.primaryTextColor
  },
  userTitleView : {
    flexDirection : 'row',
    alignItems : 'center',
    
  },
  nameInputView : {
    // height : 60,
    width : '100%',
    flexDirection : 'column',
    borderBottomWidth : 0.5,
    borderBottomColor: theme.secondaryTextColor,
    // paddingTop : 4,
    paddingBottom : 4,
    marginTop : 2,
  },
  buttonView :{
    flexDirection : 'row',
    marginTop : 16,
  },
  txtNext : {
    fontSize: 18,
    color: theme.primaryTextColor,

  },
  nextIcon : {
    width : 14,
    height : 14,
    resizeMode : 'contain',
    marginLeft : 8,
    marginTop : 4,
    tintColor : theme.primaryColor
  }
});