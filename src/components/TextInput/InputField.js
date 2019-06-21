'use strict';

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../assets/colors';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import FloatingLabel  from 'react-native-floating-labels';


export default class InputField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      secureInput: props.inputType === 'password',
      inputValue: props.value,
    };
    this.toggleShowPassword = this.toggleShowPassword.bind(this);
    this.onChangeText = this.onChangeText.bind(this);
  }

  toggleShowPassword() {
    this.setState({ secureInput: !this.state.secureInput });
  }

  onChangeText = (text) => {
    this.props.onChangeText(text);
    this.setState({ inputValue: text });
  }

  render() {
    const {
      inputType,
      autoFocus,
      placeholder,
      maxLength,
      returnKeyType,
    } = this.props;

    const { secureInput, inputValue } = this.state;
    const borderBottom =  colors.button_border || 'transparent';

    let keyboardType;

    if(inputType === 'email'){
      keyboardType = 'email-address';

    }
    else if(inputType === 'number'){
      keyboardType = 'numeric';
    }
  

    return (
      <View style={[ styles.wrapper]}>
       
        {/* {inputType === 'password'
          ? (
            <TouchableOpacity
              style={styles.showButton}
              onPress={this.toggleShowPassword}
            >
              <Text style={styles.showButtonText}>
                {secureInput ? 'Show' : 'Hide'}
              </Text>
            </TouchableOpacity>
          )
          : null } */}
   
        <FloatingLabel
         style={[{ borderBottomColor: borderBottom }, styles.inputFields]}
         inputStyle={styles.input}
         labelStyle={styles.labelInput}
          secureTextEntry={secureInput}
          onChangeText={this.onChangeText}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          autoCorrect={false}
          underlineColorAndroid="transparent"
          maxLength={maxLength}
          returnKeyType={returnKeyType}
          //defaultValue={inputValue}
          value={inputValue}
        >
          {placeholder}
        </FloatingLabel>
        
      </View>
    );
  }
}

InputField.propTypes = {
  //labelText: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  onChangeText: PropTypes.func,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  inputStyle: PropTypes.object,
  placeholder: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
  },

  inputFields: {
    borderBottomWidth: 1,
    borderBottomColor: colors.button_border  
  },

  input: {
    borderWidth: 0,
    color: colors.text_color,
    fontSize: 14,
    paddingLeft: 10,
    fontFamily: 'Montserrat-Regular',

  },

  labelInput: {
    color: colors.text_color,
    fontFamily: 'Montserrat-Regular',
  },


  showButton: {
    position: 'absolute',
    right: 0,
  },
  showButtonText: {
    color: colors.button_border,
    fontWeight: '700',
  },
});
