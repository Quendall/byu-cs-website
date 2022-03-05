const ICONS = {
  copy: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-copy"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>',
  lock: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-lock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>',
  unlock:
    '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-unlock"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 9.9-1"></path></svg>',
};

let data = {
  model: "default",
  input: ["N", "N", "N", "N", "N"],
};

document.getElementById("generate").addEventListener("click", function (event) {
  event.preventDefault();
  let url = "http://colormind.io/api/";

  let http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      let palette = JSON.parse(http.responseText).result;
      console.log(palette);

      let boxes = Array.from(document.getElementsByClassName("color"));
      for (let i = 0; i < boxes.length; i++) {
        let box = boxes[i];
        let color = palette[i];
        if (box.firstElementChild.classList.contains("unlock")) {
          box.setAttribute("data-color", JSON.stringify(color));
          setColor(box, color);
          box.className = "color " + calcTextColor(color);
          // box.getElementsByClassName("color-code")[0].innerHTML = colorCode;
          rgbVals = Array.from(box.getElementsByClassName("rgb-value"));
          for (let j = 0; j < rgbVals.length; j++) {
            rgbVals[j].value = color[j];
          }
        }
        if (box.classList.contains("hidden")) box.classList.remove("hidden");
      }
    }
  };

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
});

function setColor(box, color) {
  let colorCode = getRgbValue(color);
  box.style.backgroundColor = colorCode;
}

let copyList = Array.from(document.getElementsByClassName("copy"));
let locks = Array.from(document.getElementsByClassName("unlock"));
let colorCodes = Array.from(document.getElementsByClassName("color-code"));
for (let i = 0; i < locks.length; i++) {
  copyList[i].innerHTML = ICONS.copy;
  locks[i].innerHTML = ICONS.unlock;
  locks[i].addEventListener("click", function (event) {
    event.preventDefault();
    if (locks[i].classList.contains("unlock")) {
      locks[i].innerHTML = ICONS.lock;
      locks[i].classList.remove("unlock");
      data.input[i] = JSON.parse(locks[i].parentNode.dataset.color);
    } else {
      locks[i].innerHTML = ICONS.unlock;
      locks[i].classList.add("unlock");
      data.input[i] = "N";
    }
    console.log(data.input);
  });

  copyList[i].addEventListener("click", (event) => {
    event.preventDefault();
    let copyContent = getRgbValue(
      JSON.parse(copyList[i].parentNode.dataset.color)
    );
    console.log(copyContent);
    navigator.clipboard.writeText(copyContent);
  });

  let rgbVals = Array.from(colorCodes[i].getElementsByClassName("rgb-value"));
  for (let j = 0; j < rgbVals.length; j++) {
    rgbVals[j].addEventListener("change", (event) => {
      event.preventDefault();
      value = rgbVals[j].value;
      if (value > 255) value = 255;
      if (value < 0) value = 0;
      let color = JSON.parse(colorCodes[i].parentNode.dataset.color);
      color[j] = value;
      setColor(colorCodes[i].parentNode, color);
      colorCodes[i].parentNode.dataset.color = JSON.stringify(color);
    });
  }
}

function getRgbValue(color) {
  return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
}

function calcTextColor(color) {
  if (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114 > 186) {
    return "light";
  } else return "dark";
}

// const item = document.createElement("div");
// item.className = "color";
// item.setAttribute("data-color", JSON.stringify(color));
// let colorCode =
//   "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
// item.style.backgroundColor = colorCode;
// let dataColorClass = "dark";
// if (color[0] * 0.299 + color[1] * 0.587 + color[2] * 0.114 > 186) {
//   dataColorClass = "light";
// }
// let results = "";
// results +=
//   "<button class='unlock " +
//   dataColorClass +
//   "'>" +
//   ICONS.unlock +
//   "</button>";
// results +=
//   "<button class='copy " +
//   dataColorClass +
//   "'>" +
//   ICONS.copy +
//   "</button>";
// results +=
//   "<p class='color-code " + dataColorClass + "'>" + colorCode + "</p>";
// item.innerHTML = results;
// box.appendChild(item);
