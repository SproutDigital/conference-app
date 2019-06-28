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
  //End of nav
  exitTxt: {
    fontSize: 40,
    color: colors.text_color,
    fontFamily: 'Poppins-Regular',
    marginLeft: 16,
    marginTop : 50
  },
  // Phone input with modal design
  input: {
    flex: 1,
    fontFamily : theme.subHeaderFont,
    fontSize : theme.SmallFont,    
    color: theme.primaryTextColor,
    paddingLeft : 16
    // backgroundColor : colors.field_color,
  },
  formView: {
    flexDirection: 'column',
    width : '100%',
    paddingTop : 2,
    borderBottomWidth: 0.5,
    borderBottomColor : theme.secondaryTextColor,
    marginTop : 16,
  },
  formHeaderTxt: {
    fontSize: theme.MediumFont,
    color: theme.secondaryTextColor,
    fontFamily: theme.inputHintFont,
  },
  phoneView : {
    flexDirection : 'row',
    width : '100%',
    height : 30,
    borderRadius : 4,
    borderWidth : 1,
    borderColor : theme.colorAccent,
    marginTop : 4,
    // justifyContent: 'center',
    alignItems : 'center',
    backgroundColor : theme.colorAccent
  },
  penIcon : {
    width : 16,
    height : 16,
    resizeMode : 'contain',
    marginLeft : 8,
    marginBottom : 2,
    tintColor : theme.primaryColor
  },
  modalTp : {
    // backgroundColor: theme.backgroundColor,
    width : 50,
    height : 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth : 1,
    borderColor : theme.colorAccent,
    flexDirection : 'row',
  },
  flagstyles : {
    fontSize : theme.SmallFont,
  },
  countryStyle: {
    flex: 1,
    backgroundColor: theme.colorAccent,
    borderTopColor: colors.textInput_border,
    borderTopWidth: 1,
    padding: 12,
  },
  iconStyle: {
    color: theme.primaryColor,
    fontSize: theme.MediumFont,
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
    borderRadius : 30,
    backgroundColor : theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBtn: {
    fontSize: theme.SmallFont,
    color: theme.colorAccent,
    fontFamily: theme.secondaryFont,
  },
  downArrow : {
    width : 10,
    height : 10,
    resizeMode : 'contain',
    marginLeft : 8,
    marginBottom : 2,
    tintColor : theme.primaryColor
  },
  // End
});