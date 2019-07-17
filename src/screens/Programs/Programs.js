'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import {connect} from 'react-redux';

class Programs extends Component {
  constructor(props) {
    super(props);
    this.state ={
      message : '',
      data:[],
    }
    this.arrayholder = [];

  }

  componentDidMount(){
    this.setState({
      data: this.props.program,
    });
    this.arrayholder = this.props.program;
  }

  handleOnboard = () => {
    return this.props.navigation.goBack();
  }

  searchFilterFunction = text => {
    this.setState({
      value: text,
    });
    const newData = this.arrayholder.filter(item => {
      const itemData = `${item.title.toUpperCase()} ${item.description.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    return this.setState({
      data: newData,
    });
  }

  handleViewProgram = () => {
    return this.props.navigation.navigate('ProgramDetails');
  }
  renderRow = ({item}) => {
    return (
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleViewProgram(item)}
          style = {styles.cardView}>
        <View style = {styles.cardHeaderView}>
          <DisplayText
            text = {item.title}
            styles = {StyleSheet.flatten(styles.headerText)}
          />
          <TouchableOpacity style = {styles.buttonView}>
            <DisplayText
              text = {item.type}
              styles = {StyleSheet.flatten(styles.btnText)}
            /> 
          </TouchableOpacity>
        </View>
        <DisplayText
          text = {`${item.start_time} - ${item.end_time}`}
          styles = {StyleSheet.flatten(styles.timeText)}
          />
      
          <DisplayText
            numberOfLines = { 2 } 
            ellipsizeMode = 'middle'
            text = {item.description}
            styles = {StyleSheet.flatten(styles.cardTxtBody)}
          />
          <DisplayText
            text = {'Hall 4, Long Amphitheatre, Sheraton. '}
            styles = {StyleSheet.flatten(styles.nameText)}
            />
          <View style = {styles.tagsView}>
            <TouchableOpacity style = {styles.buttonView}>
              <DisplayText
                text = {"Technology"}
                styles = {StyleSheet.flatten(styles.btnText)}
              /> 
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonView}>
              <DisplayText
                text = {"Business"}
                styles = {StyleSheet.flatten(styles.btnText)}
              /> 
            </TouchableOpacity>
            <TouchableOpacity style = {styles.buttonView}>
              <DisplayText
                text = {"TalkShow"}
                styles = {StyleSheet.flatten(styles.btnText)}
              /> 
            </TouchableOpacity>

            
            <TouchableOpacity style = {styles.plusBtn}>
              <Image
                source = {require('../../assets/images/plus_btn.png')}
                style = {StyleSheet.flatten(styles.plusIcon)}
              />
            </TouchableOpacity>
          </View>
          </TouchableOpacity> 
        </View> 
      );
    }
  
  render () {
   return(
    <SafeAreaView style={styles.container}> 
      <StatusBar barStyle="default" /> 
      <View style = {styles.navBar}>
        <TouchableOpacity
          onPress={()=>this.props.navigation.goBack()} 
          style = {styles.headerImage}>
          <Image
            onPress={()=>this.props.navigation.goBack()} 
            source = {require('../../assets/images/back.png')}
            style = {StyleSheet.flatten(styles.headerIcon)}
          />
        </TouchableOpacity>
        <View style = {styles.nameView}>
          <DisplayText
            text = {"PROGRAM"}
            styles = {StyleSheet.flatten(styles.txtHeader)}
          />
        </View>
      </View>
      <View style = {styles.viewBody}>
        <View style={styles.searchView}>
          <View style = {{flexDirection : 'row'}}>
            
            <TouchableOpacity style = {styles.iconBotton}>
              <Image
                source = {require('../../assets/images/checklist.png')}
                style = {StyleSheet.flatten(styles.searchIcon)}
              />
            </TouchableOpacity>
            <TouchableOpacity style = {styles.iconBottonSearch}>
              <Image
                source = {require('../../assets/images/search.png')}
                style = {StyleSheet.flatten(styles.checklistIcon)}
              />
            </TouchableOpacity>
            
          </View>
          
          <TouchableOpacity style = {styles.iconBottonFilter}>
            <Image
              source = {require('../../assets/images/filter.png')}
              style = {StyleSheet.flatten(styles.filterIcon)}
            />
          </TouchableOpacity>
          <InputField
            placeholder = {'Search Following'}
            placeholderTextColor = {theme.secondaryTextColor}
            textColor={theme.primaryTextColor}
            inputType={'name'}
            keyboardType={'default'}
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}            
            height = {30}
            width = {'70%'}
            borderBottomWidth = {0}
            paddingLeft  = {8}
          /> 
          
        </View>
      {/* Add this disign to you flatlist after fetching your data */}
     
      
      {/* <View> */}
      <FlatList          
        data={this.state.data}          
        renderItem={this.renderRow}          
        keyExtractor={ data=> data._id}   
        showsVerticalScrollIndicator={false}
      
      />
      {/* </View> */}

    </View>  
    
  </SafeAreaView>
    
   )
  }
} 

const mapStateToProps = (state, ownProps) =>{
  return{
    program: state.ProgramReducer.program
  }
}


export default connect(mapStateToProps)(Programs)

