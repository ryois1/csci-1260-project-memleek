'use strict';

const formatBytes = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB', 'CB', 'Infinity'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = i < sizes.length ? sizes[i] : 'Infinity';
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + size;
}

const formatBytesPerS = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB', 'CB', 'Infinity'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = i < sizes.length ? sizes[i] : 'Infinity';
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + size + '/s';
}

const formatSize = (bytes) => {
  if (bytes === 0) return '0';
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2));
}

const baseNotation = (bytes) => {
  if (bytes === 0) return 'Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB', 'CB', 'Infinity'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const size = i < sizes.length ? sizes[i] : 'Infinity';
  return size;
}


const updateBytes = (bytes) => {
  let bytesPerSecond = window.minerInstances[0].production * window.minerInstances[0].quantity;

  if (bytes > 1e+27) {
    $("#bytes").html(bytes.toExponential(2).replace('+', '').toFixed(2));
    document.title = `${bytes.toExponential(2).replace('+', '')} | ${bytesPerSecond.toExponential(2).replace('+', '') + ' B/s'} | Mem.Leek`;
    $("#bytesExt").html('Bytes');
    $("#bytesPerSec").html(bytesPerSecond.toExponential(2).replace('+', '') + ' Bytes/s');
  } else {
    $("#bytes").html(formatSize(bytes));
    document.title = `${formatSize(bytes)} ${baseNotation(bytes)} | ${formatBytesPerS(bytesPerSecond)} | Mem.Leek`;
    $("#bytesExt").html(baseNotation(bytes));
    $("#bytesPerSec").html(formatBytesPerS(bytesPerSecond));
  }

}



function smoothUpdateMainDisplay(oldValue, newValue, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    updateBytes(Math.floor(progress * (newValue - oldValue) + oldValue));
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}

export { formatBytes, updateBytes, smoothUpdateMainDisplay };