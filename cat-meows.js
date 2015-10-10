var model = {
  init: function() {
    var defaultCats = [
      {
        name: 'Lucy',
        meows: 0,
        image: 'https://c2.staticflickr.com/2/1228/625031894_8331f845d2_b.jpg'
      },
      {
        name: 'Max',
        meows: 0,
        image: 'https://c1.staticflickr.com/9/8750/16386660144_a6c4026657_c.jpg'
      },
      {
        name: 'Jasper',
        meows: 0,
        image: 'https://c2.staticflickr.com/8/7210/6843831417_861d6996e8_b.jpg'
      },
      {
        name: 'Bella',
        meows: 0,
        image: 'https://c1.staticflickr.com/7/6185/6086472602_2d610155b7_b.jpg'
      },
      {
        name: 'Molly',
        meows: 0,
        image: 'https://c1.staticflickr.com/9/8065/8168159947_94b3a89a2a_c.jpg'
      }
    ];

    if (!localStorage.cats) {
      model.save(defaultCats);
    }
  },

  _selected: 0,

  getAllCats: function() {
    return JSON.parse(localStorage.cats);
  },

  getSelectedCat: function() {
    return model.getAllCats()[model._selected];
  },

  selectCat: function(i) {
    model._selected = i;
  },
  
  setSelectedCat: function(name, meows, image) {
    var cats = model.getAllCats();
    cats[model._selected].name = name;
    cats[model._selected].meows = meows;
    cats[model._selected].image = image;
    model.save(cats);
  },

  meowCat: function() {
    var cats = model.getAllCats();
    cats[model._selected].meows++;
    model.save(cats);
  },

  save: function(cats) {
    if(cats)
      localStorage.cats = JSON.stringify(cats);
  }
};

var controller = {
  init: function() {
    model.init();

    selectorView.init();
    catView.init();
    adminView.init();
  },

  getCats: function() {
    return model.getAllCats();
  },

  selectCat: function(i) {
    return model.selectCat(i);
  },

  getSelectedCat: function() {
    return model.getSelectedCat();
  },
  
  setSelectedCat: function(name, meows, image) {
    model.setSelectedCat(name, meows, image);
  },

  meowCat: function() {
    model.meowCat();
  }
};

var selectorView = {
  init: function() {
    this.catSelector = document.getElementById('catSelector');
    selectorView.render();
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
    this.catText = document.getElementById('catText');
    this.catPicture = document.getElementById('catPicture');

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
      
      selectorView.render();
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

controller.init();
