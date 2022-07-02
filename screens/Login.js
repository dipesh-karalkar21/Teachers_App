import React,{Component}from 'react';
import {
    View,
    Text,
    TextInput,
    Modal,
    KeyboardAvoidingView,
    StyleSheet,
    TouchableOpacity,
    Alert,
    SafeAreaView,
  Platform,
  ScrollView,
  StatusBar,
  Image,
  } from 'react-native';
  import {RFValue} from "react-native-responsive-fontsize";
//import SantaAnimation from '../components/SantaClaus.js';
import db from '../config';
import firebase from 'firebase';
import AddStudent from "./AddStudent"


export default class Login extends Component{
  constructor(props){
    super(props);
    this.state={
      email:'',
      password:'',
      firstName:'',
      lastName:'',
      address:'',
      contact:'',
      confirmPassword:'',
      isModalVisible:false,
    }
  }

  
  checkIfLoggedIn = () => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
      firebase.auth().signOut().then(
      console.log("done"),
  //    toast.success("Logged out successfully",{position:toast.POSITION.BOTTOM_CENTER})
      )
      }
       else {
         console.log("done")
      }
    });
  };

  userSignUp = (email, password,confirmPassword) =>{
   if(password !== confirmPassword){
       return Alert.alert("password doesn't match\nCheck your password.")
   }else{
     firebase.auth().createUserWithEmailAndPassword(email, password)
     .then((ref)=>{
       db.collection('users').doc(this.state.email).set({
         first_name:this.state.firstName,
         last_name:this.state.lastName,
         email:this.state.email,
         uid:ref.user.uid,
       })

     })
     .catch((error)=> {
       // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
       return Alert.alert(errorMessage)
     });
   }
 }

userLogin = (email, password)=>{
   firebase.auth().signInWithEmailAndPassword(email, password)
   .then(()=>{
     this.props.navigation.navigate("Home")
   })
   .catch((error)=> {
     var errorCode = error.code;
     var errorMessage = error.message;
     return Alert.alert(errorMessage)
   })
 }

