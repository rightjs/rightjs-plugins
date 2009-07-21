= Intro

The advanced events handling module from the RightJS-Goods project provides
some additional features for easier and painless dom-events handling in your
applications.

== Extending

If you had attached your event listener through the RightJS standard interface
then all your events will get extended automatically before be sent into your
listener function.

But if for some reason you need to extend your event manually you can easily
do that, by calling the <tt>Event.ext</tt> method.

<code>
  $('element').addEventListener('click', function(event) {
    Event.ext(event);
    
    console.log(event.position());
  }, false);
</code>


== Internet Explorer Events

Instead of creating some mediator interface, RightJS tries to change the IE
browsers events in the way they had the standard W3C properties, this way
you will have an ability to work with the dom-events in a cross-browser way
and then all the browsers which do stick to the standards, will have no
overhead.

== Additional Methods

In additional, depends on an event type, RightJS provides several additional
methods which helps you determine the pressed key, grab the cursor position,
etc.

== Constants

There are several additional constants attached to the {Event} object which
provide you names for the key and mouse-button codes.

Mouse button names are saved at the <tt>Event.BUTTONS</tt> constant (the
actual codes will change depends on the current browser)

 * LEFT
 * RIGHT
 * MIDDLE
 
Keyboard command key codes are situated at the <tt>Event.KEYS</tt> constant

 * BACKSPACE
 * TAB
 * ENTER
 * ESCAPE
 * SPACE
 * PAGE_UP
 * PAGE_DOWN
 * END
 * HOME
 * LEFT
 * UP
 * RIGHT
 * DOWN
 * INSERT
 * DELETE
 
== Manual Events Firing

Additionally, the advanced events support module, provides the ability to fire
real DOM events on your elements. And as those are real events they will
follow all the standard rules, bubble, propagate and have all the standard
attributes.

The interface remains the same like it is defined in the core

<code>
  $('element').fire('click');
  $('element').click({keyShift: true});
  
  $('element').keypress({keyCode: 22});
</code>

NOTE: Please, be advised that in the Konqueror browsers there is a problem
with the key-events, the browser looses the <tt>keyCode</tt> attribute during
the manual keyboard events firing process.

