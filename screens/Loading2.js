import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default class Loading2 extends Component {
  componentDidMount() {
  this.props.setUpdateToTrue()
   this.props.navigation.navigate("FeesTemplate") 
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
