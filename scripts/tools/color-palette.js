document.getElementById("generate").addEventListener("click", function (event) {
  event.preventDefault();
  let url = "http://colormind.io/api/";
  let data = {
    model: "default",
    input: [[44, 43, 44], [90, 83, 82], "N", "N", "N"],
  };

  let http = new XMLHttpRequest();

  http.onreadystatechange = function () {
    if ((http.readyState == 4 && http.status == 200)) {
      let palette = JSON.parse(http.responseText).result;
      console.log(palette);

    }
  };

  http.open("POST", url, true);
  http.send(JSON.stringify(data));
});

function changeColors(palette) {
  let colors = Array.from(document.getElementsByClassName("color"));
  for (let i = 0; i < colors.length; i++) {
    colors[i].style.backgroundColor = palette[i];
  }
}
