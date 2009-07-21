= Intro

With the advanced events support module all the keyboard events will have
additional methods for checking if a certain command key was pressed.

The method names are the following

 * isBackspace
 * isTab
 * isEnter
 * isEscape
 * isSpace
 * isPageUp
 * isPageDown
 * isEnd
 * isHome
 * isLeft
 * isUp
 * isRight
 * isDown
 * isInsert
 * isDelete

Some examples of usage

<code>
  $('input-text').onKeypress(function(event) {
    if (event.isEnter())
      alert("You entered: "+ this.value);
  });
  
  document.onKeypress(function(event) {
    if (event.isEscape()) {
      $('popup').hide();
    }
  });
</code>

