var foldLine = require( '..' )

var shortLine = 'From: John Doe <jdoe@machine.example>'
var longLine = 'Subject: from x.y.test by example.net via TCP with ESMTP id ABC12345 for <mary@example.net>'

var text = `Say that Mary, upon receiving this message, wishes to send a copy of
the message to Jane such that (a) the message would appear to have
come straight from John; (b) if Jane replies to the message, the
reply should go back to John; and (c) all of the original
information, like the date the message was originally sent to Mary,
the message identifier, and the original addressee, is preserved.`

suite( 'foldLine (short)', function() {

  bench( 'default', function() {
    return foldLine( shortLine )
  })

  bench( 'maxLength', function() {
    return foldLine( shortLine, 75 )
  })

  bench( 'hardWrap', function() {
    return foldLine( shortLine, null, true )
  })

  bench( 'maxLength, hardWrap', function() {
    return foldLine( shortLine, 75, true )
  })

})

suite( 'foldLine (long)', function() {

  bench( 'default', function() {
    return foldLine( longLine )
  })

  bench( 'maxLength', function() {
    return foldLine( longLine, 75 )
  })

  bench( 'hardWrap', function() {
    return foldLine( longLine, null, true )
  })

  bench( 'maxLength, hardWrap', function() {
    return foldLine( longLine, 75, true )
  })

})

suite( 'foldLine (text)', function() {

  bench( 'default', function() {
    return foldLine( text )
  })

  bench( 'maxLength', function() {
    return foldLine( text, 32 )
  })

  bench( 'hardWrap', function() {
    return foldLine( text, null, true )
  })

  bench( 'maxLength, hardWrap', function() {
    return foldLine( text, 75, true )
  })

})
