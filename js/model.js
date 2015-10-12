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