showModal = ()=>{
  return(
  <Modal
    animationType="fade"
    transparent={true}
    visible={this.state.isModalVisible}
    >
      <View style={styles.container}>
      <SafeAreaView style={styles.droidSafeArea}/>
      <View style={styles.title}>
      <Image style={{width:RFValue(75) , height:RFValue(75) , marginRight:RFValue(10)}} source={require("../assets/Logo.png")} />
        <Text style={styles.titletext}>Teacher's App</Text>
      </View>
      <View style={styles.main}>
      <View style={styles.textCon}>
        <Text style={styles.text}>First Name : </Text>
        <TextInput placeholder={"Enter First Name"} placeholderTextColor={"white"}
          onChangeText={(text)=>{
            this.setState({
              firstName:text
            })
          }}
        style={styles.inputFont} keyboardType={"email-address"} />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Last Name : </Text>
        <TextInput placeholder={"Enter Last Name"} placeholderTextColor={"white"}
          onChangeText={(text)=>{
            this.setState({
              lastname:text
            })
          }}
        style={styles.inputFont} keyboardType={"email-address"} />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Email : </Text>
        <TextInput placeholder={"Enter Email"} placeholderTextColor={"white"}
          onChangeText={(text)=>{
            this.setState({
              email:text
            })
          }}
        style={styles.inputFont} keyboardType={"email-address"} />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Password : </Text>
        <TextInput placeholder={"Enter Password"} placeholderTextColor={"white"} style={styles.inputFont} 
          onChangeText={(text)=>{
            this.setState({
              password:text
            })
          }}
          secureTextEntry={true}
        />
        </View>
        <View style={styles.ntextCon}>
        <View>
        <Text style={styles.text}>Confirm :</Text>
        <Text style={styles.text}>Password </Text>
        </View>
        <TextInput placeholder={"Enter Password Again"} placeholderTextColor={"white"} style={styles.inputFont} 
          onChangeText={(text)=>{
            this.setState({
              confirmPassword:text
            })
          }}
          secureTextEntry={true}
        />
        </View>
        <View style={styles.textCon}>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>{
              this.userSignUp(this.state.email, this.state.password, this.state.confirmPassword),this.setState({
         "isModalVisible":false
       })}
            }
          >
          <Text style={styles.btntext}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.textCon}>
          <TouchableOpacity
            style={styles.btn}
            onPress={()=>this.setState({"isModalVisible":false})}
          >
          <Text style={styles.btntext}>Login</Text>
        </TouchableOpacity>
        </View>
        </View>
      </View>
  </Modal>
)
}
  render(){
    return(
      <View style={styles.container}>
        <View style={{justifyContent: 'center',alignItems: 'center'}}>

        </View>
          {
            this.showModal()
          }
        <View style={styles.container}>
    <SafeAreaView style={styles.droidSafeArea}/>
    <View style={styles.title}>
    <Image style={{width:RFValue(75) , height:RFValue(75) , marginRight:RFValue(10)}} source={require("../assets/Logo.png")} />
      <Text style={styles.titletext}>Teacher's App</Text>
    </View>
    <View style={styles.main}>
      <View style={styles.textCon}>
      <Text style={styles.text}>Email : </Text>
      <TextInput placeholder={"Enter Email"} placeholderTextColor={"white"}
        onChangeText={(text)=>{
          this.setState({
            email:text
          })
        }}
      style={styles.inputFont} keyboardType={"email-address"} />
      </View>
      <View style={styles.textCon}>
      <Text style={styles.text}>Password : </Text>
      <TextInput placeholder={"Enter Password"} placeholderTextColor={"white"} style={styles.inputFont} 
        onChangeText={(text)=>{
          this.setState({
            password:text
          })
        }}
        secureTextEntry={true}
      />
      </View>
      <View style={styles.textCon}>
        <TouchableOpacity
           style={styles.btn}
           onPress = {()=>{
             this.userLogin(this.state.email, this.state.password)
           }}
           >
           <Text style={styles.btntext}>Login</Text>
         </TouchableOpacity>
      </View>
      <View style={styles.textCon}>
         <TouchableOpacity
           style={styles.btn}
           onPress={()=>this.setState({ isModalVisible:true})}
           >
           <Text style={styles.btntext}>Create Account</Text>
         </TouchableOpacity>
      </View>
      </View>
    </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
   flex:1,
   backgroundColor:'#F8BE85',
   alignItems: 'center',
   justifyContent: 'center'
 },
 profileContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
 },
 title :{
   fontSize:65,
   fontWeight:'300',
   paddingBottom:30,
   color : '#ff3d00'
 },
 loginBox:{
   width: 300,
   height: 40,
   borderBottomWidth: 1.5,
   borderColor : '#ff8a65',
   fontSize: 20,
   margin:10,
   paddingLeft:10
 },
 KeyboardAvoidingView:{
   flex:1,
   justifyContent:'center',
   alignItems:'center'
 },
 modalTitle :{
   justifyContent:'center',
   alignSelf:'center',
   fontSize:30,
   color:'#ff5722',
   margin:50
 },
 modalContainer:{
   flex:1,
   justifyContent:'center',
   alignItems:'center',
   backgroundColor:"#ffff",
 },
 formTextInput:{
   width:"75%",
   height:35,
   alignSelf:'center',
   borderColor:'#ffab91',
   borderRadius:10,
   borderWidth:1,
   marginTop:20,
   padding:10
 },
 registerButton:{
   width:200,
   height:40,
   alignItems:'center',
   justifyContent:'center',
   borderWidth:1,
   borderRadius:10,
   marginTop:30
 },
 registerButtonText:{
   color:'#ff5722',
   fontSize:15,
   fontWeight:'bold'
 },
 cancelButton:{
   width:200,
   height:30,
   justifyContent:'center',
   alignItems:'center',
   marginTop:5,
 },
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
  ntextCon:{
    flexDirection:"row",
    justifyContent:"space-around",
    alignContent:"center",
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
})