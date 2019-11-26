const { merge, fromEvent, takeUntil, combineLatest }= require('rxjs');
const { scan, map, reduce, tap, timeInterval, buffer, bufferCount, switchMap} = require('rxjs/operators');

const { morse2text } = require('../')

const button = document.querySelector('button');

const mouseDown = fromEvent(button, 'mousedown')
const mouseUp = fromEvent(button, 'mouseup');

mouseDown
.pipe(
  switchMap((a) => {
    const start = performance.now();
    return mouseUp.pipe(
      map(e => performance.now() - start),
      map(doot => doot > 200 ? '-' : '.'),
    )
  }),
  scan(({text, morse}, curr) => {
    morse += curr
    text = morse2text(morse)
    return { text, morse }
  }, {text: '', morse: ''}),
)
.subscribe(doot => console.log(doot))
