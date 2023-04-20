function showNotification(message, duration, color1, color2) {
  console.log("showNotification", message, duration, color1, color2)
  Toastify({
    text: message,
    duration: duration ? duration : 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background:
        `linear-gradient(90deg, ${color1} 0%, ${color2} 100%)`,
    },
  }).showToast();
}

export { showNotification };