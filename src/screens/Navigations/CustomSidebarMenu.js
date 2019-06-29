'use strict';
import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../assets/colors';
import styles from './styles';
import theme from '../../assets/theme';
export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.items = [
      {
        navOptionThumb: 'camera',
        navOptionName: 'DashBoard',
        screenToNavigate: 'DashBoard',
      },
      // {
      //   navOptionThumb: 'build',
      //   navOptionName: 'Investment',
      //   screenToNavigate: 'Investment',
      // },
      { 
        navOptionThumb: 'build',
        navOptionName: 'Logout',
        screenToNavigate: 'Logout',
      },
      // {
      //   navOptionThumb: 'build',
      //   navOptionName: 'Account/Settings',
      //   screenToNavigate: 'ManageAccount',
      // },
      // {
      //   navOptionThumb: 'build',
      //   navOptionName: 'Logout',
      //   screenToNavigate: 'Logout',
      // },
    ];
  }
  render() {
    return (
      <SafeAreaView style={styles.sideMenuContainer}>
        {/*Top Large Image */}
        <View style = {styles.drawerImageView}>
          <Image
            source = {require('../../assets/images/sample_pics.png')}
            style={styles.sideMenuProfileIcon}
          />
          <View style = {styles.userDetailView}>
            <Text style = {styles.txtuser}>
              Hi, John
            </Text>
            <Text style = {styles.txtuser}>
              doe@gmail.com
            </Text>
          </View>
        </View>
        {/*Divider between Top Image and Sidebar Option*/}
        <View style={styles.divider}/>
        {/*Setting up Navigation Options from option array using loop*/}
        <View style={{ width: '100%' }}>
          {this.items.map((item, key) => (
            <View key = {key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingTop: 10,
                paddingBottom: 10,
                backgroundColor: global.currentScreenIndex === key ? colors.field_color : colors.white,
                borderLeftWidth: global.currentScreenIndex === key ? 4 : 0,
                borderColor : colors.green_background,
              }}>
                
              <View style={{ marginRight: 10, marginLeft: 20 }}>
                {/* <Image
                  source = {require('../../assets/images')}
                  style={styles.sideMenuProfileIcon}
                /> */}
                <Icon name={item.navOptionThumb} size={25} color="#0F959A" />
              </View>
              <Text
                style={{
                  fontSize: 15,
                  fontFamily : theme.subHeaderFont,
                  color: global.currentScreenIndex === key ? '#ABABAB' : colors.darkSilver,
                }}
                key = {key}
                onPress={() => {
                  global.currentScreenIndex = key;
                  this.props.navigation.navigate(item.screenToNavigate);
                }}>
                {item.navOptionName}
              </Text>
            </View>
          ))}
        </View>
      </SafeAreaView>
    );
  }
}