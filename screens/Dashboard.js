import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "../navigation/DrawerNavigator";
import StudentList from "./StudentList";


export default class Dashboard extends React.Component {

  render(){
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
  }
}
