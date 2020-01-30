

// Initial array of animals
var animals = ["dog", "cat", "Mr. Nobody", "The Lion King"];
//set offset to get different images
var offset = 0;
function displayAnimalInfo() {
var animal = $(this).attr("data-name");
var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
  animal + "&api_key=NUcHjDA6ApR8Hasq0hGpNH5RbAxFmUkf&limit=10&offset="+offset+"";
  console.log(animal)
$.ajax({
  url: queryURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  // make a variable named results and set it equal to response.data
  var results = response.data;
  //========================
   for (var i = 0; i < results.length; i++) {

  // Make a div with jQuery and store it in a variable named animalDiv.
    var animalDiv = $(`<div class="col col-md-4 info-box">`)
    var rating = results[i].rating;
  // Make a paragraph tag with jQuery and store it in a variable named p.
  // Set the inner text of the paragraph to the rating of the image in results[i].
    var p = $("<p>").text("Rating: " + rating);
  // Make an image tag with jQuery and store it in a variable named animalImage.
    var animalImage = $(`<img>`)
  // Set the image's src to results[i]'s fixed_height.url.
    animalImage.addClass("gif");
    animalImage.attr("src", results[i].images.fixed_width_still.url);
    animalImage.attr("data-still", results[i].images.fixed_width_still.url);
    animalImage.attr("data-animate", results[i].images.fixed_width.url);
    animalImage.attr("data-state", "still");

    // Append the animalImage variable to the animalDiv variable.
    animalDiv.append(animalImage);
    // Append the p variable to the animalDiv variable.
    animalDiv.append(p);
  // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
    $("#animal-view").prepend(animalDiv);
  // ==================================
   }
   //update offset
   offset+= 10;
});
};

// Function for rendering buttons
function renderButtons() {
  // Deletes the animals prior to adding new animals
  // (this is necessary otherwise you will have repeat buttons)
  $("#buttons-view").empty();
  // Loops through the array of animals
  for (var i = 0; i < animals.length; i++) {
    // Then dynamicaly generates buttons for each item in the array
    // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
    var a = $(`<button class="animal btn btn-primary">`);
    // Added a data-attribute
    a.attr("data-name", animals[i]);
    // Provided the initial button text
    a.text(animals[i]);
    // Added the button to the buttons-view div
    $("#buttons-view").append(a);
  }
}

// This function handles events where the add button is clicked
$("#add-animal").on("click", function(event) {
  event.preventDefault();

  // This line of code will grab the input from the textbox
  var animal = $("#animal-input").val().trim();
  //prevent blank buttons to be added:
  if(!animal){
      return false
  }
  // The animal from the textbox is then added to our array
  animals.push(animal);
  // Calling renderButtons which handles the processing of our array
  renderButtons();
});


function animateGifs() {

    var state = $(this).attr("data-state");
    //make a second variable named stillURL and the store the img data-still into it
    var stillURL = $(this).attr("data-still")
    //make a third variable named animatedURL and the store the img data-animate into it
    var animatedURL = $(this).attr("data-animate")

    console.log(state)
    console.log(stillURL)
    console.log(animatedURL)
    
    // If state is equal to 'animate', then update the src attribute of this. then update state to still
    // image to it's data-still value and update the data-state attribute to 'still'. then update state to animate
   if (state === "still"){
      $(this).attr("src", animatedURL)
      $(this).attr("data-state", "animate")
   }
   else if(state === "animate"){
      $(this).attr("src", stillURL)
      $(this).attr("data-state", "still")
   }
};

// Adding click event listeners to all elements with a class of "animal"
$(document).on("click", ".animal", displayAnimalInfo);
$(document).on("click", ".gif", animateGifs)

// Calling the renderButtons function to display the intial buttons
renderButtons();