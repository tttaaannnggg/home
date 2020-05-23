import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";
const url = window.location.href;

function App() {
  const [post, setPost] = useState(0);
  const [maxPost, setMaxPost] = useState(0);
  return (
    <div className="App">
        <div className="header">
          <h1>tang</h1>
        </div>
      {BlogPost({setPost, post, setMaxPost})}
      {Nav({setPost, post, maxPost})}
    </div>
  );
}

function Nav(props){
  const {setPost, post, maxPost} = props;
  return(
    <div>
      <button onClick={()=>{setPost((post)=>post-1 > 0 ? post-1:post)}}> prev </button>
      <span> {post||null} </span>
      <button onClick={()=>{setPost((post)=>post < maxPost ? post+1:post )}}> next </button>
    </div>
  )
}

function BlogPost(props){
  const {setPost, post, setMaxPost} = props;
  const [err, setErr] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});

  useEffect(
    ()=>{
      console.log(`fetching to ${url}api/posts/${post}`);
      fetch(`${url}api/posts/${post}`)
        .then(res=>res.json())
        .then(
          result =>{
            setIsLoaded(true);
            if(result && result[0]){
              setItem(result[0]);
              setPost(result[0].id)
              if(!post){
                setMaxPost(result[0].id);
              }
            };
          }
        )
    }, [props.post]
  )

  let content = <p>loading..</p>;
  if(isLoaded && item && item.body){
    content = item.body.split('\n').map((para, i)=>{
      return para? (<p key={'p'+i}>{para}</p>) : <br key={'p'+i}/>
    });
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
