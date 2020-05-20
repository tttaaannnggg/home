import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";
const url = 'http://ec2-52-23-194-63.compute-1.amazonaws.com';

function App() {
  const [post, setPost] = useState(0);
  return (
    <div className="App">
        <div className="header">
          <h1>tang</h1>
        </div>
      {BlogPost({setPost, post})}
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
  const {setPost, post} = props;
  const [err, setErr] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [item, setItem] = useState({});
  console.log(item);

  useEffect(
    ()=>{
      console.log(`fetching to ${url}/api/posts/${post}`);
      fetch(`${url}/api/posts/${post}`)
        .then(res=>res.json())
        .then(
          result =>{
            console.log(result);
            setIsLoaded(true);
            if(result && result[0]){
              setItem(result[0]);
              setPost(result[0].id)
            };
          }
        )
    }, [props.post]
  )

  let content = <p>loading..</p>;
  if(isLoaded && item && item.body){
    content = item.body.split('\n').filter(para=>para.length).map((para, i)=>(<><p key={'p'+i}>{para}</p><br/></>));
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
