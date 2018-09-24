document.querySelector(".get-jokes").addEventListener("click",getNumberOfJk);
let jkNum = document.getElementById("number");
const list = document.getElementById("jokesTable")
const newName = document.querySelector(".newName")
let url;
const newLastName = document.querySelector(".newLastName")
document.querySelector(".checkbox").addEventListener("change",changeNames)
document.getElementById("buttonErrase").addEventListener("click",reload);

document.querySelector(".new-names").style.display = "none"

function displayError(mensaje){
    clearJokes()
    const card = document.querySelector(".input")
    const tab = document.querySelector(".amber")
    const errorDis = document.createElement("div");
    errorDis.className = "alert red lighten-3"
    errorDis.id = "customAlert"
    // Create text node and append it to div
    const errorTextNode = document.createTextNode(mensaje)
    errorDis.appendChild(errorTextNode)
    
    // Insert error MSG above 
    card.insertBefore(errorDis,tab)
    window.setTimeout(deleteMsg,2000) //Ejecuta funcion despues de tms
    console.log(errorDis);
}
function deleteMsg(){
    document.getElementById("customAlert").remove(); //Remueve la alerta de la pantalla
}

function manageChuck(errorMsg){
    document.querySelector(".jokes").style.display = "none"
    // Get Node where the error windows will be displayed
    const card = document.querySelector(".display")
    const tab = document.querySelector(".jokes")

    // Create division to show error
    const errorDiv = document.createElement("div");
    errorDiv.id = "customAlert"
    errorDiv.setAttribute("class","center-align")
    // Create text node and append it to div
    const errorTextNode = document.createElement("img");
        errorTextNode.setAttribute("src","chuck.gif")
        errorTextNode.setAttribute("style","width:300px;height:auto")
        errorTextNode.setAttribute("class","chuckImg")
    //Create text and append it to div
    const msgChuck = document.createElement("h6");
        msgChuck.innerHTML = `I'm finding the best jokes for you`;
        msgChuck.setAttribute = ("id","chuckMsg")
        msgChuck.setAttribute = ("class","center-align")
    errorDiv.appendChild(msgChuck)
    errorDiv.appendChild(errorTextNode)
    
    // Insert error MSG above 
    card.insertBefore(errorDiv,tab)
    window.setTimeout(clearMsg,4000) //Ejecuta funcion despues de tms
    console.log(errorDiv);
}

function clearMsg(){
    //remove img and text form div
    document.getElementById("customAlert").remove(); 
    document.querySelector(".jokes").style.display = ""
}

function changeNames(e){
    //Check if box is checked
    if(this.checked){
        //Display new inputs
        document.querySelector(".new-names").style.display = ""
    }else{
        console.log(" No checked!!")
        document.querySelector(".new-names").style.display = "none"
        newName.value = "";
        newLastName.value="";
    }
}

function clearJokes(){
    //clear jokes
    let lis = document.querySelectorAll("li");
    lis.forEach(function(element) {
        element.remove();
  });
}
function reload(){
    location.reload();
}
function showChuck(){
    document.getElementById("chuckMsg").style.display = ""
    document.querySelector(".chuckImg").style.display = ""
}
 function getNumberOfJk(e){
     if(jkNum.value===""){
         displayError("How many jokes do you want?")
     }else{
    //setTimeout(showChuck(),2000)
    manageChuck();
    //Clear previews jokes
    clearJokes();
    xhr = new XMLHttpRequest();
    console.log(newName.value,newLastName.value)
        if(newName.value!==""){
            if(newLastName.value === ""){
                url = `http://api.icndb.com/jokes/random/${jkNum.value}?firstName=${newName.value}&amp;?lastName=Norris`;
            }else{
                url = `http://api.icndb.com/jokes/random/${jkNum.value}?firstName=${newName.value}&amp;?lastName=${newLastName}`;
            }
        }else if(newName.value==="")
        {
            if(newLastName.value === ""){
                url = `http://api.icndb.com/jokes/random/${jkNum.value}?firstName=Chuck&amp;?lastName=Norris`;
            }else{
                url = `http://api.icndb.com/jokes/random/${jkNum.value}?firstName=Chuck&amp;?lastName=${newLastName}`;
            }
        }else{
            url = `http://api.icndb.com/jokes/random/${jkNum.value}`;
        }
    xhr.open("GET",`${url}`,true);

    xhr.onload = function(){
         if(this.status === 200){
            let obj = this.responseText;
            let jokeElem = JSON.parse(this.responseText);
            let jokes = jokeElem.value;
            console.log(obj);      
            for(let i=0;i<jokes.length;i++){
                let li = document.createElement("li");
                li.innerHTML=`Joke #${i+1}: ${jokes[i].joke}`;
                list.appendChild(li);
            } 
        };
        
    }
    }
    
    xhr.send();
e.preventDefault();
} 