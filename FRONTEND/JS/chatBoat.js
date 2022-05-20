let chatBot = `
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-alpha1/dist/css/bootstrap.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
<link rel="stylesheet" href="../CSS/chatBoat.css">

<input type="checkbox" id="check">
<label class="chat-btn" for="check">
<i class="fa fa-commenting-o comment"></i>
<i class="fa fa-close close"></i> </label>
<div class="wrapper">
<div class="header">
    <h6>Resolve-It</h6>
</div>
<div class="text-center p-2">
    <!-- <span>Please fill out the form to start chat!</span> -->
</div>
<div class="chat-form">
    <div class="col-12 d-flex flex-column p-2" id="chatShowArea">
        <div id="systemResponse">
        </div>
    </div>
</div>



`


let chatboatt = document.querySelector("#chatboat");
chatboatt.innerHTML = chatBot;

//---------------------------------------------------------------------------------------------------------------------------------------------------------------//



//fetch url to run on port
import {fetchUrl} from "../JS/config.js";



//getting the essential element from html
let aurthorizationTokenn = localStorage.getItem("Aurthorization");
let chatShowArea = document.querySelector("#chatShowArea");
let optionDiv


checkUserIssue();

//creating the function to user issues he raised
function checkUserIssue()
{
    //checking for user id from which user is logged In
    let userData={
        id : aurthorizationTokenn,
    }

    //getting response for the url
    fetch(fetchUrl+"chatBoat/userIssue", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Aurthorization": aurthorizationTokenn,

            }
        }).then(async (result) => {
            let response = await result.json();
            let data = response.data;
            console.log(data);
            if(data != null)
            {
                console.log("ll");
                //if user have any issue ticket raised
                firstQuestionForIssue();
            }
            else if(data == null){
                
                //if user doesn't have any issue ticket raised
                firstQuestion();
            }

            
        })
            .catch((e) => {
                console.error(e);
            })
}

//function for the user who has rasied any issue in past
function firstQuestionForIssue()
{
    //this will get the first question
    fetch(fetchUrl+"chatBoat/getStartedForIssue", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationTokenn,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        let systemResponse = document.createElement("div");

        data[0].forEach(element => {
            let div = document.createElement("div");
            div.setAttribute("class", "message leftMessage align-self-start p-2 my-2");
            let question = document.createElement("p");
            question.innerHTML = element.question;
            div.appendChild(question);
            systemResponse.appendChild(div);
            chatShowArea.appendChild(systemResponse);
            console.log(element);
        });

        // for(let item = 0; item< data[1].length ; item++)
        // {
        //     let span = document.createElement("span");
        //     span.setAttribute("id",)
        // }
        data[1].forEach(element => {
            optionDiv = document.createElement("div");
            let span = document.createElement("p");
            span.setAttribute("class", "spans");
            span.setAttribute("id", element.id);
            span.innerHTML = element.option;
            // span.onclick("click",nextQuestion(3))
            optionDiv.appendChild(span);
            span.onclick = () => {

                let reponseDiv = document.createElement("div");
                reponseDiv.setAttribute("class", "message rightMessage align-self-end p-2 my-2");
                let responseByUser = document.createElement("p");
                responseByUser.innerHTML = span.innerHTML;
                reponseDiv.appendChild(responseByUser);
                chatShowArea.appendChild(reponseDiv);
                optionDiv.remove();
                nextQuestion(element.id,10)
            };
            systemResponse.appendChild(optionDiv)

            chatShowArea.appendChild(systemResponse);
            console.log(element);
        });
    })
        .catch((e) => {
            console.error(e);
        })
}


//function for the user who has not rasied any issue in past

