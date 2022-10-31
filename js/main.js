
 var mealresponse;
 var searchWithName = document.getElementById("searchName");
 var searchWithLetter = document.getElementById("searchLetter")
 searchWithName.value = "";
 searchWithLetter.value ="";
 var userNameInput =document.querySelector("#userNameInput")
 var emailInput = document.querySelector("#emailInput")
 var phoneInput = document.querySelector("#phoneInput")
 var ageInput = document.querySelector("#ageInput")
 var passwordInput = document.querySelector("#passwordInput")
 var rePasswordInput = document.querySelector("#rePasswordInput")
 var userNameInput =document.querySelector("#userNameInput")
 var namaRegex = /^[a-zA-Z ]+$/;
 var emailRegex = /@[a-z0-9]{1,10}(\.)[a-z]{1,10}$/;
 var phoneRegex = /^01[0125][0-9]{8}$/;
 var ageRegex =  /^[1-9][0-9]?$|^100$/;
 var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
 var cartona =""

 $(document).ready(function () {
  $(".loading").fadeOut(2000, function () {
    $("body").css("overflow", "visible");
  });
 });


$(".open-close").click(function()
{
 if ($("nav").css("left") != "-250px") {
  closeNav();
} else {
  $("nav").animate({ left: "0px" }, 500);
  $(".sideBar").animate({ left: "250px" }, 500);
  $("section ul li").animate({ opacity: "1", "padding-top": "25px" }, 1500);
  $(".openCloseIcon").html('<i class="fa fa-align-justify fa-times"></i>');
}
});

function closeNav() {
 {
   $(".openCloseIcon").html('<i class="fa-solid fa-bars"></i>');
   $("nav").animate({ left: "-250px" }, 500);
   $(".sideBar").animate({ left: "0px" }, 500);
   $("section ul li").animate({ opacity: "0", "padding-top": "500" }, 500);
 }
}

let response

async function getYummyApi(){

 let prerespose = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${""}`)
 response = await prerespose.json();
 return(response.meals)
}

 async function showMainMeals()
{

 var meals = await getYummyApi()
 var showMeal = ""
 for (let i = 0; i<meals.length ; i++) {
  showMeal += `<div class="col-lg-3 col-md-4 col-sm-6  my-2 shadow">
  <div class="item position-relative">
   <img src="${meals[i].strMealThumb}" class="w-100 rounded-2" alt="${meals[i].idMeal}">
   <div class="layer d-flex align-items-center rounded-2">
    <h2 class="ps-2 text">${meals[i].strMeal}</h2>
 </div>
</div>
</div>
</div>` 
}
$("#meals").html(showMeal);
getThisMeal()

}
showMainMeals()

function getThisMeal()
{
 $(".item").click(async function()
 {
  $(".loading").fadeIn(500);
  var meal = $(this).find("img").attr("alt");
  let prerespose = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`);
  let mealresponse = await prerespose.json();
  mealresponse = mealresponse.meals[0];

   cartona ="";
   $(".loading").fadeOut(500);
  cartona += `<div class="col-lg-4">
  <img src="${mealresponse.strMealThumb}" class="w-100 mb-2" alt="">
  <h2 class="text-center">${mealresponse.strMeal}</h2>
</div>
<div class="col-lg-8">
 <h2 class="mb-3">Instruction</h2>
   <p class="mb-3">${mealresponse.strInstructions}</p>
   <p class="mb-2"><span>Area : </span>${mealresponse.strArea}</p>
   <p class="mb-2"><span>Category : </span>${mealresponse.strCategory}</p>
   <h3 class="my-2 ">Recipes :</h3>
   <div id="recipes" class="d-flex flex-wrap">
   
   </div>
   <h3 class="my-2 ">Tags :</h3>
   <div id="color-tags" class="d-flex flex-wrap">
   
   </div>
   <div class="buttons ms-2">
       <a href="${mealresponse.strSource}" class="btn btn bg-success border-0 text-white" target="_blank" >Source</a>
       <a href="${mealresponse.strYoutube}" class="btn btn bg-danger border-0 text-white" target="_blank">Youtube</a>
   </div>
   
</div>`


