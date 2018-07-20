/**
 * Folds a long line according to RFC 5322
 * @see http://tools.ietf.org/html/rfc5322#section-2.1.1
 *
 * @param  {String}  input
 * @param  {Number}  maxLength
 * @param  {Boolean} hardWrap
 * @return {String}
 */
module.exports = function foldLine( input, maxLength, hardWrap ) {
  // Remove any newlines
  input = input.replace( /\r?\n/g, '' )

  if( maxLength != null && maxLength < 5 )
    throw new Error( 'Maximum length must not be less than 5' )

  // RFC compliant default line length
  maxLength = maxLength != null ? maxLength : 78

  // We really don't need to fold this
  if( input.length <= maxLength ) {
    return input
  }

  // Substract 3 because CRLF<space> is the line delimiter
  // (2 bytes + 1 <space> extra because of folding)
  // soft folding is automatically taken into account.
  maxLength = maxLength - 3

  var CRLF = '\r\n'

  var lines = [], len = input.length
  var index = 0;
  var words;

  if (hardWrap || (words = input.split(' ')).length === 1) {

    while( index < len ) {
      // add 1 at the first line, because we start without a space
      lines.push( input.slice( index, index += (maxLength + (index ? 0 : 1))))
    }

    return lines.join( CRLF + ' ' );
  }

  var j, word;
  var line = [];
  var count = 0;
  for (var i = 0; i < words.length; i++) {
    word = words[i];
    if (count + word.length > maxLength && count > 0) {
      lines.push(line.join(' '));
      // push a space on the stack, as we will be skipping the first space (soft folding)
      line = [''];
      count = 1;
    }
    // this will only be taken if we just flushed the lines
    for (j = 0; word.length - j > maxLength - count;) {
      // Either we still have a space on the stack from the last word or we are in hardwrap mode:
      if (count) {
        // space on the stack
        lines.push(' ' + word.slice(j, j += maxLength - count));
        line = [];
        count = 0;
      } else {
        // hardwrap mode
        lines.push(word.slice(j, j += maxLength));
      }
    }
    // always push the remainder on the stack for the space
    // count + word.length <= maxLength
    line.push(j ? word.slice(j) : word);
    // + 1 for the space
    count += word.length + 1 - j;
  }
  if (count > 1) {
    lines.push(line.join(' '));
  }
  return lines.join(CRLF + ' ' );
};
