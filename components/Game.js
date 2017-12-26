import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, TextInput } from 'react-native';
import emojis from '../utils/emoji';
import { formatInput, checkAnswer } from '../utils/game';

class Game extends Component {
  constructor() {
    super();

    this.state = {
      emojiArr: [],
      randomQuestion: 0,
      score: -1,
      guess: '',
      message: 'Guess the phrase!',
    };

    this.restartGame = this.restartGame.bind(this);
    this.pickRandomQuestion = this.pickRandomQuestion.bind(this);
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
        <View> 
          <Text>
            Score: <Text style={styles.greenAndBold}>{score}</Text>
          </Text>
        </View>
        {
          emojiArr.length && score > -1 ? 
          <View style={styles.container}>
            <View style={[styles.container, styles.gameplay]}>
              <Text style={styles.content}>{emojiArr[randomQuestion].question}</Text>
              <TextInput
                style={styles.gameInput}
                onChangeText={guess => this.setState({ guess })}
                value={guess}
                placeholder={message}
                placeholderTextColor="white"/>
                <Button
                color="red"
                title="Submit"
                onPress={this.handleInputSubmit} />
            </View>
            <Button
              title="Restart Game"
              onPress={this.restartGame} />
          </View>
          : <Text>{message}</Text>
        } 
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'goldenrod',
    justifyContent: 'center',
  },
  greenAndBold: {
    color: '#33FF55',
    fontWeight: 'bold',
  },
  gameInput: {
    width: '70%',
    backgroundColor: 'rgba(40, 120, 20, 0.7)',
    textAlign: 'center',
  },
  gameplay: {
    borderRadius: 2,
    maxHeight: 500,
    width: 500,
    backgroundColor: '#bab',
    borderWidth: 2,
  },
  content: {
    fontSize: 35,
    padding: '6%',
    textAlign: 'center',
    width: '100%',
  },
});

export default Game;
