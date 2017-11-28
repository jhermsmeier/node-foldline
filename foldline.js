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
  if( input.length <= maxLength )
    return input

  // Substract 3 because CRLF<space> is the line delimiter
  // (3 bytes + 1 <space> extra because of soft folding)
  maxLength = maxLength - 4

  var CRLF = '\r\n'

  var lines = [], len = input.length
  var lastIndex = 0, index = 0;

  if (hardWrap) {

    // We remove the one <space> extra here again,
    // since we're going into hard folding mode
    maxLength++

    while( index < len ) {
      lines.push( input.slice( index, index += maxLength ) )
    }

    return lines.join( CRLF + ' ' )
  }

  while (index < len) {
    lastIndex = input.lastIndexOf( ' ', maxLength + index )
    if (input.slice(index).length <= maxLength) {
      lines.push( input.slice( index ) )
      break;
    }

    if (lastIndex <= index) {
      lines.push(input.slice(index, index + maxLength));
      index += maxLength;
      continue;
    }


    lines.push(input.slice( index, lastIndex ) )
    index = lastIndex
  }


  return lines.join( CRLF + ' ' )

}
