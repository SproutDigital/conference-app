'use strict';
import React, { Component } from 'react';
import { View, StyleSheet, SafeAreaView, Image, Text } from 'react-native';
import { Icon } from 'react-native-elements';
import colors from '../../assets/colors';
import styles from './styles';
import theme from '../../assets/theme';

const dashboard = require('../../assets/images/home.png'),
 profile = require('../../assets/images/profile.png'),
 notification = require('../../assets/images/notification.png'),
 settings = require('../../assets/images/setting.png'),
 logout = require('../../assets/images/logout.png');

export default class CustomSidebarMenu extends Component {
  constructor() {
    super();
    this.items = [
      {
        navOptionThumb: dashboard,
        navOptionName: 'DashBoard',
        screenToNavigate: 'DashBoard',
      },
      {
        navOptionThumb: profile,
        navOptionName: 'Profile',
        screenToNavigate: 'Profile',
      },
      {
        navOptionThumb: notification,
        navOptionName: 'Notification',
        screenToNavigate: 'Notification',
      },
      {
        navOptionThumb: settings,
        navOptionName: 'Settings',
        screenToNavigate: 'Settings',
      },
      { 
        navOptionThumb: logout,
        navOptionName: 'Logout',
        screenToNavigate: 'Logout',
      },
      
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
              Mr Ciroma Hassan
            </Text>
            <Text style = {styles.txtuser}>
              Speaker
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
                
                {/* <Icon name={item.navOptionThumb} size={25} color="#0F959A" /> */}

              <Image
                source = {item.navOptionThumb}
                style={styles.draweIcon}/>
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