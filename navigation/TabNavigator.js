import React from "react";
import {StyleSheet} from "react-native";
import StudentList from "../screens/StudentList";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddStudent from "../screens/AddStudent";
import {RFValue} from "react-native-responsive-fontsize";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Loading from "../screens/Loading"
const Tab = createBottomTabNavigator();

export default class TabNavigator extends React.Component{
constructor(props){
  super(props)
  this.state={
  isUpdated: false
  }
}


 renderList = props => {
    return <StudentList setUpdateToFalse={this.removeUpdated} {...props} />;
  };

  renderAdd = props => {
    return <AddStudent setUpdateToTrue={this.changeUpdated} {...props} />;
  };

  changeUpdated = () => {
    this.setState({ isUpdated: true });
  };

  removeUpdated = () => {
    this.setState({ isUpdated: false });
  };

  render(){
    return(
      <Tab.Navigator
      labeled={false}
        screenOptions={({route})=>({
          tabBarIcon : ({focused,size,color})=>{
            let iconName;
            if(route.name == "StudentList"){
              iconName = focused ? "people" : "people-outline"
            }
            else if(route.name == "AddStudent"){
              iconName = focused ? "person-add" :"person-add-outline"
            }
            return(
              <Ionicons
                name={iconName}
                color={color}
                size={RFValue(25)}
              />
            )
          }
        })}
        tabBarOptions={{
        activeTintColor:"white",
        inactiveTintColor:"grey",

        }}
      >
        <Tab.Screen name="StudentList" component={this.renderList} options={{ unmountOnBlur: true ,
           headerShown:false, 
           tabBarActiveBackgroundColor:"#2f345d",
           tabBarInactiveBackgroundColor:"#2f345d",}}/>
        <Tab.Screen name="AddStudent" component={this.renderAdd} options={{ unmountOnBlur: true ,
          headerShown:false, 
          tabBarActiveBackgroundColor:"#2f345d",
          tabBarInactiveBackgroundColor:"#2f345d",}}/>
      </Tab.Navigator>
    )
  }
}

const styles = StyleSheet.create({
  bottomTabStyle: {
    backgroundColor: "#2f345d",
    height: "8%",
    borderTopLeftRadius: RFValue(30),
    borderTopRightRadius: RFValue(30),
    overflow: "hidden",
    position: "absolute"
  },
});
