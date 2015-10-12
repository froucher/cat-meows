var controller = {
  init: function() {
    model.init();

    catSelectorView.init();
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
