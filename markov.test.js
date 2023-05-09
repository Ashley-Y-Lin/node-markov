"use strict";

let { MarkovMachine } = require("./markov");


describe("MarkovMachine constructor", function () {
  let machine;

  beforeEach(function () {
    machine = new MarkovMachine("the cat in the hat");
  });

  test("returns correct this.words", function () {
    let words = machine.words;
    expect(words).toEqual(['the', 'cat', 'in', 'the', 'hat']);
  });

  test("returns correct this.chains", function () {
    let chains = machine.chains;
    expect(Array.from(chains)).toEqual(Array.from(new Map([
      ['the', ['cat', 'hat']],
      ['cat', ['in']],
      ['in', ['the']],
      ['hat', [null]]
    ])));
  });
});


describe("getText", function () {
  let machine1;
  let machine2;

  beforeEach(function () {
    machine1 = new MarkovMachine("the cat in hat");
    machine2 = new MarkovMachine("the cat in the hat");
  });

  test("follows chain with no branches", function () {
    let text = machine1.getText();
    expect(text).toEqual('the cat in hat');
  });

  test("outputs different text when run many times, when branches exist", function () {
    let uniqueOutputs = new Set();
    for (let i = 0; i < 20; i++) {
      let text = machine2.getText();
      uniqueOutputs.add(text);
    }
    expect(uniqueOutputs.size).toBeGreaterThan(1);
  });

  test("outputs valid text from markov chains", function () {
    let text = machine2.getText();
    let textWords = text.split(' ');
    for (let i = 0; i < textWords.length - 1; i++) {
      let currWord = textWords[i];
      let nextWord = textWords[i + 1];
      expect(machine2.chains.get(currWord)).toContain(nextWord);
    }
  });

});

