$(document).ready(function() {
  $("#tweet-text").on("input", (e) => {
    let chars = 140 - (e.target.value.length)

    if (chars >= 0) {
      $(".counter").text(chars).css("color", "black")
    } else {
      $(".counter").text(chars).css("color", "red")
    }
    
  });

});