
var animalArr = ['dog', 'Cats', 'Tiger', 'Hamster', 'Lion', 'Cheetah', 'Aligator', 'Shark', 'Dolphin']
var addAnimal;


// Run a Giphy Search when one of the animal buttons is pressed.
function showAnimal(animalName){

    event.preventDefault();
    $("#animals-div").empty();

    AddURL = "https://api.giphy.com/v1/gifs/search?api_key=zn11jQQ2k0hkF7FUnGA39VN9cZRbr5d6&q=" + animalName + "&limit=25&offset=0&rating=G&lang=en" ;

    $.ajax({

        method: "GET",
        url: AddURL
    }).then(function (response){
        console.log(JSON.stringify(response.data));
        console.log(response.data.length);
        $("#search-animal").append("<div id='animals-div'></div>") ;
        $(response.data).each(function (index, item) {
           
           $("#animals-div").append("<img class='p-3 ul.polaroids' src=" + item.images.fixed_width_small_still.url + " title='dog'>");
        })    

        
    })
}


function renderButtons() {

    for(i=0;i< animalArr.length; i++){
        
       $("#search-animal").append("<button class='anim-button bg-primary m-2' id=" + animalArr[i] + " value=" + animalArr[i] + ">" + animalArr[i] + "</button>");
    }

}

renderButtons();
$(".anim-button").on("click", function (event){
    event.preventDefault();
    var animalName = $(this).val();
    console.log(animalName);
    showAnimal(animalName);
});


// Add new Animal to the list when an an animal name is entered in the input and add button is pressed.

