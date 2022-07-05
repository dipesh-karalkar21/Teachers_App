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
  FlatList,
  Modal
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
    isModalVisible:false,
  }
}

  componentDidMount(){
    this.getStudent();
    
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
        <Text style={styles.subText} >Fees: {item.fees}</Text>        
       </View>
       <TouchableOpacity style={styles.btn} onPress={()=>{
          db.collection("users").doc(this.state.userId).collection("fees").doc(`${item.std}(${item.board})`).delete()
          .then(
            this.props.navigation.navigate("Loading2")
          )}} >
          <Ionicons name={"trash"} size={RFValue(30)} color={"white"} />
       </TouchableOpacity>
      </View>
      </View>
    );
  };

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
      <TouchableOpacity style={{marginRight:RFValue(10) , marginLeft:RFValue(10)}}
        onPress={()=>{
          this.props.navigation.navigate("Home")
        }}
        >
        <Ionicons name={"arrow-back"} size={RFValue(40)} color={"white"}/>
        <Text style={styles.btntext}>Back</Text>
        </TouchableOpacity>
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
  },
  text:{
    color:"white",
    fontSize:RFValue(25),
    fontWeight:"bold",
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
    justifyContent:"center",
  },
  sub:{
    flexDirection:"row",
    justifyContent:"space-evenly"
  },
  main:{
    justifyContent:"center",
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