import React from "react";
import Login from "./screens/Login";
import Logout from "./screens/Logout";
import Dashboard from "./screens/Dashboard";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import firebase from "firebase";
import Loading from "./screens/Loading";
import StudentList from "./screens/StudentList";
import firebaseConfig from "./config";
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

export default class App extends React.Component{

 render(){
   return(
     <Dashboard/>
   )
 } 
}

