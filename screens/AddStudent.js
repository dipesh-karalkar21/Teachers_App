import React from "react";
import {RFValue} from "react-native-responsive-fontsize";
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
import StudentList from "./StudentList";
import firebase from "firebase";
import db from '../config';
export default class AddStudent extends React.Component{
  constructor(props){
    super(props)
    this.state={
      name:"",
      std:"",
      board:"",
      fees:"",
      date:"",
      userId : firebase.auth().currentUser.email,
    }
  }

  addStudent=()=> {
      console.log(this.state.userId);
      console.log({
        name:this.state.name,
        std:this.state.std,
        board:this.state.board,
        fees:this.state.fees,
        date:this.state.date,
        })
   db.collection("users").doc(this.state.userId).collection("student").doc(this.state.name)
   .set({name:this.state.name,
        std:this.state.std,
        board:this.state.board,
        fees:this.state.fees,
        date:this.state.date,
        })
      this.props.setUpdateToTrue()
      //toast.success("Student added successfully",{position:toast.POSITION.BOTTOM_CENTER})
      this.props.navigation.navigate("StudentList")
  }
  render(){
    return(
      <View style={styles.container}>
      <ScrollView>
      <SafeAreaView style={styles.droidSafeArea}/>
      <View style={styles.title}>
      <Image style={{width:RFValue(75) , height:RFValue(75) , marginRight:RFValue(10)}} source={require("../assets/Logo.png")} />
        <Text style={styles.titletext}>Teacher's App</Text>
      </View>
      <View style={styles.main}>
      <View style={styles.image}>
        <Image source={require("../assets/Profile.png")} style={{width:RFValue(200) , height:RFValue(200)}}/>
      </View> 
        <View style={styles.textCon}>
        <Text style={styles.text}>Name : </Text>
        <TextInput placeholder={"Enter Student Name"} placeholderTextColor={"white"} style={styles.inputFont}
          onChangeText={(text)=>{
            this.setState({
              name:text,
            })
          }}
        />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Std :</Text>
        <TextInput placeholder={"Enter Student's Std"} placeholderTextColor={"white"} style={styles.inputFont} keyboardType={"number-pad"} 
          onChangeText={(text)=>{
            this.setState({
              std:text,
            })
          }}
        />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Board :</Text>
        <TextInput placeholder={"Enter the Student's School Board"} placeholderTextColor={"white"} style={styles.inputFont} 
          onChangeText={(text)=>{
            this.setState({
              board:text,
            })
          }}
        />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text} keyboardType={"number-pad"}>Fees :</Text>
        <TextInput placeholder={"Enter the Student's Fees"} placeholderTextColor={"white"} style={styles.inputFont} keyboardType={"number-pad"}
          onChangeText={(text)=>{
            this.setState({
              fees:text,
            })
          }}
        />
        </View>
        <View style={styles.mtextCon}>
        <View>
        <Text style={styles.text}>Joining :</Text>
        <Text style={styles.text}>Date </Text>
        </View>
        <TextInput placeholder={"DD.MM.YY"} placeholderTextColor={"white"} style={styles.inputFont} keyboardType={"number-pad"}
          onChangeText={(text)=>{
            this.setState({
              date:text,
            })
          }}
        />
        </View>
        <View style={styles.ntextCon}>
          <TouchableOpacity style={styles.btn} onPress={this.addStudent}>
            <Text style={styles.btntext}>Add Student</Text>
          </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#15193c",
    alignItems:"center",
  },
  droidSafeArea: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
  },
  title:{
    textAlign:"center",
    flexDirection:"row",
    justifyContent:"center",
    alignItems:"center"
  },
  image:{
    justifyContent:"center",
    alignItems:"center",
    marginTop:RFValue(10)
  },
  inputFont: {
    height: RFValue(40),
    borderColor: "white",
    borderWidth: RFValue(1),
    borderRadius: RFValue(10),
    paddingLeft: RFValue(10),
    color: "white",
    width:RFValue(225)
  },
  textCon:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginTop:RFValue(20)
  },
  ntextCon:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
    marginTop:RFValue(20),
    marginBottom:RFValue(60)
  },
  mtextCon:{
    flexDirection:"row",
    justifyContent:"space-around",
    marginTop:RFValue(20)
  },
  text:{
    color:"white",
    fontSize:RFValue(20),
    fontWeight:"bold"
  },
  titletext:{
    color:"white",
    fontSize:RFValue(25),
    fontWeight:"bold",
    fontFamily:"algerian"
  },
  btn:{
    backgroundColor:"red",
    width:RFValue(150),
    height:RFValue(40),
    textAlign:"center",
    justifyContent:"center",
    borderRadius:RFValue(10)
  },
btntext:{
    fontSize:RFValue(15),
    fontWeight:"bold",
    color:"white",
    textAlign:"center"
  },
})