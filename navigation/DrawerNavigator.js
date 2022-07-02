import React , { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
  StatusBar,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import CustomSidebar from "../screens/CustomSidebar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeesSlot from '../screens/FeesSlot';
import FeesTemplate from '../screens/FeesTemplate';
import TabNavigator from './TabNavigator';
import TabNavigator1 from './TabNavigator1';
import Loading from "../screens/Loading";
import Loading2 from "../screens/Loading2";
import { DrawerActions } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from '../screens/Login';
import firebase from 'firebase'
import firebaseConfig from "../config"
const Drawer = createBottomTabNavigator();


export default class DrawerNavigator extends Component{
  constructor(props){
  super(props)
  this.state={
  isUpdated: false
  }
}



 renderList = props => {
    return <FeesTemplate setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderAdd = props => {
    return <FeesSlot setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  renderL = props => {
    return <Loading setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  renderL2 = props => {
    return <Loading2 setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };



  render(){
    return(
      <Drawer.Navigator backBehavior="none" >
      <Drawer.Screen
        name="Logout"
        component={Login}
        options={{ unmountOnBlur: true ,
           headerShown:false,
           tabBarStyle:[{display:"none"}]
         }}
      />
      <Drawer.Screen
        name="Home"
        component={TabNavigator}
        options={{
           headerShown:false,
           tabBarStyle:[{display:"none"}]
         }}
        />
      <Drawer.Screen
        name="Fees"
        component={TabNavigator1}
        options={{
           headerShown:false,
           tabBarStyle:[{display:"none"}]
         }}
      />
    </Drawer.Navigator>
    )
  }
}