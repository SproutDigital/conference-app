import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');
import { Constants } from 'expo';
import colors from '../../assets/colors';
import theme from '../../assets/theme';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
     
    //backgroundColor: colors.background_color,
  },
    navbarStyle: {
    paddingTop: Constants.statusBarHeight,
    height: Constants.startHeaderHeight,
    backgroundColor: colors.green,
    borderBottomWidth: 1,
    borderBottomColor: colors.green,

  },
  headerItem: {
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight:16,
    paddingBottom: 10,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',

  },
  divider : {
    width: '100%',
    height: 1,
    backgroundColor: colors.divider,
  },
  imageLogo: {
    height: 24,
    width: 24,
    tintColor: colors.white,
    marginLeft : 16
  },
  profileTxt: {
    fontSize: 18,
    fontFamily: theme.subHeaderFont,
    color: colors.white,
  },
  backIcon: {
    height: 20,
    width: 20,
    tintColor: colors.white,
  },
  toolbarView : {
    width : '100%',
    justifyContent : 'center',
    alignItems : 'center',
    paddingRight : 24
  },
  headerItem : {
    height : 150,
    backgroundColor : colors.white,
    justifyContent : 'center',
    alignItems : 'center',
  },
  touchView : {
    flexDirection : 'row',
    backgroundColor : colors.green,
    alignItems : 'center',
    height : 50,
    paddingLeft : 16,
    position : 'relative',
    bottom : 0,
  },
  imageStyle : {
    height : 60,
    width : 60,
    borderRadius : 100
  },
  logoutIcon : {
    height : 18,
    width : 18,
    tintColor : colors.white,
  },
  LogoutTxt : {
    fontSize : 14,
    fontFamily : theme.subHeaderFont,
    color : colors.white,  
    paddingLeft : 8
  },
  drawerImageView : {
    flexDirection : 'row',
    backgroundColor : colors.field_color,
    alignItems : 'center',
    height : '20%'
  },
  userDetailView : {
    flexDirection : 'column',
    // paddingTop : 16,
  },
  txtuser: {
    fontFamily : theme.subHeaderFont, 
    marginLeft : 15,
    
  },
  sideMenuContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    // alignItems: 'center',
    // paddingTop: 10,
    
  },
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 70,
    // marginTop: 20,
    borderRadius: 180,
  },
});