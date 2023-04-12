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
  $("#bytes").html(formatSize(bytes));
  $("#bytesExt").html(baseNotation(bytes));
  $("#bytesPerSec").html(formatBytesPerS(bytesPerSecond));

  // Change page title
  document.title = `${formatBytes(bytes)} | Mem.Leek`;
}

export { formatBytes, updateBytes };
