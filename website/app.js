// make the Date Format as a string
let day = new Date();
let newDate = day.toDateString();

//API URL & key
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = ",&appid=597f7221746d95f25cbd1c559d42bcde&units=metric";


// the server URl 
const server = "http://localhost:8000";

// define generate button
const generate = document.getElementById("generate");

// Event Listener
generate.addEventListener("click",
(eo) => {
  const zipCode = document.getElementById("zip").value;
  const feelings = document.getElementById("feelings").value;

  getDataAPI(baseURL, zipCode, apiKey).then((data) => {

  const weatherInfo = {
    temp : data.main.temp,
    city : data.name,
    description : data.weather[0].description,
    icon : data.weather[0].icon,
  }

  postData("/postData", weatherInfo)

  updateUI();
      document.querySelector('.weatherData').style.display = "block";
      document.getElementById("content").innerHTML = `My Feelings <br> <br> ${feelings}`;


  })


  
})

// return Data from the external API.
const getDataAPI = async (baseURL, zipCode, apiKey)=>{

  const res = await fetch(baseURL+zipCode+apiKey)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
  }

}

// POST Route client side function
const postData = async ( url = '', data = {})=>{
  console.log(data);
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },  
    body: JSON.stringify(data), 
  });

    try {
      const newData = await response.json();
      console.log(newData);
      return newData;
    }catch(error) {
    console.log("error", error);
    }
}

// updating UI Return Endpoint Data
const updateUI = async () => {
  const res = await fetch(server + "/all");
  try {
    const allData = await res.json();

    document.getElementById("date").innerHTML = `Today is <br> <br> ${newDate}`;
    document.getElementById("city").innerHTML = `State <br> <br> ${allData.city}`;
    document.getElementById("temp").innerHTML = Math.round(allData.temp) + '&degC';
    document.getElementById("temp").innerHTML += `<br> <br> ${allData.description}`;
    document.getElementById("icon").src = `https://openweathermap.org/img/wn/${allData.icon}.png`;
  } catch (error) {
    console.log(error);
  }
};


