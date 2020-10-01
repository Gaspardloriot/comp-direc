

const button=document.querySelector('#button');
let employeeData=[];



button.addEventListener('click',
async ()=>{
  employeeData=[]
  let response= await fetch(`http://localhost:8081/geteverything`)
  let data= await response.json();
  for (let i=0; i<=(data.length)-1; i++){
    employeeData.push([data[i]])
    let departmentID=data[i].departmentID     
    await departmentGet(departmentID, i)
    await locationGet(locationID, i)
  }
  await console.log(employeeData)
})

const locationGet = async (locId, i)=>{
 let response= await fetch(`http://localhost:8081/getlocation/${locId}`)
  let data= await response.json()
  let location=data[0].name   
  employeeData[i].push([location])
 }


const departmentGet= async (depId, i)=>{
  let response=await fetch(`/getposts/${depId}`)
  let data= await response.json();
  locationID=data[0].locationID
  let department=data[0].name
  employeeData[i].push([department])
}



const departmentFind= [
  
    {'department' :'Human Resources',
     'locationId' : 1},
   
    {'department' :'Sales',
     'locationId' : 2},
   
    {'department' :'Marketing',
    'locationId' : 2},
   
    {'department' :'Legal',
     'locationId' : 4},
   
    {'department' :'Services',
     'locationId' : 5},
   
    {'department' :'R&D',
     'locationId' : 3},
   
    {'department' :'Product Management',
     'locationId' : 3},
   
    {'department' :'Training',
     'locationId' : 4},
   
    {'department' :'Support',
     'locationId' : 4},
   
    {'department' :'Engineering',
     'locationId' : 5},
   
    {'department' :'Accounting',
     'locationId' : 5},
   
    {'department' :'Business Development',
     'locationId' : 3}
]

const locationFind=[
  "London", 'New York', "Paris", "Munich", "Rome"
]
const getDepartment=document.querySelector('#getDepartment')

getDepartment.addEventListener('click',
async ()=>{
 let newData=[]
 console.log('hello')
  let response= await fetch(`https://company-directory-backend.herokuapp.com/geteverything`)
  let data= await response.json();
  for (let i=0; i<=data.length-1; i++){
    newData.push([data[i]]);
    let departmentID=data[i].departmentID;
    let locationId=departmentFind[departmentID-1].locationId;
    let department=departmentFind[departmentID-1].department;
    let location=locationFind[locationId-1];
    newData[i].push(department, location);
  }
  console.log(newData)
}) 

