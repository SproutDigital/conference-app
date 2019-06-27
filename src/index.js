'use strict';

import React, {Component} from 'react';
import { StyleSheet, View, TextInput} from 'react-native';
import * as Font  from 'expo-font';
import Navigator from './routes';
import colors from './assets/colors';
import { Provider } from 'react-redux';
import store from './redux/store';


TextInput.defaultProps.selectionColor = colors.green;

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      fontsLoaded:false,
    };
  }
  
  componentDidMount() {

    (async() => {
      await Font.loadAsync({
        'Orkney-Light' : require('../src/assets/fonts/Orkney-Light.otf'),
        'Poppins-Bold' : require('../src/assets/fonts/Poppins-Bold.ttf'),
        'Poppins-ExtraBold' : require('../src/assets/fonts/Poppins-ExtraBold.ttf'),  
        'Poppins-ExtraLight' : require('../src/assets/fonts/Poppins-ExtraLight.ttf'),
        'Poppins-Light' : require('../src/assets/fonts/Poppins-Light.ttf'),
        'Poppins-Medium' : require('../src/assets/fonts/Poppins-Medium.ttf'),
        'Poppins-Regular' : require('../src/assets/fonts/Poppins-Regular.ttf'),    
        'Poppins-Thin' : require('../src/assets/fonts/Poppins-Thin.ttf'),  
        'Poppins-SemiBold' : require('../src/assets/fonts/Poppins-SemiBold.ttf'),

      });
      
      this.setState({ fontsLoaded: true });
  
    })();
  }
  
  render() {
    const { fontsLoaded } = this.state

    return (
      
      <View style={styles.container}>
        <Provider store={store}>
          {fontsLoaded?
            <Navigator/>
            :
            null }
        </Provider> 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    elevation: 4,
  },
});