var foldLine = require( '..' )
var assert = require( 'assert' )

suite( 'foldline', function() {

  test( 'simple soft wrap', function() {

    var input = 'This string should be way longer than 78 chars. ' +
      'Which should trigger line folding. Let\'s see, if this works...'

    var expected = [
      'This string should be way longer than 78 chars. Which should trigger line',
      ' folding. Let\'s see, if this works...'
    ].join( '\r\n ' )

    var actual = foldLine( input )

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
      ' f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e69836211986674',
      ' 0e271 f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e69836211',
      ' 9866740e271'
    ].join( '\r\n' )

    var actual = foldLine( input )

    assert.strictEqual( actual, expected )

  })

  test( 'forced hard wrap', function() {

    var input = 'This string should be way longer than 78 chars. ' +
      'Which should trigger line folding. Let\'s see, if this works... ' +
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271 ' +
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271'

    var expected = [
      'This string should be way longer than 78 chars. Which should trigger line f',
      ' olding. Let\'s see, if this works... f97c055cbb09fd2c4414e698362119866740e27',
      ' 1f97c055cbb09fd2c4414e698362119866740e271 f97c055cbb09fd2c4414e698362119866',
      ' 740e271f97c055cbb09fd2c4414e698362119866740e271'
    ].join( '\r\n' )

    var actual = foldLine( input, null, true )

    assert.strictEqual( actual, expected )

  })

  test( 'smallest maxLength', function() {

    var input = 'abcdefgh'
    var expected = 'ab\r\n cd\r\n ef\r\n gh'
    var actual = foldLine( input, 5 )

    assert.strictEqual( actual, expected )

  })

})
