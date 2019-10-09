'use strict';

var maxTime = 0;
var font = '16px PT Mono';
var colorWhite = 'white';
var colorBlack = 'black';
var textBaseline = 'hanging';
var youWonText = 'Ура вы победили!';
var resultsText = 'Список результатов:';

var defineColor = function (name, canvas) {
  if (name === 'Вы') {
    canvas.fillStyle = 'red';
  } else {
    canvas.fillStyle = 'hsl(240, ' + Math.round(Math.random() * 100) + '% , 50%)';
  }
};

window.renderStatistics = function (ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = colorWhite;
  ctx.fillRect(100, 10, 420, 270);
  ctx.font = font;
  ctx.textBaseline = textBaseline;
  ctx.fillStyle = colorBlack;
  ctx.fillText(youWonText, 140, 25);
  ctx.fillText(resultsText, 140, 45);
  // находим максимальное значение в массиве циклом
  for (var i = 0; i < times.length; i++) {
    if (maxTime < times[i]) {
      maxTime = Math.round(times[i]);
    }
  }
  for (var x = 0; x < names.length; x++) {
    ctx.fillStyle = colorBlack;
    var name = names[x];
    var time = Math.round(times[x]);
    // вычисляем высоту колонки со временем используя максимальное значение
    var graphHeight = (150 * time) / maxTime;
    var horizontalIncrement = x * 90;
    ctx.fillText(name, 140 + horizontalIncrement, 250);
    defineColor(name, ctx);
    ctx.fillRect(140 + horizontalIncrement, 240 - graphHeight, 40, graphHeight);
    ctx.fillStyle = colorBlack;
    ctx.fillText(time, 140 + horizontalIncrement, 220 - graphHeight);
  }
};
