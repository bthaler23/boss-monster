import Game from './game';

class StartScreen {

  constructor(stage) {
    this.draw(stage);
    this.stage = stage;
    document.addEventListener("keyup", this.startGame());
  }

  startGame() {
    const handler = function(e) {
      if (e.keyCode === 13) {
        document.removeEventListener("keyup", handler);
        new Game(this.stage);
      }
    }.bind(this);

    return handler;
  }

  draw(stage) {
    stage.clearRect(0, 0, stage.canvas.width, stage.canvas.height);

    stage.fillStyle = '#4a433b';
    stage.fillRect(0, 0, stage.canvas.width, stage.canvas.height);
    stage.fillStyle = '#b30000';
    stage.textAlign="center";
    stage.strokeStyle = 'black';
    stage.font = "60px Inknut Antiqua serif";
    stage.fillText("You Died!", stage.canvas.width/2, stage.canvas.height * 1/5);
    stage.strokeText("You Died!", stage.canvas.width/2, stage.canvas.height * 1/5);
    stage.font = "100px Inknut Antiqua serif";
    stage.fillText("Boss Monster", stage.canvas.width/2, stage.canvas.height * 2/5);
    stage.strokeText("Boss Monster", stage.canvas.width/2, stage.canvas.height * 2/5);
    stage.font = "50px Inknut Antiqua serif";
    stage.fillText("Press Enter to Play", stage.canvas.width/2, stage.canvas.height * 3/5);
    stage.strokeText("Press Enter to Play", stage.canvas.width/2, stage.canvas.height * 3/5);
    stage.fillStyle = "black";
    stage.font = "25px Inknut Antiqua serif";
    stage.fillText("WASD to Move, Click To Shoot", stage.canvas.width/2, stage.canvas.height * 7/10);
    stage.fillText("Developed by Brandon Thaler", stage.canvas.width/2, stage.canvas.height * 4/5);
    stage.textAlign="start";
  }

}

export default StartScreen;
