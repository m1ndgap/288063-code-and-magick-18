'use strict';

// declaring constants
var WIZNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZLASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZEYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// declaring functions
var rng = function (array) {
  return Math.floor(Math.random() * array.length);
};

/**
* creating wizard objects
* @return {array} with wizards
* */
window.generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var wizard = {
      'name': WIZNAMES[rng(WIZNAMES)] + ' ' + WIZLASTNAMES[rng(WIZLASTNAMES)],
      'coatColor': WIZCOLORS[rng(WIZCOLORS)],
      'eyesColor': WIZEYECOLORS[rng(WIZEYECOLORS)],
    };
    wizards.push(wizard);
  }
  return wizards;
};

/**
* generating DOM objects using wizards array* @
* @param {array} wizards generated before
*/
window.generateWizardDom = function (wizards) {
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
};

// assigning DOM elements to variables
var template = document.querySelector('#similar-wizard-template');
var fragment = document.createDocumentFragment();
var setup = document.querySelector('.setup');
var setupSimilar = document.querySelector('.setup-similar');

// generating data and creating DOM
window.generateWizardDom(window.generateWizards());

// adding DOM to the page
setupSimilar.appendChild(fragment);

// showing hidden elements with new content
setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
