/**********************************/
/**********************************/
/*** Costruttore di Controller  ***/
/**********************************/
/**********************************/

function Controller(prob){
  this._problem = prob;
}





/*********************************/
/*********************************/
/**** Campi dati di Controller ***/
/*********************************/
/*********************************/

Controller.prototype._intervalId;
Controller.prototype._problem;
Controller._isPlaying = false;





/*****************************/
/*****************************/
/**** Metodi di Controller ***/
/*****************************/
/*****************************/


Controller.prototype.step = function(){
  this._problem.step();
};



//HERE BE DRAGONS.
//THIS WILL BE REFACTORED W/SIGNALS & TRIGGERS
Controller.prototype.play = function(){
  debug("method play");
  this._isPlaying = true;
  $('#img_play').attr("src", "images/play_h.png");
  $('#img_stop').attr("src", "images/pause.png");
  this.step();
  this._intervalId = setInterval(this.step.bind(this), simulationConfig.simulationSpeed);
};




Controller.prototype.stop = function(){
  clearInterval(this._intervalId);
  this._isPlaying = false;
  $('#img_play').attr("src", "images/play.png");
  $('#img_stop').attr("src", "images/pause_h.png");
};