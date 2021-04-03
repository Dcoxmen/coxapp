// document.getElementById('getDataid').addEventListener('click',getDataid);
// document.getElementById('getDV').addEventListener('click',getDV);
// document.getElementById('getAPI').addEventListener('onload',getAPI);
// document.getElementById('getDataset').addEventListener('onload',getDataset);
const datakey = 'http://api.coxauto-interview.com/api/datasetId';

let datasetid = [];
let vehicleIds = [];
let dealerId = [];

function getDataid(){
    fetch(datakey)
    .then((res) => res.text())
    .then((data) => {
       let mydata = data
       mydata = mydata.replace(/[{},"]/g, '');
       mydata = mydata.split(':').pop();
       
        document.getElementById('myconnect').innerHTML = mydata;
        localStorage.getItem(mydata)
        localStorage.setItem("datasetid", JSON.stringify(mydata))
        getVehicleIds()
        getDealerID()

    
    })
    .catch((err) => console.log(err))
   
}

let apiData = localStorage.getItem('datasetid');

function getVehicleIds (){
  fetch(`http://api.coxauto-interview.com/api/${apiData.replace(/['"]+/g, '')}/vehicles`)
  .then((res) => res.json())
  .then((data) => {

    let vehdata = data
    let output = '<h2>Dealer n Vehicles</h2>';
      data.vehicleIds.forEach(function(vehicleId){
      
        output+= `
          <div>
            <p><a href="http://api.coxauto-interview.com/api/${apiData.replace(/['"]+/g, '')}/vehicles/${vehicleId}">${vehicleId}</a></p>
            <p></p>
          </div>
        `
    })
    
      document.getElementById('vehicles').innerHTML = output;
      localStorage.getItem(vehdata)
        localStorage.setItem("vehicleIds", JSON.stringify(vehdata))

      
  })

}

let vehicleData = localStorage.getItem('vehicleIds');
let newVehData =JSON.parse(vehicleData)


console.log(newVehData.vehicleIds)

async function fetchVehiclesJSON() {
const response = await fetch(`http://api.coxauto-interview.com/api/${apiData.replace(/['"]+/g, '')}/vehicles/${newVehData.vehicleIds}`);
  const vehicles = await response.json();
  return vehicles;
}

fetchVehiclesJSON().then(vehicles => {


    document.getElementById('output').innerHTML = output;
  console.log()
});



// function getDealerID(){

//     fetch(`http://api.coxauto-interview.com/api/${apiData.replace(/['"]+/g, '')}/vehicles/${vehicleId}/:id`)
//     .then((res) => res.json())
//     .then((data) => {
//         let output = '<h2>Dealer n Vehicles</h2>';
//         data.vehicles.forEach(function(newVehData){
//             output+= `
//               <div>
           
             
//                 <p>Dealer ID: <a href="http://api.coxauto-interview.com//api/${apiData.replace(/['"]+/g, '')}/vehicles/${newVehData}">${dealerId}</p></a>
                
              
//               </div>
//             `

//         })
//         document.getElementById('output').innerHTML = output;
        
//     })
// }



getDataid()