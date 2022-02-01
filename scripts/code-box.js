let copyBtn = document.getElementById("copy-btn");
let swapList = copyBtn.getElementsByClassName("ico-wrapper");

function swapIcons() {
  copyBtn.classList.toggle("ico-swap");
  [].forEach.call(swapList, function (element) {
    element.classList.toggle("ico-swap");
  });
}

copyBtn.onclick = function copy() {

  swapIcons();

  setTimeout(function() {
    swapIcons(swapList);
  }, 1000);

  /* Get the text field */
  let copyText = document.getElementById("cd-text").innerText;

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText);
}

function expand(str) {
  let element = document.getElementById(str);
  element.getElementsByClassName("text").item(0).classList.toggle("collapsed")
  element.getElementsByClassName("expand-btn").item(0).classList.toggle("collapsed");
  element.getElementsByClassName("expand-prompt").item(0).classList.toggle("collapsed");
  element.classList.toggle("collapsed");
}
