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
  TouchableOpacity,
  FlatList
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
import db from '../config';
export default class FeesTemplate extends React.Component{
constructor(props){
  super(props)
  this.state={
    student:[],
    userId:firebase.auth().currentUser.email,
  }
}

  componentDidMount(){
    this.getStudent()
  }

  getStudent = () => {
    db.collection("users").doc(this.state.userId).collection("fees")
      .get()
      .then(snapshot => {
        snapshot.docs.map(doc => {
          this.setState({
            student: [...this.state.student, doc.data()],
          });
        });
     this.props.setUpdateToFalse()
      });
  };

  renderItem = ({ item, i }) => {
    return (
      <View style={styles.card}>
      <View style={styles.main}>
        <View style={styles.sub}>
        <Text style={styles.subText} >Std: {item.std}({item.board})</Text>
        <Text style={styles.subText}>|</Text>
        <Text style={styles.subText} >Fees: {item.fees}</Text>        
        </View>
        <TouchableOpacity style={styles.btn} onPress={()=>{
          db.collection("users").doc(this.state.userId).collection("fees").doc(`${item.std}(${item.board})`).delete()
          .then(
            this.props.navigation.navigate("--------------------")
          )}} >
          <Ionicons name={"trash"} size={RFValue(30)} color={"white"} /><Text style={styles.btntext}>Delete</Text>
       </TouchableOpacity>
      </View>
      </View>
    );
  };


  render(){
    return(
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}/>
      <View style={styles.title}>
      <Image style={{width:RFValue(75) , height:RFValue(75) , marginRight:RFValue(10)}} source={require("../assets/Logo.png")} />
        <Text style={styles.titletext}>Teacher's App</Text>
      </View>
      <FlatList
            style={{height:200}}
            data={this.state.student}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
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
  titletext:{
    color:"white",
    fontSize:RFValue(25),
    fontWeight:"bold",
    fontFamily:"algerian",
  },
  text:{
    color:"white",
    fontSize:RFValue(25),
    fontWeight:"bold",
    fontFamily:"algerian"
  },
  subText:{
    color:"white",
    fontSize:RFValue(20),
    fontWeight:"bold",
    marginLeft:RFValue(10),
    marginRight:RFValue(10),
  },
  card:{
    borderWidth:RFValue(1),
    margin: RFValue(13),
    backgroundColor: "#2f345d",
    borderRadius: RFValue(20),
    width:RFValue(350),
  },
  sub:{
    flexDirection:"row",
    justifyContent:"space-evenly"
  },
  main:{
    margin:RFValue(10),
    textAlign:"center",
    alignItems:"center",
  },
    btn:{
    backgroundColor:"red",
    width:RFValue(150),
    height:RFValue(40),
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:RFValue(10),
    flexDirection:"row",
    marginTop:RFValue(10)
  },
btntext:{
    fontSize:RFValue(15),
    fontWeight:"bold",
    color:"white",
    textAlign:"center",
  },
  })