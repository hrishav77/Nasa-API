import React, {useEffect, useState} from "react";
import './App.css';



function App() {
 const [url,seturl]=useState("");
 const[explanation,setexp]=useState("");
 const[date,setdate]=useState("");
 const[title,settitle]=useState("");
 const[todayDate,settodaysdate]=useState(new Date)
 const urldate=todayDate.toISOString().slice(0, 10);
 var i=0;

function prev() {
  i=i+1;
  settodaysdate(new Date(todayDate.setDate(todayDate.getDate() - i)));
 }
 function next(){
  i=i-1;
  settodaysdate(new Date(todayDate.setDate(todayDate.getDate() - i)));
 }


async function getimage(){
const data=await fetch(`https://api.nasa.gov/planetary/apod?api_key=DL34c41sck5tmyDgMWUe8GMFSml8Qa9Izdy36gk5&date=${urldate}`);
const jsondata=await data.json();
console.log(jsondata)
const explanation=await jsondata.explanation;
setexp(explanation);
const imgurl=await jsondata.url;
seturl(imgurl);
const date=await jsondata.date;
setdate(date);
const title=await jsondata.title;
settitle(title);
}
 
 useEffect(() => {
    getimage();
  });


  return (
    <>
    <center><h1>Astronomy Picture Of The Day</h1>
    <div className="exp"><a href="https://apod.nasa.gov/apod/archivepix.html">Discover the cosmos!</a> Each day a different image or photograph of our fascinating universe is featured, along with a brief explanation written by a professional astronomer.</div>
    <div>{date}</div>
    
    <img src={url} alt="response contains a video or the website havent updated todays pic click on prev" className="img" />
    <div className="title">{title}</div>
    </center>
    <div>{explanation}</div>
    <div>
      <center>
      <button onClick={prev} >PREV</button>
      <button onClick={next}>NEXT</button>
      </center>
    </div>
    </>
  );
}

export default App;
