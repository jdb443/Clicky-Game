import React, { Component } from "react";
// import paintings from "./cards.json";
import paintings from "./cards.json";
import Scoreboard from "./components/Scoreboard";
import Card from "./components/Card";

// shuffle upon each click
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

class App extends Component {
  state = {
    paintings,
    score: 0,
    topScore: 0,
    showAlert: 0,
    showSuccess: 0,
    clickedpaintings: []
  };

  clickedImage = id => {
    // assign the state of the empty array to a let to be updated
    let clickedpaintings = this.state.clickedpaintings;
    let score = this.state.score;
    let topScore = this.state.topScore;
    // this.setState({
    //   showAlert: 0
    // });

    // if the clicked image has an id of the indexed paintings
    if (clickedpaintings.indexOf(id)) {
      // push that id into that id into the array to be stored
      clickedpaintings.push(id);
      console.log(clickedpaintings);
      // run the score function
      this.handleIncrement();
      // run the reshuffle function after each click
      this.makeShuffle();
    } else if (this.state.score === 24) {
      // alert player wins
      this.setState({
        showSuccess: 1,
        score: 0,
        clickedpaintings: []
      });
    } else {
       // alert player loss
      this.setState({
        score: 0,
        clickedpaintings: [],
        showAlert: 1
      });
      console.log("duplicate");
    }

    // if (score > topScore) {
    //   this.setState({
    //     topScore: score
    //   });
    // }
  };

  // handleIncrement increases this.state.score by 1
  handleIncrement = () => {
    let { score, topScore } = this.state;

    score++;

    if(score >= topScore) {
      topScore = score;
    } 

    this.setState({
      score,
      topScore
    }, () => {
      if (score === 24) {
        // alert player wins
        this.setState({
          showSuccess: 1,
          score: 0,
          clickedpaintings: []
        });
    }
    });


  //   else if (score === 5) {
  //     // alert player wins
  //     this.setState({
  //       showSuccess: 1,
  //       score: 0,
  //       clickedpaintings: []
  //     });
  // }


    // setState updates a components states
  };

  // checkState = () => {
  //   const { score } = this.state;

  //   if (score === 5) {
  //     // alert player wins
  //     this.setState({
  //       showSuccess: 1,
  //       score: 0,
  //       clickedpaintings: []
  //     });
  //   } 
  // }

  // shuffle up images
  makeShuffle = () => {
    this.setState({ paintings: shuffle(paintings) });
  };

  render() {
    return (
      <div className="container">
        <div
          className="alert alert-danger"
          style={{ opacity: this.state.showAlert }}
        >
          You clicked on this already, now your watch has ended! Try again...
          </div>
        <div
          className="alert alert-success"
          style={{ opacity: this.state.showSuccess }}
        >
          I shall wear no crowns and win no glory, you haven't clicked on duplicates!
          </div>
        <Scoreboard
          title="# Game"
          score={this.state.score}
          topScore={this.state.topScore}
        />
        <div className="row">
          {this.state.paintings.map(painting => (
            <Card
              key={painting.id}
              id={painting.id}
              artist={painting.artist}
              title={painting.title}
              year={painting.year}
              image={painting.image}
              clickedImage={this.clickedImage}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;