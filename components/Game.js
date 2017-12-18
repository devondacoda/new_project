import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import { StackNavigator } from 'react-navigation';
import { emojis } from '../utils/emoji';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      emojiArr: [],
      randomQuestion: 0,
      score: 0,
      guess: '',
    };

    this.restartGame = this.restartGame.bind(this);
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
  }

  componentDidMount() {
    this.restartGame();
  }

  restartGame() {
    const emojiArr = emojis.slice();
    const randomQuestion = this.pickRandomQuestion(emojis);
    this.setState({ emojiArr, randomQuestion, score: 0 });
  }

  pickRandomQuestion(questionsArr) {
    return Math.floor(Math.random() * questionsArr.length);
  }

  handleInputChange(guess) {
    this.setState({ guess });
  }

  handleInputSubmit() {
    this.setState({ guess: '' });
  }

  render() {
    const {
      score, emojiArr, randomQuestion, guess,
    } = this.state;
    return (
      <View style={styles.container}>
        <Text>Score: {score}</Text>
        <Text>
        {
          emojiArr.length
          && emojiArr[randomQuestion].question
        }
        </Text>
        <TextInput
          onChangeText={this.handleInputChange}
          value={guess}
          placeholder="Guess the phrase!" />
        <Button
          title="Submit"
          onPress={this.handleInputSubmit} />
        <Button
          title="Restart Game"
          onPress={this.restartGame} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#AAA',
    justifyContent: 'center',
  },
});

export default Game;
