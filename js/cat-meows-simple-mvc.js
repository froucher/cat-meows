function loadScript(url, callback)
{
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onreadystatechange = callback;
  script.onload = callback;
  head.appendChild(script);
}

loadScript('js/model.js', function() {
  loadScript('js/views.js', function() {
    loadScript('js/controller.js', function() {
      console.log('controller has been loaded.');
      controller.init();
    });
    console.log('views has been loaded.');
  });
  console.log('model has been loaded.');
});
