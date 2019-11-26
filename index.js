
const letters = [
  {letter: ' ', code: '   '},
  {letter: 'A', code: '.-'},
  {letter: 'B', code: '-...'},
  {letter: 'C', code: '-.-.'},
  {letter: 'D', code: '-..'},
  {letter: 'E', code: '.'},
  {letter: 'F', code: '..-.'},
  {letter: 'G', code: '--.'},
  {letter: 'H', code: '....'},
  {letter: 'I', code: '..'},
  {letter: 'J', code: '.---'},
  {letter: 'K', code: '-.-'},
  {letter: 'L', code: '.-..'},
  {letter: 'M', code: '--'},
  {letter: 'N', code: '-.'},
  {letter: 'O', code: '---'},
  {letter: 'P', code: '.--.'},
  {letter: 'Q', code: '--.-'},
  {letter: 'R', code: '.-.'},
  {letter: 'S', code: '...'},
  {letter: 'T', code: '-'},
  {letter: 'U', code: '..-'},
  {letter: 'V', code: '...-'},
  {letter: 'W', code: '.--'},
  {letter: 'X', code: '-..-'},
  {letter: 'Y', code: '-.--'},
  {letter: 'Z', code: '--..'},
  {letter: '?', code: '..--..'},
]

const text2morse = (str) => {
  return str.split("").map(letter => {
   
   try {
     const code = letters.find(x => x.letter === letter.toUpperCase()).code
     return code
   } catch (e) {
     return letters.find(x => x.letter === '?').code
   }
 }).join(" ")
}

const morse2text = (str) => {

  let [result, remainingBuffer] = str.split("").reduce(([output, buffer], curr) => {

    switch (curr) {
      case '.':
      case '-':
        buffer += curr;
        break;
      case ' ':
        const bla = letters.find(x => x.code === buffer)
        if (bla) {
          output += bla.letter;
          buffer = '';
        } else {
          buffer += curr;
        }
    }
    return [output, buffer]
  
  }, ['', ''])
  
  if (remainingBuffer) {
    result += letters.find(x => x.code === remainingBuffer).letter;
  }

  return result;
}

module.exports = {
  text2morse,
  morse2text
}
