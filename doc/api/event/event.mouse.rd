= Intro

With the advanced events support module, mouse events will have some
additional features and fixes.

== Internet Explorer Events

RightJS will automatically fix the IE browser events and make them have the
following standard W3C properties

 * which - the button number (1,2,3)
 * pageX - the cursor left position relative to the document left edge
 * pageY - the cursor top position relative to the document top edge
 * target - the actual clicked dom-element
 * relatedElement - W3C style property for the mouseover/mouseout events
 


### Event.Mouse#position

== Semantic
  position() -> Object {x: number, y: number}
  
== Description
  Returns the current cursor position relative to the document top left
  corner
  
== Example
  $('element').onMouseover(function(event) {
    this.first('title-block').moveTo(event.position()).show();
  });


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
