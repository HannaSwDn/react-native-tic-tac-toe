import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert, Button } from 'react-native';
import { MaterialCommunityIcons as Icon } from 'react-native-vector-icons';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      gameState: [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
      currentPlayer: 1,
    }
  }

  componentDidMount() {
    this.initializeGame()
  }

  onNewGamePress = () => {
    this.initializeGame()
  }

  initializeGame = () => {
    this.setState({gameState:
      [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
    currentPlayer: 1,
    })
  }

  getWinner = () => {
    const num_tiles = 3;
    let arr = this.state.gameState;
    let sum;

    // looping through the rows to see if someone has won
    for (let i = 0; i < num_tiles; i++) {
      sum = arr[i][0] + arr[i][1] + arr[i][2]
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    // looping through the columns to see if someone has won
    for (let i = 0; i < num_tiles; i++) {
      sum = arr[0][i] + arr[1][i] + arr[2][i]
      if (sum == 3) { return 1; }
      else if (sum == -3) { return -1; }
    }

    // check the diagonals to see if someone has won
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    sum = arr[2][0] + arr[1][1] + arr[0][2]
    if (sum == 3) { return 1; }
    else if (sum == -3) { return -1; }

    // if it ran this far, there is no winner
    return 0;
  }

  onTilePress(row, col) {
    // if tile is already filled, do not continue
    let value = this.state.gameState[row][col]
    if (value !== 0) {
      return;
    }

    let currentPlayer = this.state.currentPlayer;

    // set the game state after user takes his turn
    let arr = this.state.gameState.slice();
    arr[row][col] = currentPlayer;
    this.setState({gameState: arr});

    let winner = this.getWinner();

    // alerting the winner
    if (winner == 1) {
      Alert.alert('Player 1 is the winner!!');
      setTimeout(() => {this.initializeGame();}, 1000)
    } else if (winner == -1) {
      Alert.alert('Player 2 is the winner!!');
      setTimeout(() => {this.initializeGame();}, 1000)
    }

    // switch next player
    let nextPlayer = (currentPlayer == 1) ? -1 : 1
    this.setState({currentPlayer: nextPlayer})
  }

  renderIcon = (row, col) => {
    let value = this.state.gameState[row][col];

    switch(value) {
      case 1: return <Icon name="close" style={styles.tileX} />
      case -1: return <Icon name="circle-outline" style={styles.tileO} />
      default: return <View />
    }
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(0, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(0, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 1)} style={[styles.tile, { borderTopWidth: 0, borderLeftWidth: 0 }]}>
            {this.renderIcon(0, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(0, 2)} style={[styles.tile, { borderWidth: 0, borderBottomWidth: 4 }]}>
            {this.renderIcon(0, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(1, 0)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(1, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 1)} style={[styles.tile, { borderLeftWidth: 0, borderTopWidth: 0 }]}>
            {this.renderIcon(1, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(1, 2)} style={[styles.tile, { borderWidth: 0, borderBottomWidth: 4 }]}>
            {this.renderIcon(1, 2)}
          </TouchableOpacity>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => this.onTilePress(2, 0)} style={[styles.tile, { borderWidth: 0, borderRightWidth: 4 }]}>
            {this.renderIcon(2, 0)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 1)} style={[styles.tile, { borderWidth: 0, borderRightWidth: 4 }]}>
            {this.renderIcon(2, 1)}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.onTilePress(2, 2)} style={[styles.tile, { borderWidth: 0 }]}>
            {this.renderIcon(2, 2)}
          </TouchableOpacity>
        </View>

        <View style={{paddingTop: 50}}>
          <Button title="New Game" onPress={() => this.onNewGamePress()} />
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  tileX: {
    color: 'yellow',
    fontSize: 80
  },
  tileO: {
    color: 'blue',
    fontSize: 80
  }
});
