/**
 * The String unit additionals
 *
 * Credits:
 *   The faster trim method is based on the work of Yesudeep Mangalapilly 
 *   http://yesudeep.wordpress.com/2009/07/31/even-faster-string-prototype-trim-implementation-in-javascript/
 *   
 * @copyright (C) 2009-2010 Nikolay V. Nemshilov
 */

if (String.prototype.trim.toString().include('return')) {
  String.WSPS = [];
  $w("0009 000a 000b 000c 000d 0020 0085 00a0 1680 180e 2000 2001 2002 2003 2004 2005 "+
     "2006 2007 2008 2009 200a 200b 2028 2029 202f 205f 3000").each(function(key) {
       String.WSPS[key.toInt(16)] = 1;
  });
  
  String.include({
    trim: function() {
      var str = this, len = this.length, i = 0;
      if (len) {
        while (String.WSPS[str.charCodeAt(--len)]);
        if (++len) {
          while(String.WSPS[str.charCodeAt(i)]) i++;
        }
        str = str.substring(i, len);
      }
      return str;
    }
  });
}

String.include({
  truncate: function(length, after) {
    var after = defined(after) ? after : '...';
    
    return this.length <= length ? this :
      this.substr(0, length - after.length) + after;
  }
});