$("#meals").html(cartona);
var recipes=""
for(let i=0; i<20; i++)
{
 if (mealresponse[`strIngredient${i}`]) {
  recipes += `<p class="my-3 recipes-color rounded">
${mealresponse[`strIngredient${i}`]}</p>`;
}

}
$("#recipes").html(recipes);
var tags ;
if (mealresponse.strTags != null) {
  tags=mealresponse.strTags.split(",");
}
 console.log(tags)
 var Tags=""
 for(let i=0; i<tags.length;i++)
 {
    Tags+=`<p class="tags-color d-inline-block rounded ">${tags[i]}</p>`
 }

 $("#color-tags").html(Tags);
 })
 
}
function getCategories()
{
 
$("#Categories").click(async function()
{
 $(".loading").fadeIn(500);
 var preRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
 var categoriesResponse = await preRespose.json();
 var categoriesMeals =categoriesResponse.categories
console.log(categoriesMeals)
var showCategory = ""
$(".loading").fadeOut(500);
 for(let i=0; i<categoriesMeals.length;i++)
 {
  showCategory += `<div class="col-lg-3 my-2 shadow">
  <div class="item position-relative text-center p-2 ">
   <img src="${categoriesMeals[i].strCategoryThumb}" class="w-100 rounded-2" alt="${categoriesMeals[i].strCategory}">
   <div class="layer rounded-2">
    <h2 class="ps-2 text">${categoriesMeals[i].strCategory}</h2>
    <p class="text">${categoriesMeals[i].strCategoryDescription}</p>
 </div>
</div>
</div>
</div>` 
 }
 
 $("#meals").html(showCategory);
 getgetCategoriesMeals()
 closeNav()
})

}
getCategories()
function getgetCategoriesMeals()
{
 
 $(".item").click(async function()
 {
  $(".loading").fadeIn(500);
  var category = $(this).find("img").attr("alt");
  var preRespose = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  var categoriesResponse = await preRespose.json();
  var categoriesMeals =categoriesResponse.meals
 console.log(categoriesMeals)
 var showMeal=""
 $(".loading").fadeOut(500);
 for(let i=0; i<categoriesMeals.length;i++)
 {
    showMeal+=`<div class="col-lg-3 my-2 shadow">
    <div class="item position-relative text-center  ">
     <img src="${categoriesMeals[i].strMealThumb}" class="w-100 rounded-2" alt="${categoriesMeals[i].idMeal}">
     <div class="layer rounded-2 d-flex align-items-center justify-content-center ">
      <h2 class="ps-2 text">${categoriesMeals[i].strMeal}</h2>
   </div>
  </div>
  </div>
  </div>` 
 }
 
 $("#meals").html(showMeal);
 getThisMeal()
 })

}

function getAreas()
{
 
 $("#Area").click(async function()
 {
  $(".loading").fadeIn(500);
     var prerespose = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?a=list")
     console.log(prerespose)
     var areaResponse = await prerespose.json()
     var areaSections = areaResponse.meals
     console.log(areaSections)
     var showArea ="";
     $(".loading").fadeOut(500);
      for(let i=0; i<areaSections.length; i++)
      {
       showArea += `<div class="col-lg-3 my-2 shadow">
        <div class="item text-center p-2 ">
      <i class="fa-solid fa-city fa-3x w-100 text-danger"></i> 
      <h2 class="area" Areadata="${areaSections[i].strArea}" >${areaSections[i].strArea}</h2>
 </div>
 </div>` 
      }
      
      $("#meals").html(showArea)
      getAreasMeals()
      closeNav()
      
 })
 
}
getAreas()

