const { merge, fromEvent, takeUntil, combineLatest }= require('rxjs');
const { pairwise, scan, map, reduce, tap, timeInterval, buffer, bufferCount, switchMap} = require('rxjs/operators');

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
      if (duration < 500) {
        return ''
      } else  if (duration < 2000) {
        return ' '
      } else {
        return '   '
      }

    } else {
      return duration > 100 ? '-' : '.'
    }
  }),
  scan(({text, morse}, curr) => {
    morse += curr
    text = morse2text(morse)
    return { text, morse }
  }, {text: '', morse: ''}),
)


.subscribe(doot => {
output.innerHTML = doot.text;
codeOutput.innerHTML = doot.morse
})
