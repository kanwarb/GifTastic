var animalArr = ['dog', 'Cats', 'Tiger', 'Hamster', 'Lion', 'Cheetah', 'Aligator', 'Shark', 'Dolphin'];
var addAnimal='';


// Run a Giphy Search when one of the animal buttons is pressed.
function showAnimal() {
    var animalName=$(this).data("name");
    $("#animalOuter").remove();
    console.log(animalName)
    AddURL = "https://api.giphy.com/v1/gifs/search?api_key=zn11jQQ2k0hkF7FUnGA39VN9cZRbr5d6&q=" + animalName + "&limit=25&offset=0&rating=G&lang=en";

    $.ajax({
        method: "GET",
        url: AddURL
    }).then(function (response) {
        //console.log(response.data);

        var outerDiv = $("<div>");
        outerDiv.attr("id", "animalOuter");
        $("#search-animal").append(outerDiv);
        // $("#search-animal").append("<div id='animals-div'></div>") ;
        $(response.data).each(function (index, items) {

            var cardDiv = $("<div>");
            var cardDivId = 'animals-div' + index;
            cardDiv.addClass("animalclass p-4");
            cardDiv.attr("id", cardDivId);
            // Append one image to per div
            $(cardDiv).append("<img  id=" + index + " class='img-thumbnail img-state img-click p-2' src=" + items.images.fixed_width_small_still.url + " data-status='still'" + " data-animate=" + items.images.fixed_width_small.url + " data-still=" + items.images.fixed_width_small_still.url + ">");
            // append the Div to the Parent Div
            $(outerDiv).append(cardDiv);
        });


        $(".img-click").unbind('click');
        $(".img-click").click(function () {
            //event.preventDefault();
            imageStatus = $(this).attr('data-status');
            console.log(imageStatus);
            if (imageStatus === "still") {
                $(this).attr("data-status", "animate");
                $(this).attr("src", $(this).attr("data-animate"));

            }
            if (imageStatus === "animate") {
                $(this).attr('data-status', "still");
                $(this).attr("src", $(this).attr("data-still"));
            }
        });
    });

}

function renderButtons() {
    //$('#search-animal').find('*').not('.anim-card').remove();
    $("#animalButtonDiv").remove();
    var buttonDiv = $("<div>");
    buttonDiv.addClass("anim-button");
    buttonDiv.attr("id", "animalButtonDiv");
    console.log(animalArr.length);
    for (i = 0; i < animalArr.length; i++) {
       // $(buttonDiv).append("<button class='xyz anim-button bg-warning  m-2' id=" + animalArr[i] + " data-name=" + animalArr[i] + ">" + animalArr[i] + "</button>");
       var newButton = $("<button>");
       newButton.addClass("xyz anim-button bg-warning  m-2 ");
       newButton.attr("data-name", animalArr[i]);
       newButton.text(animalArr[i]);
       $(buttonDiv).append(newButton);
    }
    $("#search-animal").append(buttonDiv);
}




$("#add-animal").on("click", function (event) {
    event.preventDefault();
    addAnimal = $("#input-animal").val().trim();
    animalArr.push(addAnimal);
    renderButtons();

});

$(document).on("click", ".xyz", showAnimal);

renderButtons();




// Add new Animal to the list when an an animal name is entered in the input and add button is pressed.









