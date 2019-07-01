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
  exitTxt: {
    fontSize: 40,
    color: colors.text_color,
    fontFamily: 'Poppins-Regular',
    marginLeft: 16,
    marginTop : 50

  },
  wrapper: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 10,
    width : '100%',
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
    color: theme.secondaryTextColor,
    marginTop: 6,
    marginBottom: 6,
    fontFamily: theme.secondaryFont,
  },
  selectView : {
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  userGenderView : {
    flexDirection : 'row',
    alignItems : 'center',
    width : '100%',
    justifyContent : 'space-between'
    
  },
  inputTxt : {
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallFont,
    color : theme.primaryTextColor
  },
  downArrow : {
    width : 14,
    height : 14,
    resizeMode : 'contain',
    marginLeft : 8,
    marginBottom : 2,
    tintColor : theme.primaryColor
  },
  titleView : {
    height : 55,
    width : '100%',
    flexDirection : 'column',
    borderBottomWidth : 0.5,
    borderBottomColor: theme.secondaryTextColor,
    // paddingTop : 4,
    // paddingBottom : 4,
    marginTop : 16,
  },  
  titleText : {
    fontSize :theme.MediumFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont
  },
  //Nationality 
  CountryView : {
    width : '100%',
    flexDirection: 'column',
    borderBottomWidth : 0.5,
    borderBottomColor: theme.secondaryTextColor,    
    marginTop : 8
  },
  formHeaderTxt: {
    fontSize :theme.MediumFont,
    color : theme.secondaryTextColor,
    fontFamily : theme.inputHintFont
  },
  textBoder: {
    // height: 40,
    width:'100%',
    paddingTop : 4,
    paddingBottom : 4,
    justifyContent : 'center',
  },
  viewTxtNationality : {
    width : '100%',
    flexDirection : 'row',
    justifyContent : 'space-between',

  },
  countryStyle: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
    borderTopColor: theme.colorAccent,
    borderTopWidth: 1,
    padding: 12,
  },
  closeButtonStyle: {
    flex: 1,
    // padding: 12,
    alignItems: 'center', 
    backgroundColor: 'transparent',
    justifyContent: 'center',
  },
  closeButton : {
    width : '60%',
    height : 40,
    borderRadius : 60,
    backgroundColor : theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: 16,
    color: theme.colorAccent,
    fontFamily: theme.secondaryFont,
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
  penIcon : {
    width : 16,
    height : 16,
    resizeMode : 'contain',
    marginLeft : 8,
    marginBottom : 2,
    tintColor : theme.primaryColor
  },
  textInputStyles : {
    height : 65,
    width : '100%'
  },
  interestView : {
    width : '100%',
    height : 70,
    marginTop : 8,
  },
  interestHeader : {
    flexDirection : 'row',
    justifyContent : 'space-between',
  },
  selectedInterest : {
    width : '100%',
    flexWrap : 'wrap',
    flexDirection : 'row',
  },
  //
  addmoreBtn : {
    backgroundColor : theme.primaryColor,
    height : 25,
    borderRadius : 15,
    width : '30%',
    marginTop : 8

  },
  addMore : {
    width : '100%',
    textAlign : 'center',
    color : theme.colorAccent,
    alignItems : 'center',
    paddingTop : 2,
    fontFamily : theme.subHeaderFont,
  },
  buttonView :{
    flexDirection : 'row',
    width : '30%',
    height : 40,
    marginTop : 16,
    justifyContent: 'center',
    alignItems : 'center',
  },
  txtNext : {
    fontSize: theme.SmallFont,
    color: theme.primaryTextColor,

  },
  nextIcon : {
    width : 14,
    height : 14,
    resizeMode : 'contain',
    marginLeft : 8,
    marginTop : 4,
    tintColor : theme.primaryColor
  },
  btnViewNext : {
    width : '100%',
    alignItems : "center",
    justifyContent: 'center',
    marginTop : 16
  },
  pickerView : {
    height: 35, 
    width:'90%', 
    justifyContent: 'center',
    
  },
  userCathegoryView : {
    flex : 1,
    color : theme.primaryTextColor,
    fontFamily : theme.subHeaderFont,
    marginBottom : 8,
    fontSize : theme.SmallFont
  },
  
});