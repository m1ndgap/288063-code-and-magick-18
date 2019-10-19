'use strict';

// declaring constants
var WIZNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZLASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZEYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLCOLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
// moved these to constants because I want to add listeners in the functions section, is this correct?
var SETUP = document.querySelector('.setup');
var SETUPOPEN = document.querySelector('.setup-open');
var SETUPCLOSE = SETUP.querySelector('.setup-close');
var SETUPUSERNAME = document.querySelector('.setup-user-name');
var WIZARDEYES = document.querySelector('.setup-wizard-appearance .wizard-eyes');
var WIZARDROBE = document.querySelector('.setup-wizard-appearance .wizard-coat');
var FIREBALL = document.querySelector('.setup-player .setup-fireball-wrap');
var FIREBALLCOLOR = document.querySelector('.setup-player .setup-fireball-wrap input');

// declaring functions
var rng = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
* creating wizard objects
* @return {array} with wizards
* */
window.generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var wizard = {
      'name': WIZNAMES[rng(0, WIZNAMES.length)] + ' ' + WIZLASTNAMES[rng(0, WIZLASTNAMES.length)],
      'coatColor': WIZCOLORS[rng(0, WIZCOLORS.length)],
      'eyesColor': WIZEYECOLORS[rng(0, WIZEYECOLORS.length)],
    };
    wizards.push(wizard);
  }
  return wizards;

};

/**
* generating DOM objects using wizards array
* @param {array} wizards generated before
* @param {element} template dom object
*/
window.generateWizardDom = function (wizards, template) {
  for (var x = 0; x < wizards.length; x++) {
    var element = template.content.querySelector('.setup-similar-item').cloneNode(true);
    var wizard = wizards[x];
    var wizName = element.querySelector('.setup-similar-label');
    var wizCoat = element.querySelector('.wizard-coat');
    var wizEyes = element.querySelector('.wizard-eyes');
    wizName.innerText = wizard['name'];
    wizCoat.setAttribute('style', 'fill:' + wizard.coatColor);
    wizEyes.setAttribute('style', 'fill:' + wizard.eyesColor);
    fragment.appendChild(element);
  }
};

// adding event listeners
SETUPOPEN.addEventListener('click', function () {
  SETUP.classList.remove('hidden');
});
SETUPOPEN.setAttribute('tabindex', '0');
SETUPOPEN.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    SETUP.classList.remove('hidden');
  }
});
SETUPCLOSE.addEventListener('click', function () {
  SETUP.classList.add('hidden');
});
document.addEventListener('keydown', function (evt) {
  if (!SETUP.classList.contains('hidden') && evt.keyCode === 27) {
    SETUP.classList.add('hidden');
  }
});
SETUPUSERNAME.setAttribute('minlength', '2');
SETUPUSERNAME.setAttribute('maxlength', '25');
WIZARDEYES.addEventListener('click', function () {
  var color = WIZEYECOLORS[rng(0, WIZEYECOLORS.length - 1)];
  WIZARDEYES.setAttribute('style', 'fill: ' + color);
});
WIZARDROBE.addEventListener('click', function () {
  var color = WIZCOLORS[rng(0, WIZCOLORS.length - 1)];
  WIZARDROBE.setAttribute('style', 'fill: ' + color);
});
console.log(FIREBALL);
console.log(FIREBALLCOLOR);
FIREBALL.addEventListener('click', function () {
  var color = FIREBALLCOLORS[rng(0, FIREBALLCOLORS.length - 1)];
  FIREBALL.setAttribute('style', 'background-color:' + color);
  FIREBALLCOLOR.setAttribute('value', color);
});

// assigning DOM elements to variables
var fragment = document.createDocumentFragment();
var setupSimilar = document.querySelector('.setup-similar');

// generating data and creating DOM
var template = document.querySelector('#similar-wizard-template');
window.generateWizardDom(window.generateWizards(), template);

// adding DOM to the page
setupSimilar.appendChild(fragment);

// showing hidden elements with new content
// setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
