= Intro

With the advanced events support module, mouse events will have some
additional features and fixes.


### Event.Mouse#isLeftClick

== Semantic
  isLeftClick() -> boolean
  
== Description
  Checks if the left mouse button was pressed
  
== Example
  $('element').onClick(function(event) {
    if (event.isLeftClick()) {
      // do something here
    }
  });


### Event.Mouse#isRightClick

== Semantic
  isRightClick() -> boolean
  
== Description
  Checks if the right mouse button was pressed
  
== Example
  $('element').onClick(function(event) {
    if (event.isRightClick()) {
      event.stop();
      $('context-menu').moveTo(event.position()).show();
    }
  });
