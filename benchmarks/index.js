/* eslint no-console: 0 */
const fs = require('fs');
const {repeats, test} = require('./test');
const {
  objectGetNative,
  objectGetSeamlessImmutableJs,
  objectGetImmutableJs,
  objectGetMoriJs,
  objectGetCrio,
  objectGetCrioOld,
  arrayGetNative,
  arrayGetSeamlessImmutableJs,
  arrayGetImmutableJs,
  arrayGetMoriJs,
  arrayGetCrio,
  arrayGetCrioOld
} = require('./get');

const {
  objectGetInNative,
  objectGetInSeamlessImmutableJs,
  objectGetInImmutableJs,
  objectGetInMoriJs,
  objectGetInCrio,
  objectGetInCrioOld,
  arrayGetInNative,
  arrayGetInSeamlessImmutableJs,
  arrayGetInImmutableJs,
  arrayGetInMoriJs,
  arrayGetInCrio,
  arrayGetInCrioOld
} = require('./getin');

const {
  objectSetNative,
  objectSetSeamlessImmutableJs,
  objectSetImmutableJs,
  objectSetMoriJs,
  objectSetCrio,
  objectSetCrioOld,
  arraySetNative,
  arraySetSeamlessImmutableJs,
  arraySetImmutableJs,
  arraySetMoriJs,
  arraySetCrio,
  arraySetCrioOld
} = require('./set');

const {
  objectSetInNative,
  objectSetInSeamlessImmutableJs,
  objectSetInImmutableJs,
  objectSetInMoriJs,
  objectSetInCrio,
  objectSetInCrioOld,
  arraySetInNative,
  arraySetInSeamlessImmutableJs,
  arraySetInImmutableJs,
  arraySetInMoriJs,
  arraySetInCrio,
  arraySetInCrioOld
} = require('./setin');

const header = () => `Benchmark (all times in milliseconds): ${repeats.join(', ')}`;

console.log('starting benchmarks...');

const results = [];
const logAndSave = (it) => {
  results.push(it);
  console.log(it);
};

// header
logAndSave(header());
// object get tests
logAndSave(test('[get] Object Native', objectGetNative));
logAndSave(test('[get] Object Seamless-immutable', objectGetSeamlessImmutableJs));
logAndSave(test('[get] Object Immutable.js', objectGetImmutableJs));
logAndSave(test('[get] Object Mori.js', objectGetMoriJs));
logAndSave(test('[get] Object Crio', objectGetCrio));
logAndSave(test('[get] Object Crio old', objectGetCrioOld));
// array get tests
logAndSave(test('[get] Array Native', arrayGetNative));
logAndSave(test('[get] Array Seamless-immutable.js', arrayGetSeamlessImmutableJs));
logAndSave(test('[get] Array Immutable.js', arrayGetImmutableJs));
logAndSave(test('[get] Array Mori.js', arrayGetMoriJs));
logAndSave(test('[get] Array Crio', arrayGetCrio));
logAndSave(test('[get] Array Crio old', arrayGetCrioOld));
// object get in tests
logAndSave(test('[get-in] Object Native', objectGetInNative));
logAndSave(test('[get-in] Object Seamless-immutable', objectGetInSeamlessImmutableJs));
logAndSave(test('[get-in] Object Immutable.js', objectGetInImmutableJs));
logAndSave(test('[get-in] Object Mori.js', objectGetInMoriJs));
logAndSave(test('[get-in] Object Crio', objectGetInCrio));
logAndSave(test('[get-in] Object Crio old', objectGetInCrioOld));
// array get in tests
logAndSave(test('[get-in] Array Native', arrayGetInNative));
logAndSave(test('[get-in] Array Seamless-immutable.js', arrayGetInSeamlessImmutableJs));
logAndSave(test('[get-in] Array Immutable.js', arrayGetInImmutableJs));
logAndSave(test('[get-in] Array Mori.js', arrayGetInMoriJs));
logAndSave(test('[get-in] Array Crio', arrayGetInCrio));
logAndSave(test('[get-in] Array Crio old', arrayGetInCrioOld));
// object set tests
logAndSave(test('[set] Object Native', objectSetNative));
logAndSave(test('[set] Object Seamless-immutable', objectSetSeamlessImmutableJs));
logAndSave(test('[set] Object Immutable.js', objectSetImmutableJs));
logAndSave(test('[set] Object Mori.js', objectSetMoriJs));
logAndSave(test('[set] Object Crio', objectSetCrio));
logAndSave(test('[set] Object Crio old', objectSetCrioOld));
// array set tests
logAndSave(test('[set] Array Native', arraySetNative));
logAndSave(test('[set] Array Seamless-immutable.js', arraySetSeamlessImmutableJs));
logAndSave(test('[set] Array Immutable.js', arraySetImmutableJs));
logAndSave(test('[set] Array Mori.js', arraySetMoriJs));
logAndSave(test('[set] Array Crio', arraySetCrio));
logAndSave(test('[set] Array Crio old', arraySetCrioOld));
// object set in tests
logAndSave(test('[set-in] Object Native', objectSetInNative));
logAndSave(test('[set-in] Object Seamless-immutable', objectSetInSeamlessImmutableJs));
logAndSave(test('[set-in] Object Immutable.js', objectSetInImmutableJs));
logAndSave(test('[set-in] Object Mori.js', objectSetInMoriJs));
logAndSave(test('[set-in] Object Crio', objectSetInCrio));
logAndSave(test('[set-in] Object Crio old', objectSetInCrioOld));
// array set in tests
logAndSave(test('[set-in] Array Native', arraySetInNative));
logAndSave(test('[set-in] Array Seamless-immutable.js', arraySetInSeamlessImmutableJs));
logAndSave(test('[set-in] Array Immutable.js', arraySetInImmutableJs));
logAndSave(test('[set-in] Array Mori.js', arraySetInMoriJs));
logAndSave(test('[set-in] Array Crio', arraySetInCrio));
logAndSave(test('[set-in] Array Crio old', arraySetInCrioOld));

// write to file
if (fs && fs.writeFileSync) {
  fs.writeFileSync('results.csv', results.join('\n'), 'utf8');
  console.log('benchmarks done! Results saved to results.csv');
} else {
  console.log('benchmarks done!');
}
