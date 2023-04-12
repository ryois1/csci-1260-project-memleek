'use strict';

const formatBytes = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB', 'BB', 'NB', 'DB', 'CB', 'Infinity'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const size = i < sizes.length ? sizes[i] : 'Infinity';
    return parseFloat((bytes / Math.pow(k, i)).toFixed(5)) + ' ' + size;
  }
  

const updateBytes = (bytes) => {
    $("#bytes").html(`${formatBytes(globalBytes)}`);
}

export { formatBytes, updateBytes };
