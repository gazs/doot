const { text2morse, morse2text } = require('./')

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
