'use strict';

var wizards = [];
var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');
var wizNames = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var wizLastnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var wizColors = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var wizEyeColors = ['black', 'red', 'blue', 'yellow', 'green'];
var template = document.querySelector('#similar-wizard-template');
var fragment = document.createDocumentFragment();


var getRandomArrayValue = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

window.generateWizards = function () {
  for (var i = 0; i < 4; i++) {
    var wizard = {
      'name': getRandomArrayValue(wizNames) + ' ' + getRandomArrayValue(wizLastnames),
      'coatColor': getRandomArrayValue(wizColors),
      'eyesColor': getRandomArrayValue(wizEyeColors),
    };
    wizards.push(wizard);
  }
  return wizards;
};

window.generateWizardDom = function () {
  for (var x = 0; x < wizards.length; x++) {
    var element = template.content.querySelector('.setup-similar-item').cloneNode(true);
    var wizard = wizards[x];
    var wizName = element.querySelector('.setup-similar-label');
    var wizCoat = element.querySelector('.wizard-coat');
    var wizEyes = element.querySelector('.wizard-eyes');
    wizName.innerText = wizard['name'];
    wizCoat.setAttribute('style', 'fill:' + wizard['coatColor']);
    wizEyes.setAttribute('style', 'fill:' + wizard['eyesColor']);
    fragment.appendChild(element);
  }
  setupSimilar.appendChild(fragment);
};


window.generateWizards();
window.generateWizardDom();

setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
