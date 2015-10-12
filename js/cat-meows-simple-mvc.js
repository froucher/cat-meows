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

loadScript('js/model.js', function() { console.log('model is loaded.'); });
loadScript('js/views.js', function() { console.log('views is loaded.'); });
loadScript('js/controller.js', function() { console.log('controller is loaded.'); controller.init(); });

