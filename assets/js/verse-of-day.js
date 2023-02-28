$(document).ready(function (e) {
  let book = getRandomInt(0, 65);
  let chapter = getRandomInt(0, bibleJson[book].chapters.length - 1);
  let amountVerses = getRandomInt(0, 2);
  let firstVerse = getRandomInt(
    0,
    bibleJson[book].chapters[chapter].length - 1
  );
  let verses = [firstVerse];

  let count = 1;
  Array.from(Array(amountVerses), () => count++).map((item) => {
    let currentVerse = firstVerse + item;

    if (currentVerse <= bibleJson[book].chapters[chapter].length - 1) {
      verses.push(currentVerse);
    }
  });
  let title = `${bibleJson[book].name} - ${chapter + 1}:${verses.map(
    (verse) => `${verse + 1}`
  )}`;
  let option = {
    year: "numeric",
    month: "short",
    weekday: "short",
    day: "numeric",
  };
  let date = new Date().toLocaleDateString("pt-br", option);
  document.querySelector(".ticketTitle").innerText = title;
  document.querySelector(".ticketDetail > div").innerHTML = `${verses.reduce(
    (acc, verse) =>
      acc + `${verse + 1} ${bibleJson[book].chapters[chapter][verse]}<br />`,
    ""
  )}`;
  document.querySelector(".ticketSubDetail .date").innerText = `${date}`;

  $(".share").on("click", function (e) {
    $(".ticketShadow").hide();
    $(".share").hide();
    html2canvas(document.querySelector(".print"), {
      backgroundColor: "#333",
      windowHeight:
        document.querySelector(".ticketContainer").offsetHeight * 1.7,
      windowWidth: 600,
    }).then((canvas) => {
      let link = document.createElement("a");
      link.href = canvas.toDataURL();
      link.download = title;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      $(".share").show();
      $(".ticketShadow").show();
    });
  });
});

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