function firstQuestion() {

    //this will get the first question
    fetch(fetchUrl+"chatBoat/getStarted", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationTokenn,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        let systemResponse = document.createElement("div");

        data[0].forEach(element => {
            let div = document.createElement("div");
            div.setAttribute("class", "message leftMessage align-self-start p-2 my-2");
            let question = document.createElement("p");
            question.innerHTML = element.question;
            div.appendChild(question);
            systemResponse.appendChild(div);
            chatShowArea.appendChild(systemResponse);
            console.log(element);
        });

        // for(let item = 0; item< data[1].length ; item++)
        // {
        //     let span = document.createElement("span");
        //     span.setAttribute("id",)
        // }
        data[1].forEach(element => {
            optionDiv = document.createElement("div");
            let span = document.createElement("p");
            span.setAttribute("class", "spans");
            span.setAttribute("id", element.id);
            span.innerHTML = element.option;
            // span.onclick("click",nextQuestion(3))
            optionDiv.appendChild(span);
            span.onclick = () => {

                let reponseDiv = document.createElement("div");
                reponseDiv.setAttribute("class", "message rightMessage align-self-end p-2 my-2");
                let responseByUser = document.createElement("p");
                responseByUser.innerHTML = span.innerHTML;
                reponseDiv.appendChild(responseByUser);
                chatShowArea.appendChild(reponseDiv);
                optionDiv.remove();
                nextQuestion(element.id,1);
            };
            systemResponse.appendChild(optionDiv)

            chatShowArea.appendChild(systemResponse);
            console.log(element);
        });
    })
        .catch((e) => {
            console.error(e);
        })
}


// getting the current date
let latestdate = new Date();
let dateTime = latestdate.getFullYear() + "-0" + (latestdate.getMonth() + 1) + "-" + latestdate.getDate() + " " + latestdate.getHours() + ":" + latestdate.getMinutes() + ":" + latestdate.getSeconds() + "." + latestdate.getMilliseconds();

// function to get question and option after one another
function nextQuestion(idd,qId) {
    // let spans = document.querySelectorAll(".spans");
    // console.log(spans[1].id);
    // chatShowArea.innerHTML = "";
    let systemResponse = document.createElement("div");


    console.log(idd);
    console.log(qId);
    let nextQuestionObject = {
        
        optionId: idd,
        qId : qId,
        user: aurthorizationTokenn,
        dateTime:dateTime,
    }
    //this will get next question and option and will also store history
    fetch(fetchUrl+"chatBoat/nextQuestion", {
        method: "POST",
        body: JSON.stringify(nextQuestionObject),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationTokenn,
        }
    }).then(async (result) => {
        let response = await result.json();
        let data = response.data;
        let question_id
        if (data.length == 2) {

            data[0].forEach(element => {
                let div = document.createElement("div");
                div.setAttribute("class", "message leftMessage align-self-start p-2 my-2");
                let question = document.createElement("p");
                question.innerHTML = element.nextQuestion;
                question_id = element.id;
                div.appendChild(question);
                systemResponse.appendChild(div);
                chatShowArea.appendChild(systemResponse);
                console.log(element);
            });

            data[1].forEach(element => {
                optionDiv = document.createElement("div")
                let span = document.createElement("p");
                span.setAttribute("class", "spans");
                span.setAttribute("id", element.id);
                span.innerHTML = element.options;
                
                // span.onclick("click",nextQuestion(3))
                span.onclick = () => {

                    let reponseDiv = document.createElement("div");
                    reponseDiv.setAttribute("class", "message rightMessage align-self-end p-2 my-2");
                    let responseByUser = document.createElement("p");
                    responseByUser.innerHTML = span.innerHTML;
                    reponseDiv.appendChild(responseByUser);
                    chatShowArea.appendChild(reponseDiv);
                    optionDiv.remove();
                    // while (chatShowArea.firstChild) {
                    //     chatShowArea.removeChild(chatShowArea.firstChild);
                    // }

                    nextQuestion(element.id,question_id)

                };

                optionDiv.appendChild(span);
                systemResponse.appendChild(optionDiv)
                chatShowArea.appendChild(systemResponse);
                console.log(element);
            });
        }
        else {
            console.log(data[0]);
            data[0].forEach(element => {
                let div = document.createElement("div");
                div.setAttribute("class", "message leftMessage align-self-start p-2 my-2");
                let answer = document.createElement("p");
                answer.innerHTML = element.nextQuestion;
                div.appendChild(answer);
                chatShowArea.appendChild(div);
                console.log(element.nextQuestion);
            })
        }

    })
        .catch((e) => {
            console.error(e);
        })

}

