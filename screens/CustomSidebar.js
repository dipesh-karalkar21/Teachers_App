import React, { Component } from 'react';
import { SafeAreaView, View, StyleSheet, Image } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';


export default class CustomSidebarMenu extends Component {
  render() {
    let props = this.props;
    return (
      <View
        style={{
          flex: 1,
          backgroundColor:'white',
        }}>
        <Image
          source={require('../assets/Logo.png')}
          style={styles.sideMenuProfileIcon}></Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: RFValue(140),
    height: RFValue(140),
    borderRadius: RFValue(70),
    alignSelf: 'center',
    marginTop: RFValue(60),
    resizeMode: 'contain',
  },
});
