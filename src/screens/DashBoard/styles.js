import { StyleSheet, Dimensions, Platform } from 'react-native';
const window = Dimensions.get('window');
import colors from '../../assets/colors';
import theme from '../../assets/theme';
import Constants from 'expo-constants';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor : colors.backGround,
  },
  navBar: {
    flexDirection : 'row',
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
    color: theme.primaryColor,
    marginLeft: 16,
    alignSelf: 'center',
    
  },
  exitTxt: {
    fontSize: 40,
    color: colors.text_color,
    fontFamily: 'Poppins-Regular',
    marginLeft: 16
  },
  sliderView : {
    backgroundColor : colors.buttonBlue,
    width : '100%',
    shadowOpacity: 0.25, 
    shadowOffset: {height: 2, width:0},
    shadowColor: theme.textGray, 
    shadowRadius: 2.56,
    elevation : 1,
  },
  tileView : {
    flex : 1,
    marginTop :8,
    paddingLeft : 16,
    paddingRight : 16,
  },
  boxViews : {
    flex : 1,
    width : '100%',
    flexDirection : 'row',
    flexWrap : 'wrap',
    marginBottom :8,
    justifyContent: 'space-evenly',

  },
  boxes : {
    width : 100,
    height : 100,
    backgroundColor : 'rgba(255,255,255,0.8)',
    borderRadius : 4,
    justifyContent: 'center',
    alignItems : 'center',
    flexDirection : 'column',
    marginTop : 8
  },
  boxIcon : {
    height : 30,
    width : 30,
    resizeMode : 'contain',
    tintColor : theme.primaryColor,
  },
  boxText : {
    fontFamily : theme.inputHintFont,
    fontSize : theme.thinyFont,
    color : theme.secondaryTextColor,
    marginTop : 8,

  },
  sliderDot : {
    width : '100%',
    height : 30,
    backgroundColor : 'rgba(0,0,0,0.5)',
    position : 'absolute',
    bottom : 0,
    flexDirection: 'row'
  },
  sliderTxtView : {
    width : '80%',
    paddingLeft : 8,
  },
  dotsView : {
    flexDirection : 'row',
    paddingRight : 8,
    justifyContent: 'center',
    alignItems : 'center'
  },
  dots : {
    height : 8,
    width : 8,
    backgroundColor : theme.colorAccent,
    borderRadius : 8,
    padding : 2,
    marginLeft : 4,
  }  
});