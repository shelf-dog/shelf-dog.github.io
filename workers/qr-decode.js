importScripts("/scripts/jsqr.min.js");

self.addEventListener("message", message => {
  const { width, height, data } = message.data;
  self.postMessage(jsQR(data, width, height));
});