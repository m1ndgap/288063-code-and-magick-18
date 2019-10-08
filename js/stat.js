'use strict';

window.renderStatistics = function(ctx, names, times) {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
  ctx.fillRect(110, 20, 420, 270);
  ctx.fillStyle = 'white';
  ctx.fillRect(100, 10, 420, 270);
  ctx.font = '16px PT Mono';
  ctx.textBaseline = 'hanging';
  ctx.fillStyle = 'black';
  ctx.fillText('Ура вы победили!', 140, 25);
  ctx.fillText('Список результатов:', 140, 45);
  // находим максимальное значение в массиве, экономлю место используя Math.max вместо цикла.
  var maxTime = Math.round(Math.max(...times));

  for (var i = 0; i < names.length; i++) {
    ctx.fillStyle = 'black';
    var name = names[i];
    var time = Math.round(times[i]);
    //вычисляем высоту колонки со временем используя максимальное значение
    var graphHeight = (150 * time) / maxTime;
    var horizontalIncrement = i * 90;
    var graphColor = 'hsl(240, ' + Math.round(Math.random()*100) + '% , 50%)';
    ctx.fillText(name, 140 + horizontalIncrement, 250);
    if (name == "Вы") {
      ctx.fillStyle = 'red';
    } else {
      ctx.fillStyle = graphColor;
    }
    ctx.fillRect( 140 + horizontalIncrement, 240 - graphHeight, 40, graphHeight);
    ctx.fillStyle = 'black';
    ctx.fillText(time, 140 + horizontalIncrement, 220 - graphHeight)
  }
};