function getAreasMeals()
{
 

$(".item").click(async function()
{
 $(".loading").fadeIn(500);
   var area = $(this).find("h2").attr("Areadata")
   var preResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}
   `) 
   var areaResponse = await preResponse.json()
   var areaMeals = areaResponse.meals
   var showAreaMeals=""
   $(".loading").fadeOut(500);
   for(let i=0; i<areaMeals.length; i++)
   {
  
    showAreaMeals+= `<div class="col-lg-3 my-2 shadow">
    <div class="item position-relative text-center  ">
     <img src="${areaMeals[i].strMealThumb}" class="w-100 rounded-2" alt="${areaMeals[i].idMeal}">
     <div class="layer rounded-2 d-flex justify-content-center align-items-center">
      <h2 class="ps-2 text">${areaMeals[i].strMeal}</h2>
   </div>
  </div>
  </div>
  </div>` 
   }
 
   $("#meals").html(showAreaMeals);
   getThisMeal()
})
}

function getIngredients()
{
 
 $("#Ingredients").click(async function()
  {
   $(".loading").fadeIn(500);
   var preResponse = await fetch("https://www.themealdb.com/api/json/v1/1/list.php?i=list")
   var ingredientsResponse = await preResponse.json()
   var ingredients = ingredientsResponse.meals 
   var showIngredients=""
   $(".loading").fadeOut(500);
    for(let i=0; i<25;i++)
    {
     showIngredients+=`<div class="col-lg-3 my-2 shadow">
     <div class="item text-center p-2 ">
   <i class="fa-solid fa-bowl-food fa-3x text-success"></i> 
   <h2 class="area" ingredientsdata="${ingredients[i].strIngredient}" >${ingredients[i].strIngredient}</h2>
 <p>${ingredients[i].strDescription.split(" ").splice(0,20).join(" ")}</p>
 </div>
 </div>` 

    }
    
   $("#meals").html(showIngredients)
   getIngredientsMeals()
   closeNav()
  })
 
}
getIngredients()

function getIngredientsMeals()
{
 
 $(".item").click(async function()
 {
  $(".loading").fadeIn(500);
  var meal = $(this).find("h2").attr("ingredientsdata")
  var preResponse= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken`)
  var ingredientsMealsResponse= await preResponse.json()
  var ingredientsMeals=ingredientsMealsResponse.meals
  var showIngredientsMeals=""
  $(".loading").fadeOut(500);
  for(let i=0; i<ingredientsMeals.length;i++)
  {
   showIngredientsMeals+=`<div class="col-lg-3 my-2 shadow">
   <div class="item position-relative text-center  ">
    <img src="${ingredientsMeals[i].strMealThumb}" class="w-100 rounded-2" alt="${ingredientsMeals[i].idMeal}">
    <div class="layer rounded-2 d-flex justify-content-center align-items-center">
     <h2 class="ps-2 text">${ingredientsMeals[i].strMeal}</h2>
  </div>
 </div>
 </div>
 </div>` 
  }

  $("#meals").html(showIngredientsMeals)
  getThisMeal()

 })
}

function openSerch()
{
 $("#search").click(function()
 {
  $("#search-row").css("visibility", "visible");
  $("#meals").css("display", "none");
  $("#contact").css("display", "none");
  closeNav();
 })
}
openSerch()
function getSearchMeals()
{
 
 $("#searchName").keyup(async function()
 {
  $(".loading").fadeIn(500);
  console.log(searchWithName.value)
  var preResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchWithName.value}`)
  var searchResponseMeals =  await preResponse.json();
  var searchMeals = searchResponseMeals.meals
  var showMeals=""
  $(".loading").fadeOut(500);
  for(let i=0; i<searchMeals.length;i++)
  {
   showMeals+=`<div class="col-lg-3 my-2 shadow">
   <div class="item position-relative text-center  ">
    <img src="${searchMeals[i].strMealThumb}" class="w-100 rounded-2" alt="${searchMeals[i].idMeal}">
    <div class="layer rounded-2 d-flex justify-content-center align-items-center">
     <h2 class="ps-2 text">${searchMeals[i].strMeal}</h2>
  </div>
 </div>
 </div>
 </div>`
  }
  // console.log(showMeals)
  $(".loading").fadeIn(200);
  $("#meals").css("display", "flex");
  $(".loading").fadeOut(300);
  $("#meals").html(showMeals)
  getThisMeal()
 })
}
getSearchMeals()

function getFirstLetterSearchMeals()
{
 $("#searchLetter").keyup(async function()
 {
  $(".loading").fadeIn(500);
  console.log(searchWithLetter.value)
  var preResponse = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${ searchWithLetter.value}`)
  var searchResponseMeals =  await preResponse.json();
  var searchMeals = searchResponseMeals.meals
  var showMeals=""
  $(".loading").fadeOut(500);
  for(let i=0; i<searchMeals.length;i++)
  {
   showMeals+=`<div class="col-lg-3 my-2 shadow">
   <div class="item position-relative text-center  ">
    <img src="${searchMeals[i].strMealThumb}" class="w-100 rounded-2" alt="${searchMeals[i].idMeal}">
    <div class="layer rounded-2 d-flex justify-content-center align-items-center">
     <h2 class="ps-2 text">${searchMeals[i].strMeal}</h2>
  </div>
 </div>
 </div>
 </div>`
  }
  // console.log(showMeals)
  $(".loading").fadeIn(200);
  $("#meals").css("display", "flex");
  $(".loading").fadeOut(200);
  $("#meals").html(showMeals)
  getThisMeal()
 })
}
getFirstLetterSearchMeals()

