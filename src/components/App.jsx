import React from 'react';
export default class App extends React.Component {
  state = {
    good: 0,
    neutral: 0,
    bad: 0,
  };
  render() {
    return (
      <div>
        <h1>Give feedback</h1>
        <button onClick={() => this.setState({ good: this.state.good + 1 })}>
          Good
        </button>
        <button
          onClick={() => this.setState({ neutral: this.state.neutral + 1 })}
        >
          Neutral
        </button>
        <button onClick={() => this.setState({ bad: this.state.bad + 1 })}>
          Bad
        </button>
        <h2>Statistics</h2>
        <p>Good: {this.state.good}</p>
        <p>Neutral: {this.state.neutral}</p>
        <p>Bad: {this.state.bad}</p>
      </div>
    );
  }
}
