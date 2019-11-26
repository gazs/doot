const { text2morse, morse2text } = require('./')

describe('text2morse', () => {
  test('space between the signals forming the same letter is equal to 1 dot', () => {});
  test('space between two letters is equal to 3 dots', () => {});
  test('space between two words is equal to 7 dots', () => {});
});

describe('identity', () => {
  test('alphabet', () => {
    const alphabet = "abcdefghijklmnopqrstuvwxyz"
    expect(morse2text(text2morse(alphabet))).toEqual(alphabet.toUpperCase());
  })

  test('spaces', () => {
    const alphabet = "A B"
    expect(morse2text(text2morse(alphabet))).toEqual(alphabet.toUpperCase());
  })

  test('multiple spaces', () => {
    const alphabet = "A     BC AAA B"
    expect(morse2text(text2morse(alphabet))).toEqual(alphabet.toUpperCase());
  })

  test('invalid character', () => {
    const alphabet = "aáa"
    expect(morse2text(text2morse(alphabet))).toEqual('A?A');
  })
});

describe('morse2text', () => {
  test('long gap', () => {
    expect(morse2text('-     -')).toEqual('T T')
  });
})
