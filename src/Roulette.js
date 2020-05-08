import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions
} from "react-native";
import { Button } from 'native-base';

import WheelOfFortune from 'react-native-wheel-of-fortune';

class Roulette extends Component {

  constructor(props) {
    super(props);

    this.state = {
      winnerValue: null,
      winnerIndex: null
    }
    this.child = null
  }

  _renderPlayButton = () => {
    return (
      <Text style={styles.tapToStart}>Press Button</Text>
    );
  }

  goBack = () => {
    this.setState({ winnerValue: null, winnerIndex: null })
    this.props.navigation.goBack();
  }

  render() {
    const { participants } = this.props.route.params;
    return (
      <View style={styles.container}>
        <View style={styles.winnerBox}>
          <Text style={styles.winnerText}>{this.state.winnerValue}</Text>
        </View>
        <WheelOfFortune
          onRef={ref => (this.child = ref)}
          rewards={participants}
          knobSize={20}
          borderWidth={3}
          borderColor={'#FBFFB9'}
          innerRadius={20}
          duration={5000}
          backgroundColor={"#"}
          getWinner={(value, index) => this.setState({ winnerValue: value, winnerIndex: index })}
          playButton={this._renderPlayButton} />
        <View style={{flexDirection: 'row', marginBottom: 20}}>
          <Button
            transparent
            style={styles.button}
            onPress={() => this.goBack()}>
            <Text style={styles.buttonText}>Go Back</Text>
          </Button>
          <Button
            transparent
            style={styles.button} 
            onPress={() => { this.child._onPress() }} >
            <Text style={styles.buttonText}>Press Me !</Text>  
          </Button>
        </View>
      </View>
    );
  }
}
export default Roulette;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDD692'
  },
  winner: {
    width: '100%',
    position: 'absolute',
    padding: 10,
    backgroundColor: '#fff',
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  winnerText: {
    fontSize: 26,
    color: '#666'
  },
  tapToStart: {
    fontSize: 50,
    color: '#FBFFB9',
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#754F44',
    width: 130,
    justifyContent: 'center',
    borderRadius: 25,
    marginHorizontal: 20
  },
  buttonText: {
    color: '#FBFFB9',
    fontSize: 20
  },
  winnerBox: {
    width: Dimensions.get("window").width,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d6b478'
  },
  winnerText: {
    color: "#FBFFB9",
    fontSize: 30
  }
});