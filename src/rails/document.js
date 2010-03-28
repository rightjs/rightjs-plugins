// the document onload hook
document.on({
  ready: function() {
    RR.hide_flash();
  },
  
  click: function(event) {
    RR.process_click(event);
  }
});