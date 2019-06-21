'use strict';

import React, {Component} from 'react';
import {PropTypes} from 'prop-types';
import colors from '../../assets/colors';
import {TouchableHighlight, StyleSheet, Text} from 'react-native';


export default class SubmitButton extends Component {

  render(){
    const {disabled, onPress, title, btnstyle, titlestyle} = this.props;
    const opacityStyle = disabled ? 0.2 : null;
    const style = btnstyle || styles.button;
    const titstyle = titlestyle || styles.title;
    
    return(
      <TouchableHighlight 
        style = {[{opacity: opacityStyle}, style]}
        disabled = {disabled}
        onPress = {onPress}>
        <Text style = {titstyle}>
          {title}
        </Text>
      </TouchableHighlight>
    );
  }
}

SubmitButton.propTypes = {
  disabled: PropTypes.bool.isRequired,
  onPress : PropTypes.func.isRequired,
  style : PropTypes.object,
  title : PropTypes.string.isRequired,

}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 45,
    marginTop: 16,
    backgroundColor: colors.green,
    borderRadius: 60,
  },

  title: {
    fontFamily: 'Montserrat-Bold',
    color: colors.white,
  },

  icon: {
    marginRight: -2,
    marginTop: -2,
  }
})