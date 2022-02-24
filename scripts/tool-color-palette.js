fetchColors();

document.getElementById("generate").addEventListener("click", function () {});

function fetchColors() {
  let url = "http://colormind.io/api/";
  let data = {
    model: "default",
    input: [[44, 43, 44], [90, 83, 82], "N", "N", "N"],
  };

  let http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    if ((http.readyState = 4 && http.status == 200)) {
      let palette = JSON.parse(http.responseText).result;
      insertColors(palette);
    }
  };

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
}

function insertColors(palette) {
  console.log(palette);
}
