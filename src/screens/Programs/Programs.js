'use strict';
import React, {Component} from 'react';
import { View, FlatList, SafeAreaView, StatusBar, Image, TouchableOpacity, StyleSheet,} from 'react-native';
import {DisplayText, InputField} from '../../components';
import styles from './styles';
import theme from '../../assets/theme';
import {connect} from 'react-redux';
import moment from 'moment';

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

  dateToFromNowDaily = (item ) =>{
    let eDate  = `${item.date}`;
    // get from-now for this date
    var fromNow = moment(eDate, "YYYY-MM-DD HH:mm" ).fromNow();

    // ensure the date is displayed with today and yesterday
    return moment(eDate, "YYYY-MM-DD HH:mm").calendar( null, {
        lastWeek: '[Last] dddd',
        lastDay:  '[Happened Yesterday]',
        nextDay:  '[Tomorrow]',
        nextWeek: 'dddd',
        sameDay: function (now) {
          if (this.isAfter(now)) {
            return '[Will Happen Today]';
          } else {
            return '[Happened Today]';
          }
        },            
        sameElse: function () {
          return "[" + fromNow + "]";
        }
    });
  }


  showEventDate(item) {
    let formatedDate = this.dateToFromNowDaily(item);

    if(formatedDate.includes('in')) {
     return( <DisplayText
        text = {`${formatedDate} ${item.start_time}`}
        styles = {StyleSheet.flatten(styles.timeText)}
      />)
    }
    else if(formatedDate === 'Happened Yesterday') {
      return( <DisplayText
        text = {formatedDate}
        styles = {StyleSheet.flatten(styles.timeText)}
      /> )
    }
    else if(formatedDate.includes('Will')) {
      return( <DisplayText
        text = {`${'Today'} ${item.start_time} - ${item.end_time}`}
          styles = {StyleSheet.flatten(styles.timeText)}
        />
      )
    }
    else if(formatedDate.includes('Happened')) {
      return( <DisplayText
       text = {`${'Happened Today'} ${item.start_time} - ${item.end_time}`}
        styles = {StyleSheet.flatten(styles.timeText)}
      />)
    }
    else if(formatedDate.includes('Tomorrow')) {
      return( <DisplayText
       text = {`${formatedDate} ${item.start_time} - ${item.end_time}`}
        styles = {StyleSheet.flatten(styles.timeText)}
      />)
    }
    else {
      return( <DisplayText
        text = {`${formatedDate} ${item.start_time} - ${item.end_time}`}
         styles = {StyleSheet.flatten(styles.timeText)}
       />)
    }
        
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

  handleViewProgram = program => {
    return this.props.navigation.navigate('ProgramDetails', {
      'program' : program,
    });
  }
  renderRow = ({item}) => {
    let items = [];
    if( item.tags) {
      items = item.tags.map((row, i ) => {
        return (
          <TouchableOpacity 
            onPress = {()=>this.handleViewProgram(item)}
            key={i} style = {styles.buttonTagView}>
            <DisplayText
              onPress = {()=>this.handleViewProgram(item)}
              text = {row}
              styles = {StyleSheet.flatten(styles.btnText)}
            /> 
          </TouchableOpacity>
        )
      })
    } 
    //console.log({item})
    return (
      <View style = {styles.listViewItem}>    
        <TouchableOpacity 
          onPress = {()=>this.handleViewProgram(item)}
          style = {styles.cardView}>
        <View style = {styles.cardHeaderView}>
          <View style = {styles.headerProgramView}>
            <DisplayText
              onPress = {()=>this.handleViewProgram(item)}
              text = {item.title}
              styles = {StyleSheet.flatten(styles.headerText)}
            />
          </View>
          <TouchableOpacity 
              onPress = {()=>this.handleViewProgram(item)}
              style = {styles.buttonView}>
            <DisplayText
              onPress = {()=>this.handleViewProgram(item)}
              text = {item.type }
              styles = {StyleSheet.flatten(styles.btnText)}
            /> 
          </TouchableOpacity>
        </View>
         {this.showEventDate(item)}
          <DisplayText
            onPress = {()=>this.handleViewProgram(item)}
            numberOfLines = { 2 } 
            ellipsizeMode = 'middle'
            text = {item.description}
            styles = {StyleSheet.flatten(styles.cardTxtBody)}
          />
          <DisplayText
            onPress = {()=>this.handleViewProgram(item)}
            text = {item.venue}
            styles = {StyleSheet.flatten(styles.nameText)}
            />
          <View style = {styles.tagsView}>
            
            <View style ={{width: '93%', flexDirection: 'row'}}>
              {items}
            </View>
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
      <StatusBar barStyle="default"/>
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

