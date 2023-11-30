import React,{useEffect, useState} from "react";
import "./body.css";
import temp from "./images/weather-app.png"
import hum from "./images/humidity.png"
import air from "./images/icons8-air-pressure-64.png"
import feel from "./images/icons8-windy-weather-50.png"
import axios from "axios";
import logo from "./images/cloud-cast-high-resolution-logo-removebg-preview.png"
import sunrise from "./images/sunrise.png"
import wind from "./images/wind.png"
import weather from "./images/weather-app.png"

function Body()
{
        const getdata=async ()=>
        {
            document.getElementById("moreinfo").style.display="none";
            const city=document.getElementById("location").value;
            const key="273ed78ba27a76c0f295e10ae91b04f5";
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
            try
            {
                const response=await axios.get(url).then()
                {
                    const data= await response.data;
                    console.log(data);
                    document.getElementById("cityinput").innerHTML=data.name;
                    document.getElementById("temp").innerHTML=(data.main.temp-273.15).toFixed(2)+" °C";
                    document.getElementById("humi").innerHTML=(data.main.humidity).toFixed(2)+" %";
                    document.getElementById("air").innerHTML=(data.main.pressure).toFixed(2)+" hPa";
                    document.getElementById("feel").innerHTML=(data.main.feels_like-273.15).toFixed(2)+" °C";
                }
            }
            catch(Error)
            {
                document.getElementById("cityinput").innerHTML="Please enter a valid city name";
                document.getElementById("temp").innerHTML="";
                document.getElementById("humi").innerHTML="";
                document.getElementById("air").innerHTML="";
                document.getElementById("feel").innerHTML="";
            }
        }

        const info=async (req,res)=>
        {
            const city=document.getElementById("location").value;
            document.getElementById("location").value="";
            const key="273ed78ba27a76c0f295e10ae91b04f5";
            const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`

            try
            {
                const response=await axios.get(url).then()
                {
                    const data=await response.data;
                    document.getElementById("moreinfo").style.display="flex";
                    const sun=new Date(data.sys.sunrise*1000)
                    const set=new Date(data.sys.sunset*1000)
                    document.getElementById("sunrise").innerHTML="Sunrise : "+sun.getHours()+":"+sun.getMinutes()+":"+sun.getSeconds() ;
                    document.getElementById("sunset").innerHTML="Sunset : "+set.getHours()+":"+set.getMinutes()+":"+set.getSeconds();
                    document.getElementById("wind").innerHTML="Wind speed : "+data.wind.speed+ " m/s";
                    document.getElementById("windgust").innerHTML="Wind gust : "+data.wind.gust+ " m/s";
                    document.getElementById("weather").innerHTML=data.weather[0].main;
                    
                }
            }

            catch
            {
                document.getElementById("cityinput").innerHTML="Please enter a valid city name";
            }
        }

        function fulldate()
        {
            const date=new Date();
            const day=date.getDate();
            const mon=date.getMonth();
            const year=date.getFullYear();

            document.getElementById("fulldate").innerHTML=day+"-"+mon+"-"+year;

            
        }

        function fulltime()
        {
            const date=new Date();
            const hr=date.getHours();
            const min=date.getMinutes();
            const sec=date.getSeconds();

            document.getElementById("fulltime").innerHTML=hr+":"+min+":"+sec;
        }

        setInterval(fulltime,1000);
        setInterval(fulldate,1000);




    return (<div className="bodies">
    <div className="out">
        <div className="imgs">
            <img src={logo} width="200px" height="150px"></img>
        </div>

        <div class="date">
            <h2 align="center" id="fulldate"></h2>
            <h2 align="center" id="fulltime"></h2>
            
        </div>

        <div className="head">
            <input type="text" id="location" placeholder="Enter city name"></input>
            <button id="search" onClick={()=>getdata()}>Search</button>
        </div>
    </div>
    <h2 align="center" id="cityinput"></h2>
    <div className="body">
        <div className="a">
            <img src={temp} width="50px" height="50px" id="icons"></img><h3 align="center">Temperature</h3>
            <h4 align="center" id="temp"></h4>
        </div>

        <div className="b">
            <img src={hum} width="40px" height="40px" id="icons"></img><h3 align="center">Humidity</h3>
            <h4 align="center" id="humi"></h4>
        </div>

        <div className="c">
            <img src={air} width="50px" height="50px" id="icons"></img><h3 align="center">Air Pressure</h3>
            <h4 align="center" id="air"></h4>
        </div>

        <div className="d">
            <img src={feel} width="50px" height="50px" id="icons"></img><h3 align="center">Feels Like</h3>
            <h4 align="center" id="feel"></h4>
        </div>
    </div>

    <div class="infobtn">
        <button className="info" onClick={()=>info()}>More Info</button>
    </div>

    <div id="moreinfo">
        <div className="sun">
            <img src={sunrise} width="40px" height="40px" id="more"></img>
            <h3 align="center">Sun</h3>
            <p id="sunrise" align="center"></p>
            <p id="sunset" align="center"></p>
        </div>

        <div className="wind">
            <img src={wind} width="40px" height="40px" id="more"></img>    
            <h3 align="center">Wind</h3> 
            <p id="wind" align="center"></p>
            <p id="windgust" align="center"></p>   
        </div>

        <div className="weather" id="ok">
            <img src={weather} width="50px" height="50px" id="more"></img>
            <h3 align="center">Weather</h3>
            <p id="weather" align="center"></p>
        </div>
    </div>
    </div>)
}

export default Body;