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
import { createDrawerNavigator } from "@react-navigation/drawer";
import FeesSlot from '../screens/FeesSlot';
import FeesTemplate from '../screens/FeesTemplate';
import TabNavigator from './TabNavigator';
import Loading from "../screens/Loading";
import Loading2 from "../screens/Loading2";
import { DrawerActions } from '@react-navigation/native';
import Login from '../screens/Login';
import firebase from 'firebase'
import firebaseConfig from "../config"
const Drawer = createDrawerNavigator();


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
 <Drawer.Navigator 
          initialRouteName={"Logout"}
          drawerContentOptions={{
          activeTintColor: "white",
          activeBackgroundColor:"#15193c",
          inactiveTintColor: "black",
          itemStyle: { marginVertical: 5 }
        }}
        drawerContent={props => <CustomSidebar {...props} />}
 >
        <Drawer.Screen
          name="Home"
          component={TabNavigator}
          options={{ unmountOnBlur: true ,
             headerShown:false
           }}
          />
        <Drawer.Screen
          name="FeesTemplate"
          component={this.renderList}
          options={{ unmountOnBlur: true ,
             headerShown:false
           }}
        />
        <Drawer.Screen
          name="FeesSlot"
          component={this.renderAdd}
          options={{ unmountOnBlur: true ,
             headerShown:false
            }}
        />
        <Drawer.Screen
          name="Logout"
          component={Login}
          options={{ unmountOnBlur: true ,
             headerShown:false,
             swipeEnabled:false,
          swipeEdgeWidth:0,
           }}
        />
        <Drawer.Screen
          name="---------------------"
          component={this.renderL}
          options={{ unmountOnBlur: true,
             headerShown:false,
          }}
        />
        <Drawer.Screen
          name="--------------------"
          component={this.renderL2}
          options={{ unmountOnBlur: true,
             headerShown:false,
          }}
        />  
      </Drawer.Navigator>
    )
  }
}