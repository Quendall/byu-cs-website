document.getElementById("generate").addEventListener("click", function (event) {
  event.preventDefault();
  let url = "http://colormind.io/api/";
  let data = {
    model: "default",
    input: [[44, 43, 44], "N", "N", "N", "N"],
  };

  let http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      let palette = JSON.parse(http.responseText).result;
      console.log(palette);
      changeColors(palette);
    }
  };

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
});

function changeColors(palette) {
  let colors = Array.from(document.getElementsByClassName("color"));
  for (let i = 0; i < colors.length; i++) {
    colors[i].style.backgroundColor = getRgbValue(palette[i]);
  }
}

function getRgbValue(color) {
  return "rgb(" + color[0] + ", " + color[1] + ", " + color[2] + ")";
}
