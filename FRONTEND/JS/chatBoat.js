let optionDiv = document.querySelector("#option")

let aurthorizationToken = localStorage.getItem("Aurthorization")
let userResponse = document.querySelector("#userResponse");
let questionDiv = document.querySelector("#question");
let chatShowArea = document.querySelector("#chatShowArea");

checkUserIssue();
function checkUserIssue()
{
    let userData={
        id : aurthorizationToken,
    }
    fetch("http://localhost:4000/chatBoat/userIssue", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Aurthorization": aurthorizationToken,

            }
        }).then(async (result) => {
            let response = await result.json();
            let data = response.data;
            if(data)
            {
                console.log("ll");
                firstQuestionForIssue();
            }
            else{
                firstQuestion();
            }

            
        })
            .catch((e) => {
                console.error(e);
            })
}


function firstQuestionForIssue()
{
    fetch("http://localhost:4000/chatBoat/getStartedForIssue", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
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
            let optionDivv = document.createElement("div");
            let span = document.createElement("p");
            span.setAttribute("class", "spans");
            span.setAttribute("id", element.id);
            span.innerHTML = element.option;
            // span.onclick("click",nextQuestion(3))
            optionDivv.appendChild(span);
            span.onclick = () => {

                let reponseDiv = document.createElement("div");
                reponseDiv.setAttribute("class", "message rightMessage align-self-end p-2 my-2");
                let responseByUser = document.createElement("p");
                responseByUser.innerHTML = span.innerHTML;
                reponseDiv.appendChild(responseByUser);
                chatShowArea.appendChild(reponseDiv);
                systemResponse.remove();
                nextQuestion(element.id,10)
            };
            systemResponse.appendChild(optionDivv)

            chatShowArea.appendChild(systemResponse);
            console.log(element);
        });
    })
        .catch((e) => {
            console.error(e);
        })
}




function firstQuestion() {

    fetch("http://localhost:4000/chatBoat/getStarted", {
        method: "GET",
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
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
            let optionDivv = document.createElement("div");
            let span = document.createElement("p");
            span.setAttribute("class", "spans");
            span.setAttribute("id", element.id);
            span.innerHTML = element.option;
            // span.onclick("click",nextQuestion(3))
            optionDivv.appendChild(span);
            span.onclick = () => {

                let reponseDiv = document.createElement("div");
                reponseDiv.setAttribute("class", "message rightMessage align-self-end p-2 my-2");
                let responseByUser = document.createElement("p");
                responseByUser.innerHTML = span.innerHTML;
                reponseDiv.appendChild(responseByUser);
                chatShowArea.appendChild(reponseDiv);
                systemResponse.remove();
                nextQuestion(element.id,1);
            };
            systemResponse.appendChild(optionDivv)

            chatShowArea.appendChild(systemResponse);
            console.log(element);
        });
    })
        .catch((e) => {
            console.error(e);
        })
}


let latestdate = new Date();
let dateTime = latestdate.getFullYear() + "-0" + (latestdate.getMonth() + 1) + "-" + latestdate.getDate() + " " + latestdate.getHours() + ":" + latestdate.getMinutes() + ":" + latestdate.getSeconds() + "." + latestdate.getMilliseconds();


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
        user: aurthorizationToken,
        dateTime:dateTime,
    }

    fetch("http://localhost:4000/chatBoat/nextQuestion", {
        method: "POST",
        body: JSON.stringify(nextQuestionObject),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Aurthorization": aurthorizationToken,
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
                let optionDivv = document.createElement("div")
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
                    systemResponse.remove();
                    // while (chatShowArea.firstChild) {
                    //     chatShowArea.removeChild(chatShowArea.firstChild);
                    // }

                    nextQuestion(element.id,question_id)

                };

                optionDivv.appendChild(span);
                systemResponse.appendChild(optionDivv)
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

