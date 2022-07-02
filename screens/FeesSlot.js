import React from "react";
import {RFValue} from "react-native-responsive-fontsize";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  TouchableOpacity,
  Modal
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
import db from '../config';
export default class FeesSlot extends React.Component{
  constructor(props){
    super(props)
    this.state={
      fees:"",
      board:"",
      std:"",
      userId : firebase.auth().currentUser.email,
      isModalVisible:false,
    }
  }

  

  addFees=()=> {
      console.log(this.state.userId);
      console.log({
        std:this.state.std,
        board:this.state.board,
        fees:this.state.fees,
        })
   db.collection("users").doc(this.state.userId).collection("fees").doc(`${this.state.std}(${this.state.board})`)
   .set({
        std:this.state.std,
        board:this.state.board,
        fees:this.state.fees,
        })
        this.props.setUpdateToTrue()
      this.props.navigation.navigate("FeesTemplate")
    
   
  }

  showModal = ()=>{
    return(
      <Modal
        animationType="none"
        transparent={true}
        visible={this.state.isModalVisible}>
      <View style={styles.container2}>
      <TouchableOpacity
      style={{width:"100%",alignContent:"right",alignItems:"right",justifyContent:"right"}}
        onPress={()=>
            this.setState({
              isModalVisible:false,
            })
            }
        >
        <Ionicons name={"close-circle-outline"} size={RFValue(40)} color={"black"}/>
        </TouchableOpacity>
      <Image
          source={require('../assets/Logo.png')}
          style={styles.sideMenuProfileIcon}></Image> 
        <TouchableOpacity style={styles.btn3}
          onPress={()=>{
            this.props.navigation.navigate("Home"),this.setState({
              "isModalVisible":false
            })
           }}
        >
          <Text style={styles.btntext2} >Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn2}
          onPress={()=>{
            this.props.navigation.navigate("Fees"),this.setState({
              "isModalVisible":false
            })
           }}
        >
          <Text style={styles.btntext}>View / Create Fees Template</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn3}
          onPress={()=>{
            this.props.navigation.navigate("Logout")
          }}
        >
          <Text style={styles.btntext2}>Logout</Text>
        </TouchableOpacity>
      </View>
      </Modal>
    )
  }

  render(){
    return(
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}/>
      <View style={styles.title}>
      <Image style={{width:RFValue(75) , height:RFValue(75) , marginRight:RFValue(10)}} source={require("../assets/Logo.png")} />
        <Text style={styles.titletext}>Teacher's App</Text>
      </View>
      <View style={styles.main}>
        <View style={styles.textCon}>
        <Text style={styles.text}>Std : </Text>
        <TextInput placeholder={"Enter Std"} placeholderTextColor={"white"} style={styles.inputFont}
          onChangeText={(text)=>{
            this.setState({
              std:text
            })
          }}
        />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Board : </Text>
        <TextInput placeholder={"Enter School Board"} placeholderTextColor={"white"} style={styles.inputFont} 
          onChangeText={(text)=>{
            this.setState({
              board:text
            })
          }}
        />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Fees : </Text>
        <TextInput placeholder={"Enter Fees"} placeholderTextColor={"white"} style={styles.inputFont} keyboardType={"number-pad"}
          onChangeText={(text)=>{
            this.setState({
              fees:text
            })
          }}
        />
        </View>
        <View style={styles.textCon}>
          <TouchableOpacity style={styles.btn} onPress={this.addFees} >
            <Text style={styles.btntext}>Add Slot</Text>
          </TouchableOpacity>
        </View>
        </View>
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#15193c",
    alignItems:"center"
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
    width:RFValue(200)
  },
  textCon:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignItems:"center",
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
  },
  btn:{
    backgroundColor:"red",
    width:RFValue(150),
    height:RFValue(40),
    alignItems:"center",
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
  btntext2:{
    fontSize:RFValue(15),
    fontWeight:"bold",
    color:"black",
    textAlign:"center",
  },
  btn2:{
    backgroundColor:"#15193c",
    width:"90%",
    height:RFValue(40),
    textAlign:"center",
    alignItems:"center",
    
    justifyContent:"center",
    borderRadius:RFValue(10),
    flexDirection:"row",
  },
  btn3:{
    backgroundColor:"white",
    width:"90%",
    height:RFValue(40),
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:RFValue(10),
    flexDirection:"row",
  },
  container2:{
    flex:1,
    borderRadius:RFValue(20),
    alignItems:'center',
    justifyContent:"center",
    backgroundColor:"#ffff",
    marginRight:RFValue(30),
    marginLeft : RFValue(30),
    marginTop:RFValue(146),
    marginBottom:RFValue(120),
  },
  sideMenuProfileIcon: {
    width: RFValue(250),
    height: RFValue(250),
    borderRadius: RFValue(70),
    resizeMode: 'contain',
  },
  })