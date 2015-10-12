var catSelectorView = {
  init: function() {
    this.catSelector = document.getElementById('catSelectorView');
    catSelectorView.render();
  },

  render: function() {

    this.catSelector.innerHTML = '';

    var cats = controller.getCats();

    var title = document.createElement('span');
    title.textContent = 'Select cat';
    this.catSelector.appendChild(title);

    for (var i = 0; i < cats.length; i++) {
      var span = document.createElement('span');
      span.textContent = ' ... ';
      this.catSelector.appendChild(span);

      var aCatSelector = document.createElement('a');
      aCatSelector.href = '#';
      aCatSelector.textContent = ' ' + cats[i].name + '';
      this.catSelector.appendChild(aCatSelector);

      aCatSelector.addEventListener('click', (function(selectedCat) {
        return function() {
          controller.selectCat(selectedCat);
          catView.render();
          adminView.render();
        }
      })(i));
    }
  }
};

var catView = {
  init: function () {
    this.catView = document.getElementById('catView');

    this.catText = document.createElement('div');
    this.catView.appendChild(this.catText);

    this.catPicture = document.createElement('img');
    this.catView.appendChild(this.catPicture);

    this.catPicture.addEventListener('click', function() {
      controller.meowCat();
      catView.render();
      adminView.render();
    });

    catView.render();
  },

  render: function() {
    var cat = controller.getSelectedCat();

    if(cat) {
      this.catPicture.src = cat.image;
      if (cat.meows === 0) {
        this.catText.textContent = 'Click on \'' + cat.name + '\' for meow';
      } else {
        this.catText.textContent = cat.name + '\'s meows are: ' + cat.meows;
      }
    }
  }
}

var adminView = {
  init: function() {
    this.inputName = document.getElementById('inputName');
    this.inputMeow = document.getElementById('inputMeow');
    this.inputImage = document.getElementById('inputImage');
    this.btnCancel = document.getElementById('btnCancel');
    this.btnSubmit = document.getElementById('btnSubmit');

    this.btnCancel.addEventListener('click', function() {
      adminView.render();
    });

    this.btnSubmit.addEventListener('click', function() {
      var name = document.getElementById('inputName').value;
      var meow = document.getElementById('inputMeow').value;
      var image = document.getElementById('inputImage').value;
      controller.setSelectedCat(name, meow, image);

      catSelectorView.render();
      catView.render();
      adminView.render();
    });

    adminView.render();
  },

  render: function() {
    var cat = controller.getSelectedCat();

    this.inputName.value = cat.name;
    this.inputMeow.value = cat.meows;
    this.inputImage.value = cat.image;
  }
}
