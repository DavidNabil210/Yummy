// let RowData=document.getElementById("RowData");
// var NameRegex=/^[a-z0-9_-]{3,15}$/;
// var EmailRegex=/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
// var PassRegex=/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])(.{8,16})$/;
// var PhoneRegex=/^0(2|3)\d{7,8}$/;
// var ageRegex=/^01[0-2,5]{1}[0-9]{8}$/;
// $(".NavHeader i.open-close-icon").click(()=>{
//     let NavWidth=$(".SideNavMenu .NavTab").outerWidth()
//     if($(".SideNavMenu").css("left")=="0px")
//     {
//         $(".SideNavMenu").animate({left:-NavWidth},500)
//     }else{
//         $(".SideNavMenu").animate({left:0},500)
//     }
// })
$(".NavHeader i.open-close-icon").click(() => {
    // Get current left position of SideNavMenu (more reliable than CSS value)
    let NavWidth=$(".SideNavMenu .NavTab").outerWidth()
    const currentLeft = $(".SideNavMenu").position().left;
  
    // Calculate target left position based on current position
    const targetLeft = (currentLeft === 0) ? -NavWidth : 0;
  
    // Animate SideNavMenu to target position
    $(".SideNavMenu").animate({ left: targetLeft }, 500);
  });
async function SearchMealByName(meal){
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
  
    response= await response.json()
    
    console.log();
    DisplayMeals(response.meals);
  }

  function DisplayMeals(arr){
    let cartona='';
    for(let i=0;i<arr.length;i++)
    {   cartona+=`
         <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2" onclick="GetAllMealDetails(${arr[i].idMeal})">
                    <img  src="${arr[i].strMealThumb}" alt="meal" class="w-100">
                    <div class="meal-layer position-absolute d-flex align-items-center justify-content-center">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `

    }
    RowData.innerHTML=cartona;
  }
  SearchMealByName("");
  //


  async function GetAllCategories(){
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
  
    response= await response.json()
    
    // console.log(response.categories);
   
    DisplayCategories(response.categories);
  }

  function DisplayCategories(arr){
    let cartona='';
    for(let i=0;i<arr.length;i++)
    {   cartona+=`
         <div   class="col-md-3" >
                <div  onclick="GetAllCategoriesMeals(${arr[i].strCategory})"  class="meal position-relative overflow-hidden rounded-2 "   >
                    <img src="${arr[i].strCategoryThumb}" alt="meal" class="w-100"  >
                    <div class="meal-layer position-absolute text-center">
                        <h3>${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(' ').slice(0,10).join(' ')+'...'}</p>
                    </div>
                </div>
            </div>
        `

    }
    RowData.innerHTML=cartona;
  }

  ////Get Areas
  async function GetAllAreas(){
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  
    response= await response.json()
    
    // console.log(response.meals);
   
    DisplayAllAreas(response.meals);
  }
  function DisplayAllAreas(arr){
    let cartona='';
    for(let i=0;i<arr.length;i++)
    {   cartona+=`
         <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2  text-white">
                   
                    <i class="fa-solid fa-house-laptop fa-4x "></i>
                        <h3>${arr[i].strArea}</h3>
                        
                   
                </div>
            </div>
        `

    }
    RowData.innerHTML=cartona;
  }

  //GetAllIng

  async function GetAllIngredients(){
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
  
    response= await response.json()
    
     console.log(response.meals);
   
     DisplayAllIngredients(response.meals);
  }
  function DisplayAllIngredients(arr){
    let cartona='';
    for(let i=0;i<arr.length;i++)
    {   cartona+=`
         <div class="col-md-3">
                <div class="meal position-relative overflow-hidden rounded-2 text-center text-white">
                   
                    <i class="fa-solid fa-drumstick-bite fa-4x "></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>
  ${arr[i].strDescription ? arr[i].strDescription.split(' ').slice(0, 10).join(' ') + '...' : 'Description not available'}
</p>
                   
                </div>
            </div>
        `

    }
    RowData.innerHTML=cartona;
  }

  //GET ALL MEAL DETAILS

  async function GetAllMealDetails(idmeal){
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idmeal}`)
  
    response= await response.json()
    
   
   
     DisplayAllMealDetails(response.meals[0]);
  }
  function DisplayAllMealDetails(meal){
   
   
    let Ingredients = ``

    for (let i = 0; i <= 19; i++) {
        if (meal[`strIngredient${i+1}`]) {
            Ingredients += `<li class="alert alert-info m-2 p-1">${meal[`strMeasure${i+1}`]} ${meal[`strIngredient${i+1}`]}</li>`
        }
    }

    let tags = meal.strTags?.split(",")
    
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }



    let cartona = `
    <div class="col-md-4">
                <img class="w-100 rounded-2" src="${meal.strMealThumb}"
                    alt="${meal.strMeal}">
                    <h2>${meal.strMeal}</h2>
            </div>
            <div class="col-md-8 text-white ">
                <h2>Instructions</h2>
                <p>${meal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${meal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${meal.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="list-unstyled d-flex flex-wrap">
                    ${Ingredients}
                </ul>

                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex  flex-wrap">
                    ${tagsStr}
                </ul>

                <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>`


   
    RowData.innerHTML=cartona;
  }

  // DisplayContactUs

  function DisplayContactUs(){
    cartona=`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
              
            </div>
            <div class="col-md-6">
                <input id="emailInput"  type="email" class="form-control " placeholder="Enter Your Email">
                
            </div>
            <div class="col-md-6">
                <input id="phoneInput"  type="text" class="form-control " placeholder="Enter Your Phone">
               
            </div>
            <div class="col-md-6">
                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
              
            </div>
            <div class="col-md-6">
                <input id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
              
            </div>
            <div class="col-md-6">
                <input id="repasswordInput"  type="password" class="form-control " placeholder="Repassword">
                
            </div>
        </div>
        <button id="submitBtn" onclick="ValidateInputs()" class="btn btn-outline-danger px-2 mt-3">Submit</button>
        <div id="WrongMsg" class="alert alert-danger w-100 mt-2 d-none">
                    Oops! Something's wrong. Try again.
                </div>
                <div id="DoneMsg" class="alert alert-success w-100 mt-2 d-none">
                    Done
                </div>
    </div>
</div>`
RowData.innerHTML=cartona;
  }
 let WrongMsg= document.getElementById("WrongMsg");
function ValidateInputs(){
    if(ValidateName() && 
    ValidateRePassword() &&
    ValidateAge() && 
    ValidatePassword() && 
    ValidatePhone() && ValidatePhone()
    ==true){
        document.getElementById("WrongMsg").classList.replace("d-block", "d-none")
        document.getElementById("DoneMsg").classList.replace("d-none", "d-block")
    }else{
        document.getElementById("WrongMsg").classList.replace("d-none", "d-block")
        document.getElementById("DoneMsg").classList.replace("d-block", "d-none")
    }
// console.log("hi")
}
  function ValidateName(){
return(NameRegex.test(document.getElementById("nameInput").value))
  }
  function ValidatePassword(){
    return(PassRegex.test(document.getElementById("passwordInput").value))

  }
  function ValidateEmail(){
    return(EmailRegex.test(document.getElementById("emailInput").value))

  }
  function ValidatePhone(){
    return(PhoneRegex.test(document.getElementById("phoneInput").value))
  }
  function ValidateRePassword(){
return(document.getElementById("repasswordInput").value==document.getElementById("passwordInput").value)  
}
function ValidateAge(){
    return(ageRegex.test(document.getElementById("ageInput").value))
}

// Get Meals OF CATEGORIES

async function GetAllCategoriesMeals(category){
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
  
    response= await response.json()
    
    // console.log(response.categories);
   
    DisplayCategoriesMeals(response.meals);
  }

  function DisplayCategoriesMeals(arr){
    let cartona='';
    for(let i=0;i<arr.length;i++)
    {   cartona+=`
         <div   class="col-md-3" >
                <div    class="meal position-relative overflow-hidden rounded-2 "   >
                    <img src="${arr[i].strMealThumb}" alt="meal" class="w-100"  >
                    <div class="meal-layer position-absolute text-center">
                        <h3>${arr[i].strMeal}</h3>
                        
                    </div>
                </div>
            </div>
        `

    }
    RowData.innerHTML=cartona;
  }


  
