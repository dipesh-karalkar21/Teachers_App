import React from "react";
import {StyleSheet} from "react-native";
import StudentList from "../screens/StudentList";
import Ionicons from "react-native-vector-icons/Ionicons";
import AddStudent from "../screens/AddStudent";
import Loading2 from "../screens/Loading2";
import FeesTemplate from "../screens/FeesTemplate";
import FeesSlot from "../screens/FeesSlot";
import {RFValue} from "react-native-responsive-fontsize";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const Stack = createBottomTabNavigator();

export default class TabNavigator extends React.Component{
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
      <Tab.Navigator
      labeled={false}
        screenOptions={({route})=>({
          tabBarIcon : ({focused,size,color})=>{
            let iconName;
            let iconColor;
            if(route.name == "FeesTemplate"){
              iconName = focused ? "list" : "list"
              iconColor =focused ? "white" : "grey"
            }
            else if(route.name == "FeesSlot"){
              iconName = focused ? "add-circle" :"add-circle-outline"
              iconColor =focused ? "white" : "grey"
            }
            else if(route.name == "Loading"){
              iconName = "refresh-circle"
              iconColor = "white"
            }
            return(
              <Ionicons
                name={iconName}
                color={iconColor}
                size={RFValue(25)}
              />
            )
          }
        })}
      >
        <Tab.Screen name="FeesTemplate" component={this.renderList} options={{ unmountOnBlur: true ,
          headerShown:false, 
          tabBarActiveBackgroundColor:"#2f345d",
          tabBarInactiveBackgroundColor:"#2f345d",
          tabBarActiveTintColor:"white",
          tabBarInactiveTintColor:"grey",
          }}/>
        <Tab.Screen name="Loading" component={this.renderL2} options={{ unmountOnBlur: true ,
          headerShown:false,
          tabBarLabelStyle:[{display:"none"}],
          tabBarIconStyle:[{color:"white"}]}}/>
        <Tab.Screen name="FeesSlot" component={this.renderAdd} options={{ unmountOnBlur: true ,
          headerShown:false, 
          tabBarActiveBackgroundColor:"#2f345d",
          tabBarInactiveBackgroundColor:"#2f345d",
          tabBarActiveTintColor:"white",
          tabBarInactiveTintColor:"grey",
          }}/>
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
