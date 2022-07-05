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
  Alert,
  Modal,
  ScrollView
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import firebase from "firebase";
import db from '../config';
export default class StudentList extends React.Component{
constructor(props){
  super(props)
  this.state={
    student:[],
    isModalVisible:false,
    modalVisible:false,
    userId:firebase.auth().currentUser.email,
    std:"",
    board:"",
    fees:"",
    date:"",
  }
}

  componentDidMount(){
    this.getStudent();
    
  }


  getStudent = () => {
    db.collection("users").doc(this.state.userId).collection("student")
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

  renderItem = ({ item }) => {
    const date= new Date();
    const currDay= date.getDate();
    const currMonth= date.getMonth() + 1;
    const currYear= date.getFullYear();
    const estDay= 1;
    const currDate= `${currDay}/${currMonth}/${currYear}`
    const estDate= `${estDay}/${currMonth}/${currYear}`

    if(currDate === estDate){
      db.collection("users").doc(this.state.userId).collection("student").doc(item.name)
      .update({feeStat:"Pending"})
    }
    else{
      console.log("clear")
    }

    return (
      <View style={styles.card}>
        <Modal
        animationType="none"
        transparent={true}
        visible={this.state.modalVisible}>
      <View style={styles.container}>
      <ScrollView style={{width:"100%"}}>
      <SafeAreaView style={styles.droidSafeArea}/>
      <View style={styles.title}>
      <Image style={{width:RFValue(75) , height:RFValue(75) , marginRight:RFValue(10)}} source={require("../assets/Logo.png")} />
        <Text style={styles.titletext}>Teacher's App</Text>
        <TouchableOpacity style={{marginRight:RFValue(10) , marginLeft:RFValue(10)}}
        onPress={()=>
            this.setState({
              modalVisible:false,
            })
            }
        >
        <Ionicons name={"close-circle-outline"} size={RFValue(40)} color={"white"}/>
        </TouchableOpacity>
      </View>
      <View style={styles.main}>
      <View style={styles.image}>
        <Image source={require("../assets/Profile.png")} style={{width:RFValue(200) , height:RFValue(200)}}/>
      </View> 
        <View style={styles.textCon}>
        <Text style={styles.text}>Name : {item.name}</Text>
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Std :</Text>
        <TextInput placeholder={"Enter Student's Std"} defaultValue={this.state.std} placeholderTextColor={"white"} style={styles.inputFont}  
          onChangeText={(text)=>{
            this.setState({
              std:text,
            })
          }}
        />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text}>Board :</Text>
        <TextInput placeholder={"Enter the Student's School Board"} defaultValue={this.state.board} placeholderTextColor={"white"} style={styles.inputFont} 
          onChangeText={(text)=>{
            this.setState({
              board:text,
            })
          }}
        />
        </View>
        <View style={styles.textCon}>
        <Text style={styles.text} keyboardType={"number-pad"}>Fees :</Text>
        <TextInput placeholder={"Enter Student's Fees"} defaultValue={this.state.fees} placeholderTextColor={"white"} style={styles.inputFont} keyboardType={"number-pad"}
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
        <TextInput placeholder={"DD.MM.YYYY"} defaultValue={this.state.date} placeholderTextColor={"white"} style={styles.inputFont} keyboardType={"number-pad"}
          onChangeText={(text)=>{
            this.setState({
              date:text,
            })
          }}
        />
        </View>
        <View style={styles.ntextCon}>
          <TouchableOpacity style={styles.btn} onPress={()=>{
            db.collection("users").doc(this.state.userId).collection("student").doc(item.name)
            .update({
                 std:this.state.std,
                 board:this.state.board,
                 fees:this.state.fees,
                 date:this.state.date,
                 })
            .then(()=>{
              this.setState({
                modalVisible:false
              }),
              this.props.navigation.navigate("Loading")
            })
          }}>
            <Text style={styles.btntext}>Save</Text>
          </TouchableOpacity>
        </View>
        </View>
        </ScrollView>
        </View>
        </Modal>
      <View style={styles.main}>
        <Text style={styles.text} >{item.name}</Text>
        <View style={styles.sub}>
        <Text style={styles.subText} >Std: {item.std}({item.board})</Text>
        <Text style={styles.subText}>|</Text>
        <Text style={styles.subText} >Fees: {item.fees}</Text>
        </View>
        <Text style={styles.subText} >Joined On: {item.date}</Text>
        <Text style={styles.subText} >Fees Status: {item.feeStat}</Text>
        <View style={styles.sub}>
        <TouchableOpacity style={styles.btn} onPress={()=>{
          db.collection("users").doc(this.state.userId).collection("student").doc(item.name).delete()
          .then(()=>{this.props.navigation.navigate("Loading")})
          }} >
          <Ionicons name={"trash"} size={RFValue(30)} color={"white"} /><Text style={styles.btntext}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>{
          this.setState({
            modalVisible:true,
            std:item.std,
            board:item.board,
            fees:item.fees,
            date:item.date
          })
          }} >
          <Text style={styles.btntext}>Edit</Text>
      </TouchableOpacity>
      </View>
      <View style={styles.sub}>
      <TouchableOpacity style={styles.btn} onPress={()=>{
          db.collection("users").doc(this.state.userId).collection("student").doc(item.name)
          .update({feeStat:"Paid"})
          .then(()=>{this.props.navigation.navigate("Loading")})
          }} >
          <Text style={styles.btntext}>Paid</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={()=>{
          db.collection("users").doc(this.state.userId).collection("student").doc(item.name)
          .update({feeStat:"Pending"})
          .then(()=>{this.props.navigation.navigate("Loading")})
          }} >
          <Text style={styles.btntext}>Not Paid</Text>
      </TouchableOpacity>
      </View>
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
      style={{width:"100%"}}
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
        <TouchableOpacity style={styles.btn2}
          onPress={()=>{
            this.props.navigation.navigate("Home"),this.setState({
              "isModalVisible":false
            })
           }}
        >
          <Text style={styles.btntext} >Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn3}
          onPress={()=>{
            this.props.navigation.navigate("Fees"),this.setState({
              "isModalVisible":false
            })
           }}
        >
          <Text style={styles.btntext2}>View / Create Fees Template</Text>
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
        {this.showModal()}
      <SafeAreaView style={styles.droidSafeArea}/>
      <View style={styles.title}>
      <Image style={{width:RFValue(75) , height:RFValue(75) , marginRight:RFValue(10)}} source={require("../assets/Logo.png")} />
        <Text style={styles.titletext}>Teacher's App</Text>
        <TouchableOpacity style={{marginRight:RFValue(10) , marginLeft:RFValue(10)}}
        onPress={()=>
            this.setState({
              isModalVisible:true,
            })
            }
        >
        <Ionicons name={"menu"} size={RFValue(40)} color={"white"}/>
        </TouchableOpacity>
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
  container3:{
    flex:1,
    backgroundColor:"white",
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
    btn:{
    backgroundColor:"red",
    width:RFValue(100),
    height:RFValue(40),
    textAlign:"center",
    alignItems:"center",
    justifyContent:"center",
    borderRadius:RFValue(10),
    flexDirection:"row",
    marginTop:RFValue(10),
    marginRight:RFValue(10),
    marginLeft:RFValue(10)
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