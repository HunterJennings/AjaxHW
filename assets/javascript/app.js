var topics = ["cats","dogs","snakes","sharks","bears","monkeys"];
    var $buttons = $("#buttons");
    $("#different-animals").on("click",function(){
        var newTopic = $("#animal-input").val();
        addTopic(newTopic).appendTo($buttons);

    });
    for (var i=0; i< topics.length; i++){
        addTopic(topics[i]).appendTo($buttons);
        
    }

    function addTopic(topic) {
        var $button = $("<button>" + topic+ "</button>");
        $button.attr("data-animal", topic);
        $button.on("click",function(){
            var gifsAppear = $("#gifs-appear");
            gifsAppear.empty();
            var animal = $(this).attr("data-animal");
            var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
            $.ajax({
                url: queryURL,
                method: "GET"
              })
              .then(function(response){
                  var results =response.data;
                  for (var i = 0; i< results.length; i++){
                      var animalsDiv = $("<div>");
                      var p = $("<p>").html("Rating: " + results[i].rating);
                      var animalsImg = $("<img>");
                      animalsImg.attr("data-state", "still");
                    animalsImg.attr("data-still",results[i].images.fixed_height_still.url);
                    animalsImg.attr("data-animate",results[i].images.fixed_height.url);
                      animalsImg.on("click", function() {
                        var state = $(this).attr("data-state");
                        if (state === "still") {
                          $(this).attr("src", $(this).attr("data-animate"));
                          $(this).attr("data-state", "animate");
                        } else {
                          $(this).attr("src", $(this).attr("data-still"));
                          $(this).attr("data-state", "still");
                        }
                      });
                      animalsImg.attr("src", results[i].images.fixed_height_still.url);
                      animalsDiv.append(p);
                      animalsDiv.append(animalsImg);
                      gifsAppear.prepend(animalsDiv);
            
                  }
              });
            });
            return $button;
    }

