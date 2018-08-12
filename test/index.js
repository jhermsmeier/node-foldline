var foldLine = require( '..' )
var assert = require( 'assert' )

function checkMaxLength( input, maxLength ) {
  var lines = input.split( /\r\n/g )
  for( var i = 0; i < lines.length; i++ ) {
    if( lines[i].length > maxLength ) {
      throw new Error( `Line length of ${maxLength} exceeded with ${lines[i].length} chars on line ${i+1}` )
    }
  }
  return true
}

suite( 'foldline', function() {

  test( 'simple soft wrap', function() {

    var input = 'This string should be way longer than 78 chars. ' +
      'Which should trigger line folding. Let\'s see, if this works...'

    var expected = [
      'This string should be way longer than 78 chars. Which should trigger line',
      '  folding. Let\'s see, if this works...'
    ].join( '\r\n' )

    var actual = foldLine( input )

    assert.ok( checkMaxLength( actual, 78 ), 'Exceeded maxLength' )
    assert.strictEqual( actual, expected )

  })

  test( 'soft wrap with switch to hard wrap', function() {

    var input = 'This string should be way longer than 78 chars. ' +
      'Which should trigger line folding. Let\'s see, if this works... ' +
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271 ' +
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271'

    var expected = [
      'This string should be way longer than 78 chars. Which should trigger line',
      '  folding. Let\'s see, if this works...',
      '  f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740',
      ' e271 f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e69836211986',
      ' 6740e271',
    ].join( '\r\n' )

    var actual = foldLine( input )

    assert.ok( checkMaxLength( actual, 78 ), 'Exceeded maxLength' )
    assert.strictEqual( actual, expected )

  })

  test( 'forced hard wrap', function() {

    var input = 'This string should be way longer than 78 chars. ' +
      'Which should trigger line folding. Let\'s see, if this works... ' +
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271 ' +
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271'

    var expected = [
      'This string should be way longer than 78 chars. Which should trigger line fold',
      ' ing. Let\'s see, if this works... f97c055cbb09fd2c4414e698362119866740e271f97c',
      ' 055cbb09fd2c4414e698362119866740e271 f97c055cbb09fd2c4414e698362119866740e271',
      ' f97c055cbb09fd2c4414e698362119866740e271',
    ].join( '\r\n' )

    var actual = foldLine( input, null, true )

    assert.ok( checkMaxLength( actual, 78 ), 'Exceeded maxLength' )
    assert.strictEqual( actual, expected )

  })

  test( 'smallest maxLength', function() {

    var input = 'abcdefgh'
    var expected = [ 'ab', 'c', 'd', 'e', 'f', 'g', 'h' ].join( '\r\n ' )
    var actual = foldLine( input, 2 )

    assert.ok( checkMaxLength( actual, 2 ), 'Exceeded maxLength' )
    assert.strictEqual( actual, expected )

  })

  test( 'subject header', function() {

    var input = 'Subject: from x.y.test by example.net via TCP with ESMTP id ABC12345 for <mary@example.net>'
    var expected = [
      'Subject: from x.y.test by',
      '  example.net via TCP with',
      '  ESMTP id ABC12345 for',
      '  <mary@example.net>'
    ].join( '\r\n' )

    var actual = foldLine( input, 30 )

    assert.ok( checkMaxLength( actual, 30 ), 'Exceeded maxLength' )
    assert.strictEqual( foldLine.unfold( actual ), input.replace( /\r?\n/g, '' ) )
    assert.strictEqual( actual, expected )

  })

})