function openContacts()
{
 
 $("#ContactUs").click(function()
 {

  $("#contact").css("display", "flex");
  $("#meals").css("display", "none");
  $("#search-row").css("display", "none");
  $("#name").css("display", "none");
  $("#email").css("display", "none");
  $("#phone").css("display", "none");
  $("#age").css("display", "none");
  $("#password").css("display", "none");
  $("#rePassword").css("display", "none");
  closeNav();
 })
}
openContacts()



function checkUserNameValidation(){
 $("#userNameInput").keyup(function()
 {
  if (namaRegex.test(userNameInput.value) == true) {
       $("#name").css("display", "none");
       $("#userNameInput").addClass("is-valid");
       $("#userNameInput").removeClass("is-invalid");
     } else {
       $("#name").css("display", "block");
       $("#userNameInput").addClass("is-invalid");
       $("#userNameInput").removeClass("is-valid");
     }
     console.log("hi")
 })
}
checkUserNameValidation()

function checkEmailValidation(){
 $("#emailInput").keyup(function()
 {
  if (emailRegex.test(emailInput.value) == true) {
       $("#email").css("display", "none");
       $("#emailInput").addClass("is-valid");
       $("#emailInput").removeClass("is-invalid");
     } else {
       $("#email").css("display", "block");
       $("#emailInput").addClass("is-invalid");
       $("#emailInput").removeClass("is-valid");
     }
     console.log("hi")
 })
}
checkEmailValidation()

function checkPhoneValidation(){
 $("#phoneInput").keyup(function()
 {
  if (phoneRegex.test(phoneInput.value) == true) {
       $("#phone").css("display", "none");
       $("#phoneInput").addClass("is-valid");
       $("#phoneInput").removeClass("is-invalid");
     } else {
       $("#phone").css("display", "block");
       $("#phoneInput").addClass("is-invalid");
       $("#phoneInput").removeClass("is-valid");
     }
     console.log("hi")
 })
}
checkPhoneValidation()

function checkAgeValidation(){
 $("#ageInput").keyup(function()
 {
  if (ageRegex.test(ageInput.value) == true) {
       $("#age").css("display", "none");
       $("#ageInput").addClass("is-valid");
       $("#ageInput").removeClass("is-invalid");
     } else {
       $("#age").css("display", "block");
       $("#ageInput").addClass("is-invalid");
       $("#ageInput").removeClass("is-valid");
     }
     console.log("hi")
 })
}
checkAgeValidation()


function checkPasswordValidation(){
 $("#passwordInput").keyup(function()
 {
  if (passwordRegex.test(passwordInput.value) == true) {
       $("#password").css("display", "none");
       $("#passwordInput").addClass("is-valid");
       $("#passwordInput").removeClass("is-invalid");
     } else {
       $("#password").css("display", "block");
       $("#passwordInput").addClass("is-invalid");
       $("#passwordInput").removeClass("is-valid");
     }
     console.log("hi")
 })
}
checkPasswordValidation()


function checkRepasswordValidation(){
 $("#rePasswordInput").keyup(function()
 {
  if (passwordInput.value == rePasswordInput.value) {
       $("#rePassword").css("display", "none");
       $("#rePasswordInput").addClass("is-valid");
       $("#rePasswordInput").removeClass("is-invalid");
     } else {
       $("#rePassword").css("display", "block");
       $("#rePasswordInput").addClass("is-invalid");
       $("#rePasswordInput").removeClass("is-valid");
     }
     console.log("hi")
 })
}
checkRepasswordValidation()


function disableBtn()
{
 if(namaRegex.test(userNameInput.value) == true &&
 emailRegex.test(emailInput.value) == true &&
 phoneRegex.test(phoneInput.value) == true &&
 ageRegex.test(ageInput.value) == true &&
 passwordRegex.test(passwordInput.value) == true &&
 passwordInput.value == rePasswordInput.value)
  {
    document.getElementById("submitBtn").disabled = false;
  } 
  else {
    document.getElementById("submitBtn").disabled = true;
  }
  setTimeout(disableBtn, 100);
}
disableBtn()

function clearInputs()
{
  $(".btn").click(function()
  {
    userNameInput.value=""
    emailInput.value=""
    phoneInput.value=""
    ageInput.value=""
    passwordInput.value=""
    rePasswordInput.value=""
    $("#userNameInput").removeClass("is-valid");
    $("#emailInput").removeClass("is-valid");
    $("#phoneInput").removeClass("is-valid");
    $("#ageInput").removeClass("is-valid");
    $("#passwordInput").removeClass("is-valid");
    $("#rePasswordInput").removeClass("is-valid");
  })
}
clearInputs()

