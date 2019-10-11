'use strict';

var maxTime = 0;
var font = '16px PT Mono';
var colorWhite = 'white';
var colorBlack = 'black';
var colorOpacity = 'rgba(0, 0, 0, 0.7)';
var textBaseline = 'hanging';
var youWonText = 'Ура вы победили!';
var resultsText = 'Список результатов:';
var fieldHeight = 150;

var defineColor = function (name, canvas) {
  if (name === 'Вы') {
    canvas.fillStyle = 'red';
  } else {
    canvas.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '% , 50%)';
  }
};

var drawTitleText = function (canvas) {
  canvas.font = font;
  canvas.textBaseline = textBaseline;
  canvas.fillStyle = colorBlack;
  canvas.fillText(youWonText, 140, 25);
  canvas.fillText(resultsText, 140, 45);
};

var drawRect = function (canvas, color, coords) {
  canvas.fillStyle = color;
  canvas.fillRect(coords[0], coords[1], coords[2], coords[3]);
};

var drawColumn = function (canvas, time, name, increment) {
  var graphHeight = (fieldHeight * time) / maxTime;
  var horizontalIncrement = increment * 90;
  canvas.fillText(name, 140 + horizontalIncrement, 250);
  var randColor = defineColor(name, canvas);
  drawRect(canvas, randColor, [140 + horizontalIncrement, 240 - graphHeight, 40, graphHeight]);
  canvas.fillStyle = colorBlack;
  canvas.fillText(time, 140 + horizontalIncrement, 220 - graphHeight);
};

window.renderStatistics = function (ctx, names, times) {
  drawRect(ctx, colorOpacity, [110, 20, 420, 270]);
  drawRect(ctx, colorWhite, [100, 10, 420, 270]);
  drawTitleText(ctx);
  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = Math.round(times[i]);
    }
  }
  for (var x = 0; x < names.length; x++) {
    var name = names[x];
    var time = Math.round(times[x]);
    drawColumn(ctx, time, name, x);
  }
};
