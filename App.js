import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            <Icon name="close"/>
          </View>
          <View style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}></View>
          <View style={[styles.tile, { borderWidth: 0, borderBottomWidth: 4 }]}></View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}></View>
          <View style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}></View>
          <View style={[styles.tile, { borderWidth: 0, borderBottomWidth: 4 }]}></View>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.tile, { borderWidth: 0, borderRightWidth: 4 }]}></View>
          <View style={[styles.tile, { borderWidth: 0, borderRightWidth: 4 }]}></View>
          <View style={[styles.tile, { borderWidth: 0 }]}></View>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tile: {
    borderWidth: 4,
    height: 100,
    width: 100,
  }
});
