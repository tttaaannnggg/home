import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";

function App() {
  const [post, setPost] = useState(1);
  
  return (
    <div className="App">
        <div className="header">
          <h1>tang</h1>
        </div>
      {BlogPost({post})}
      {Nav({setPost, post})}
    </div>
  );
}

function Nav(props){
  const {setPost, post} = props
  return(
    <div>
      <a onClick={()=>{setPost((post)=>post-1)}}> prev </a>
      <span> {post} </span>
      <a onClick={()=>{setPost((post)=>post+1)}}> next </a>
    </div>
  )
}

function BlogPost(props){
  const [err, setErr] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(
    ()=>{
      fetch(`http://localhost:4000/api/posts/${props.post}`)
        .then(res=>res.json())
        .then(
          result =>{
            console.log(result);
            setIsLoaded(true);
            setItems(result);
          }
        )
    }, [props.post]
  )

  console.log(items);
  let content = <p>loading..</p>;
  if(isLoaded && items.length){
    content = items[0].body.split('\n').filter(para=>para.length).map((para, i)=>(<p key={'p'+i}>{para}</p>));
  } else {
    content = <p>not found!</p>
  }
  return(
    <article>
      <h2>{props.title}</h2>
      {content}
    </article>
  )
}

export default App;
