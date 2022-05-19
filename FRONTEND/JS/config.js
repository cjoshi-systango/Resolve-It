// let fetchUrl;


// (async()=>
// {
//     await fetch("../PortJson").then(async (result) => {
//         let response = await result.json()
//         let data = response.table;
//         console.log(data[0].port);
//         let port = data[0].port
        
//     })
//     .catch((e) => {
//         console.error(e);
//     })
//     console.log("inside config");
    
//     console.log(fetchUrl);
//     return fetchUrl;
// })()
let fetchUrl = `https://resolve-it-node-js-sql.herokuapp.com/`;
// let fetchUrl = "http://localhost:4001/";
export{fetchUrl}
// let fetchUrl = fetchPort();


    

