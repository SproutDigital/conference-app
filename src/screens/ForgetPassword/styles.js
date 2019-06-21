import {StyleSheet} from 'react-native';
import colors from '../../assets/colors';

export default styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: colors.gold,
    fontFamily: 'Montserrat-Bold',
    fontSize: 14,
    fontWeight: '200',
    marginLeft: 8,
  },
});