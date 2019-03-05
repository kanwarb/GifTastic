
var animalArr = ['dog', 'Cats', 'Tiger', 'Hamster', 'Lion', 'Cheetah', 'Aligator', 'Shark', 'Dolphin']
var addAnimal;


// Run a Giphy Search when one of the animal buttons is pressed.
function showAnimal(animalName){

   // event.preventDefault();
    

    AddURL = "https://api.giphy.com/v1/gifs/search?api_key=zn11jQQ2k0hkF7FUnGA39VN9cZRbr5d6&q=" + animalName + "&limit=25&offset=0&rating=G&lang=en" ;

    $.ajax({
        method: "GET",
        url: AddURL
    }).then(function (response){
        console.log(response.data);
       
       // $("#search-animal").append("<div id='animals-div'></div>") ;
        $(response.data).each(function (index, items) {
            var cardDiv = $("<div>");
            var cardDivId = 'animals-div'+index ;
            cardDiv.addClass("animalclass card p-4");
            cardDiv.attr("id" , cardDivId);
            // Append one image to per div
            $(cardDiv).append("<img  id=" + index + " class='img-click  img-thumbnail  p-2' src=" + items.images.fixed_width_small_still.url + " data-status='still'" + " data-animate=" + items.images.fixed_width_small.url + " data-still=" + items.images.fixed_width_small_still.url + ">");
           // append the Div to the Parent Div
            $("#search-animal").append(cardDiv);
        });

        $("img").click(function(){
            event.preventDefault();
            
            imageStatus = $(this).attr('data-status');
           console.log(imageStatus, $(this).attr('id'));
            if(imageStatus ==='still'){
                $(this).attr("src", $(this).attr("data-animate"));
                $(this).attr('data-status','animate');
            }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr('data-status','still');
            }
        });  
        
    })
}

function renderButtons() {
    var buttonDiv = $("<div>");
    buttonDiv.addClass("anim-card anim-button");
    buttonDiv.attr("id" , "animalButtonDiv");
    for(i=0;i< animalArr.length; i++){
       $(buttonDiv).append("<button class='anim-button bg-warning  m-2' id=" + animalArr[i] + " value=" + animalArr[i] + ">" + animalArr[i] + "</button>");
    }
    $("#search-animal").append(buttonDiv);
}

renderButtons();

$(".anim-button").on("click", function(event){
    //event.preventDefault();
    var animalName = $(this).val();

    $('#search-animal').find('*').not('.anim-button').remove();
    showAnimal(animalName);

});




// Add new Animal to the list when an an animal name is entered in the input and add button is pressed.

