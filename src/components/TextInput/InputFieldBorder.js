'use strict';

import React, { Component } from 'react';
import { PropTypes } from 'prop-types';
import colors from '../../assets/colors';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

export default class InputFieldBorder extends Component {
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
      labelText,
      labelTextSize,
      labelTextWeight,
      labelColor,
      textColor,
      // borderBottomColor,
      // borderBottomWidth,
      borderWidth,
      borderColor,
      borderTopRightRadius,
      borderTopLeftRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
      inputType,
      customStyle,
      formStyle,
      inputStyle,
      autoFocus,
      autoCapitalize,
      placeholder,
      placeholderTextColor,
      maxLength,
      height,
      width,
      defaultValue,
      editable,
      selectTextOnFocus,
    } = this.props;

    const { secureInput, inputValue } = this.state;
    const fontSize = labelTextSize || 16;
    const fontWeight = labelTextWeight || '700';
    const color = labelColor || colors.white;
    const inputColor = textColor || colors.white;
    const placeholderColor =  placeholderTextColor || '';
    const style = formStyle || styles.forms;
    const customInputStyle = inputStyle || {};
    if (!inputStyle || inputStyle && !inputStyle.paddingBottom) {
      customInputStyle.paddingBottom = 5;
    }

    let keyboardType;

    if(inputType === 'phone'){
      keyboardType = 'phone-pad';

    }
    else if(inputType === 'number'){
      keyboardType = 'numeric';
    } else if(inputType === 'name') {
      keyboardType = 'default';
    }
  

    return (
      <View style={[customStyle, styles.wrapper]}>
         <Text style={[{ fontWeight, color, fontSize }, styles.label]}>
          {labelText}
        </Text>
        {inputType === 'password'
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
          : null }
   
        <TextInput
          style={[{ color: inputColor }, inputStyle, styles.inputField]}         
          borderWidth={borderWidth}
          borderColor={borderColor}
          borderTopRightRadius={borderTopRightRadius}
          borderTopLeftRadius={borderTopLeftRadius}
          borderBottomLeftRadius={borderBottomLeftRadius}
          borderBottomRightRadius={borderBottomRightRadius}
          secureTextEntry={secureInput}
          onChangeText={this.onChangeText}
          keyboardType={keyboardType}
          autoFocus={autoFocus}
          autoCapitalize={autoCapitalize}
          autoCorrect={false}
          paddingLeft={8}
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor = {placeholderColor}
          defaultValue={defaultValue}
          value={inputValue}
          inputType={inputType}
          maxLength={maxLength}
          height={height}   
          width={width} 
        />
      </View>
    );
  }
}

InputFieldBorder.propTypes = {
  placeholder: PropTypes.string.isRequired,
  labelTextSize: PropTypes.number,
  labelColor: PropTypes.string,
  textColor: PropTypes.string,
  borderBottomLeftRadius: PropTypes.number,
  borderBottomRightRadius: PropTypes.number,
  borderTopRightRadius: PropTypes.number,
  borderTopLeftRadius: PropTypes.number,
  borderWidth: PropTypes.number,
  backgroundColor: PropTypes.string,
  borderColor: PropTypes.string,
  inputType: PropTypes.string.isRequired,
  customStyle: PropTypes.object,
  onChangeText: PropTypes.func,
  autoFocus: PropTypes.bool,
  autoCapitalize: PropTypes.string,
  labelTextWeight: PropTypes.string,
  inputStyle: PropTypes.object,
  defaultValue: PropTypes.string,
  placeholderTextColor: PropTypes.string,
  maxLength:PropTypes.number,
  height: PropTypes.number,
  width: PropTypes.string
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    width: '100%'
  },
  label: {
    marginBottom:1,
    fontFamily: 'Montserrat-Regular',
  },
  forms: {
    backgroundColor: colors.white,
  },
  inputField: {
    fontFamily: 'Montserrat-Regular',
    fontSize:16,
    backgroundColor: colors.white,
    height: 40,
    width: '88%',
  },
  form: {
    backgroundColor: colors.white,
  },
  showButton: {
    position: 'absolute',
    right: 0,
    //marginTop:15
  },
  showButtonText: {
    color: colors.whiteShade,
    fontWeight: '100',
    fontFamily: 'Montserrat-Regular'
  },
});
