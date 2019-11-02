'use strict';

// declaring constants
(function () {
  var WIZNAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZLASTNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var WIZCOLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var WIZEYECOLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALLCOLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ENTERKEY = 13;
  var ESCKEY = 27;

  var HIDDENCLASS = 'hidden';
  var SETUPDEFAULTX = '50%';
  var SETUPDEFAULTY = '80px';

  window.WIZNAMES = WIZNAMES;
  window.WIZLASTNAMES = WIZLASTNAMES;
  window.WIZCOLORS = WIZCOLORS;
  window.WIZEYECOLORS = WIZEYECOLORS;
  window.FIREBALLCOLORS = FIREBALLCOLORS;
  window.ENTERKEY = ENTERKEY;
  window.ESCKEY = ESCKEY;

  window.HIDDENCLASS = HIDDENCLASS;
  window.SETUPDEFAULTX = SETUPDEFAULTX;
  window.SETUPDEFAULTY = SETUPDEFAULTY;


  // declaring functions
  var rng = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  window.toggleSetup = function (setup) {
    if (!setup.classList.contains(HIDDENCLASS)) {
      setup.classList.add(HIDDENCLASS);
      setup.style.top = SETUPDEFAULTY;
      setup.style.left = SETUPDEFAULTX;
    } else {
      setup.classList.remove(HIDDENCLASS);
    }
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
      window.fragment.appendChild(element);
    }
  };

  /**
   * changing color of the element on click
   * @param {array} colorarray array of possible colors
   * @param {element} element svg we are applying the color to
   * @param {string} style text to put into inline style alongside the color
   * @param {string} attribute attribute of html tag we are changing (value/style)
   */
  window.changeSvgElColor = function (colorarray, element, style, attribute) {
    var color = colorarray[rng(0, colorarray.length - 1)];
    element.setAttribute(attribute, style + ': ' + color);
  };

  // assigning DOM elements to variables
  var fragment = document.createDocumentFragment();
  window.fragment = fragment;
  var setupSimilar = document.querySelector('.setup-similar');
  window.setupSimilar = setupSimilar;

  // generating data and creating DOM
  var template = document.querySelector('#similar-wizard-template');
  window.generateWizardDom(window.generateWizards(), template);

  // decraling element variables and assigning event listeners to them
  var setup = document.querySelector('.setup');
  window.setup = setup;
  var setupOpen = document.querySelector('.setup-open');
  var dialogHandle = setup.querySelector('.upload');
  window.dialogHandle = dialogHandle;
  var wizardEyesEl = document.querySelector('.setup-wizard-appearance .wizard-eyes');
  var wizardRobeEl = document.querySelector('.setup-wizard-appearance .wizard-coat');
  var fireBallEl = document.querySelector('.setup-player .setup-fireball-wrap');
  var fireBallColorInput = document.querySelector('.setup-player .setup-fireball-wrap input');

  setupOpen.addEventListener('click', function () {
    setup.classList.remove(HIDDENCLASS);
  });
  setupOpen.setAttribute('tabindex', '0');
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTERKEY) {
      setup.classList.remove(HIDDENCLASS);
    }
  });

  var setupClose = setup.querySelector('.setup-close');
  setupClose.addEventListener('click', function () {
    window.toggleSetup(setup);
  });
  document.addEventListener('keydown', function (evt) {
    if (!setup.classList.contains('hidden') && evt.keyCode === ESCKEY) {
      window.toggleSetup(setup);
    }
  });

  var setupUsername = document.querySelector('.setup-user-name');
  setupUsername.setAttribute('minlength', '2');
  setupUsername.setAttribute('maxlength', '25');
  wizardEyesEl.addEventListener('click', function () {
    window.changeSvgElColor(WIZEYECOLORS, wizardEyesEl, 'fill', 'style');
  });
  wizardRobeEl.addEventListener('click', function () {
    window.changeSvgElColor(WIZCOLORS, wizardRobeEl, 'fill', 'style');
  });
  fireBallEl.addEventListener('click', function () {
    window.changeSvgElColor(FIREBALLCOLORS, fireBallEl, 'background-color', 'style');
    window.changeSvgElColor(FIREBALLCOLORS, fireBallColorInput, '', 'value');
  });
})();
