'use strict';

// declaring constants
var WIZNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZLASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZEYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALLCOLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];


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

// assigning DOM elements to variables
var fragment = document.createDocumentFragment();
var setupSimilar = document.querySelector('.setup-similar');

// generating data and creating DOM
var template = document.querySelector('#similar-wizard-template');
window.generateWizardDom(window.generateWizards(), template);

// decraling element variables and assigning event listeners to them
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var wizardEyesEl = document.querySelector('.setup-wizard-appearance .wizard-eyes');
var wizardRobeEl = document.querySelector('.setup-wizard-appearance .wizard-coat');
var fireBallEl = document.querySelector('.setup-player .setup-fireball-wrap');
var fireBallColorInput = document.querySelector('.setup-player .setup-fireball-wrap input');

setupOpen.addEventListener('click', function () {
  setup.classList.remove('hidden');
});
setupOpen.setAttribute('tabindex', '0');
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    setup.classList.remove('hidden');
  }
});

var setupCLose = setup.querySelector('.setup-close');
setupCLose.addEventListener('click', function () {
  setup.classList.add('hidden');
});
document.addEventListener('keydown', function (evt) {
  if (!setup.classList.contains('hidden') && evt.keyCode === 27) {
    setup.classList.add('hidden');
  }
});

var setupUsername = document.querySelector('.setup-user-name');
setupUsername.setAttribute('minlength', '2');
setupUsername.setAttribute('maxlength', '25');
wizardEyesEl.addEventListener('click', function () {
  var color = WIZEYECOLORS[rng(0, WIZEYECOLORS.length - 1)];
  wizardEyesEl.setAttribute('style', 'fill: ' + color);
});
wizardRobeEl.addEventListener('click', function () {
  var color = WIZCOLORS[rng(0, WIZCOLORS.length - 1)];
  wizardRobeEl.setAttribute('style', 'fill: ' + color);
});
fireBallEl.addEventListener('click', function () {
  var color = FIREBALLCOLORS[rng(0, FIREBALLCOLORS.length - 1)];
  fireBallEl.setAttribute('style', 'background-color:' + color);
  fireBallColorInput.setAttribute('value', color);
});

// adding DOM to the page
setupSimilar.appendChild(fragment);

// showing hidden elements with new content
// setup.classList.remove('hidden');
setupSimilar.classList.remove('hidden');
