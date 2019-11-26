const { merge, fromEvent }= require('rxjs');
const { pairwise, scan, map } = require('rxjs/operators');

const { morse2text } = require('../')

const button = document.querySelector('button');

const output = document.querySelector('#text');
const codeOutput = document.querySelector('#code');

const mouseDown = fromEvent(button, 'mousedown')
const mouseUp = fromEvent(button, 'mouseup');

merge(
  mouseDown,
  mouseUp
)
.pipe(
  pairwise(),
  map(([previous, current]) => {
    const duration = current.timeStamp - previous.timeStamp
    if (current.type === 'mousedown') {
      if (duration < 300) {
        return ''
      } else  if (duration < 700) {
        return ' '
      } else {
        return '     '
      }

    } else {
      return duration > 100 ? '-' : '.'
    }
  }),
  scan(({text, morse}, curr) => {
    morse += curr
    console.log({morse})
    text = morse2text(morse)
    return { text, morse }
  }, {text: '', morse: ''}),
)


.subscribe(doot => {
output.innerHTML = doot.text;
codeOutput.innerHTML = doot.morse
})
