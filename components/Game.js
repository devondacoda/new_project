import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
// import { StackNavigator } from 'react-navigation';
import { emojis } from '../utils/emoji';
import { formatInput, checkAnswer } from '../utils/game';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      emojiArr: [],
      randomQuestion: 0,
      score: 0,
      guess: '',
      message: 'Guess the phrase!',
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
    const randomQuestion = this.pickRandomQuestion(emojiArr);
    this.setState({
      emojiArr, randomQuestion, score: 0, message: 'Guess the phrase!',
    });
  }

  pickRandomQuestion(questionsArr) {
    return Math.floor(Math.random() * questionsArr.length);
  }

  handleInputChange(guess) {
    this.setState({ guess });
  }

  handleInputSubmit() {
    let {
      emojiArr, randomQuestion, guess,
    } = this.state;
    const formattedGuess = formatInput(guess);
    const answer = formatInput(emojiArr[randomQuestion].answer);
    const validateGuess = checkAnswer(formattedGuess, answer);
    let addToScore = 0;
    let message = 'Guess again!';
    guess = '';

    if (validateGuess) {
      addToScore = 10;
      emojiArr = emojiArr.filter((question, idx) => idx !== randomQuestion);
      message = emojiArr.length ? 'Great guess!' : 'YOU WON!';
      randomQuestion = this.pickRandomQuestion(emojiArr);
    }

    this.setState({
      guess, score: this.state.score + addToScore, message, emojiArr, randomQuestion,
    });
  }

  render() {
    const {
      score, emojiArr, randomQuestion, guess, message,
    } = this.state;
    return (
      <View style={styles.container}>
        <Text>{message}</Text>
        <Text> 
          Score: 
          <Text style={styles.greenAndBold}>
            {score}
          </Text>
        </Text>
        {
          emojiArr.length ? 
          <View style={styles.container}>
            <Text>{emojiArr[randomQuestion].question}</Text>
            <TextInput
              onChangeText={this.handleInputChange}
              value={guess}
              placeholder={message}/>
            <Button
              title="Submit"
              onPress={this.handleInputSubmit} />
            <Button
              title="Restart Game"
              onPress={this.restartGame} />
          </View>
          : null
        } 
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
  greenAndBold: {
    color: '#33FF55',
    fontWeight: 'bold',
  },
});

export default Game;
