let checkboxSelector =
  ".node-form .node-add-edit-form__sidebar :not(.form-checkboxes):not(td):not(.media-library-item__click-to-select-checkbox):not(.field-content) > .form-type--checkbox input";

function fancyCheckboxes() {
  console.log("Fancy checkboxes is loading!");

  function insertAfter(newNode, existingNode) {
    existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling);
  }

  function addToggle(checkbox) {
    let toggle = document.createElement("span");
    toggle.classList.add("checkbox-toggle");
    checkbox.insertAfter(toggle, checkbox);
  }

  var checkboxes = document.querySelectorAll(checkboxSelector);

  if (checkboxes !== undefined && checkboxes.length > 0) {
    checkboxes.forEach(addToggle);
  }

  // function checkParent(current) {
  //   var iframeParent = current.parentNode;

  //   if (!iframeParent.classList.contains("iframe-ratio")) {
  //     wrap(current, document.createElement("div"));
  //   }
  // }

  // // get the proportions of the width and height of the iframe
  // function getIframeRatio(iframe) {
  //   // if there's a iframeRatio already set, just use it
  //   if (iframe.hasAttribute("iframeRatio")) {
  //     iframeRatio = Number(iframe.getAttribute("iframeRatio"));
  //   } else {
  //     if (iframe.height && iframe.width) {
  //       iframeRatio = iframe.height / iframe.width;
  //       iframe.removeAttribute("height");
  //       iframe.removeAttribute("width");
  //     } else {
  //       // default to 9 : 16 if no other info given!
  //       iframeRatio = 9 / 16;
  //     }
  //     iframe.setAttribute("iframeRatio", iframeRatio);
  //   }
  //   return iframeRatio;
  // }

  // function setIframeRatio(current) {
  //   var iframeParent = current.parentNode;

  //   if (
  //     iframeParent.nodeName == "DIV" &&
  //     iframeParent.classList.contains("iframe-ratio")
  //   ) {
  //     var iframeRatio = getIframeRatio(current);
  //     iframeParent.style.paddingTop = iframeRatio * 100 + "%";
  //   }
  // }
}

document.addEventListener("DOMContentLoaded", fancyCheckboxes);
