import { StyleSheet, Dimensions } from 'react-native';
const window = Dimensions.get('window');

export const IMAGE_HEIGHT = window.width / 3;
export const IMAGE_HEIGHT_SMALL = window.width /6;
import colors from '../../assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
     alignContent:'center'
  },

  slide: {
    flex: 1,
    paddingBottom: 10, 
    justifyContent: 'center',
    alignItems: 'center',
  },

  text: {
    color: 'blue',
    backgroundColor: 'transparent',
    textAlign: 'center',
    paddingHorizontal: 16,
  },

  title: {
    fontSize: 22,
    color: 'green',
    backgroundColor: 'transparent',
    textAlign: 'center',
    marginBottom: 16,
  },

});