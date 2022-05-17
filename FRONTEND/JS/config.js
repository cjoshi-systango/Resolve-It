let fetchUrl;


(async()=>
{
    await fetch("../PortJson").then(async (result) => {
        let response = await result.json()
        let data = response.table;
        console.log(data[0].port);
        let port = data[0].port
        fetchUrl = `http://resolve-it-node-js-sql.herokuapp.com:${port}/`;
    })
    .catch((e) => {
        console.error(e);
    })
    console.log("inside config");
    
    console.log(fetchUrl);
    return fetchUrl;
})()

export{fetchUrl}
// let fetchUrl = fetchPort();


    

