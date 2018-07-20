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
      '  f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e6983621198667',
      ' 40e271',
      '  f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e6983621198667',
      ' 40e271'
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
      'This string should be way longer than 78 chars. Which should trigger line fo',
      ' lding. Let\'s see, if this works... f97c055cbb09fd2c4414e698362119866740e271',
      ' f97c055cbb09fd2c4414e698362119866740e271 f97c055cbb09fd2c4414e6983621198667',
      ' 40e271f97c055cbb09fd2c4414e698362119866740e271'
    ].join( '\r\n' )

    var actual = foldLine( input, null, true )

    assert.strictEqual( actual, expected )

  })

  test( 'soft wrap with switch to hardwrap', function() {

    var input = 'This string should be way longer than 78 chars. ' +
      'Which should trigger line folding. Let\'s see, if this works... ' +
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271 ' +
        'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa ' +
      'f97c055cbb09fd2c4414e698362119866740e271 ' +
      'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab ' +
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271'

    var expected = [
      'This string should be way longer than 78 chars. Which should trigger line',
      '  folding. Let\'s see, if this works...',
      '  f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e6983621198667',
      ' 40e271 aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
      '  f97c055cbb09fd2c4414e698362119866740e271',
      '  aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab',
      '  f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e6983621198667',
      ' 40e271'
    ].join( '\r\n' )

    var actual = foldLine( input, null )

    assert.strictEqual( actual, expected )

  })

  test( 'automatic hard wrap', function() {

    var input = 'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271'
      + 'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271'
      + 'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740e271';

    var expected = [
      'f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e698362119866740',
      ' e271f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e6983621198',
      ' 66740e271f97c055cbb09fd2c4414e698362119866740e271f97c055cbb09fd2c4414e69836',
      ' 2119866740e271'
    ].join( '\r\n' )

    var hardactual = foldLine( input, null, true )
    var softactual = foldLine( input, null, false )

    assert.strictEqual( hardactual, expected )
    assert.strictEqual( softactual, expected )

  })

  test( 'smallest maxLength', function() {

    var input = 'abcdefgh'
    var expected = 'abcd\r\n efg\r\n h'
    var actual = foldLine( input, 6 )

    assert.strictEqual( actual, expected )

  })

})
