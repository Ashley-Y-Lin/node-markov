"use strict";

/** Textual markov chain generator. */


class MarkovMachine {

  /** Build markov machine; read in text.*/

  constructor(text) {
    // A "word" will also include any punctuation around the word, so this will
    // include things like "The", "cat", "cat.".
    this.words = text.split(/[ \r\n]+/);
    console.log("words", this.words);
    this.chains = this.getChains();
  }

  /** Get markov chain: returns object of Markov chains.
   *
   *  For text of "The cat in the hat.", chains will be:
   *
   *  {
   *   "The": ["cat"],
   *   "cat": ["in"],
   *   "in": ["the"],
   *   "the": ["hat."],
   *   "hat.": [null],
   *  }
   * */


  getChains() {
    let chains = new Map;

    for (let i = 0; i < this.words.length; i++) {
      let currWord = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(currWord)) {
        chains.get(currWord).push(nextWord);
      } else {
        chains.set(currWord, [nextWord]);
      }
    }

    return chains;
  }

  /** Return random text from chains, starting at the first word and continuing
   *  until it hits a null choice.
   *
   *  // - start at the first word in the input text
      // - find a random word from the following-words of that
      // - repeat until reaching the terminal null
   * */

  getText() {
    let currWord = this.words[0];
    let randomText = [currWord];

    while (true) {
      const allOptions = this.chains.get(currWord);

      currWord = getRandomWord(allOptions);

      if (currWord === null) {
        return randomText.join('');
      }

      randomText.push(` ${currWord}`);
    }
  }
}

function getRandomWord(allWords) {
  const idx = Math.floor(Math.random() * allWords.length);
  return allWords[idx];
}

module.exports = {
  MarkovMachine,
};