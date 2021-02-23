import TagManager from "../TagManager";

let onmessage = function (msg) {
  const document = self.document;
  if (!msg) {
    return;
  } else {
    if (msg.data.action === "init") {
      TagManager.initialize(msg.data.payload);
    } else if (msg.data.action === "data") {
      TagManager.dataLayer(msg.data.payload);
    }
  } 
  postMessage("ok");
};
