// import * as MODEL from "../model/model.js";
import { loadPage } from "../model/model.js";

function changeRoute() {
  let hashTag = window.location.hash;
  let pageID = hashTag.replace("#", "");
  //   console.log(hashTag + ' ' + pageID);

  if (pageID == "") pageID = "home";
  loadPage(pageID);
  console.log(pageID);

  $(" nav a ").removeClass("active");
  $(`#${pageID}`).addClass("active");
}

function initURLListener() {
  $(window).on("hashchange", changeRoute);
  changeRoute(); // Call changeRoute to load the home page.
}

/* The `$(document).ready(function () { ... });` code block is using jQuery to wait for the document
(DOM) to be fully loaded before executing the provided function. */
$(document).ready(function () {
  initURLListener();
  $(".pieces").mouseenter(function (e) {
    pushPiece(e, this);
  });
  $(document).on("click", (e) => {
    var rand = Math.floor(Math.random() * 18 + 1);
    $(".pieces").css(
      "background-image",
      `url('../images/pieces/Asset ${rand}.svg')`
    );
  });
});

function pushPiece(mouse, elem) {
  const moveSpeed = 70;

  let piecePosition = [
    Number($(elem).css("left").replace("px", "")) +
      Number($(elem).css("width").replace("px", "")) / 2,
    Number($(elem).css("top").replace("px", "")) +
      Number($(elem).css("height").replace("px", "")) / 2,
  ];
  let pieceCssPosition = [
    Number($(elem).css("left").replace("px", "")),
    Number($(elem).css("top").replace("px", "")),
  ];

  let mouseX = mouse.pageX;
  let mouseY = mouse.pageY;
  let mousePosition = [mouse.pageX, mouse.pageY];

  let difference = [
    piecePosition[0] - mousePosition[0],
    piecePosition[1] - mousePosition[1],
  ];
  let max = Math.abs(difference[0]) + Math.abs(difference[1]);
  let differenceNormalized = [difference[0] / max, difference[1] / max];

  var leniency = 0;
  if (differenceNormalized[0] < leniency && differenceNormalized[0] > -leniency)
    differenceNormalized[0] = 0;
  if (differenceNormalized[1] < leniency && differenceNormalized[1] > -leniency)
    differenceNormalized[1] = 0;

  let moveAmmount = [
    differenceNormalized[0] * moveSpeed,
    differenceNormalized[1] * moveSpeed,
  ];

  // console.log(piecePosition);
  // console.log(mousePosition);
  // console.log("differNORM", differenceNormalized);
  // console.log("tomove", moveAmmount);

  $(elem).css({
    left: pieceCssPosition[0] + moveAmmount[0],
  });
  $(elem).css({
    top: pieceCssPosition[1] + moveAmmount[1],
  });

  if (piecePosition[0] > window.screen.width - 100) {
    $(elem).css({
      left: "50%",
    });
  }
  if (piecePosition[1] > window.screen.height - 300) {
    $(elem).css({
      top: "50%",
    });
  }
  if (piecePosition[0] < 100) {
    $(elem).css({
      left: "50%",
    });
  }
  if (piecePosition[1] < 100) {
    $(elem).css({
      top: "50%",
    });
  }
}
