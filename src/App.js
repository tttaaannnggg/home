import React, { useState, useEffect } from "react";
import "./reset.css";
import "./App.css";
import Markov from "ez-markov";
const url = window.location.href;

function App() {
  const [post, setPost] = useState(0);
  const [maxPost, setMaxPost] = useState(0);
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="App">
      <div className="Container">
        {BlogPost({ setPost, post, setMaxPost, loaded, setLoaded })}
        <Nav
          className="Nav"
          setPost={setPost}
          post={post}
          maxPost={maxPost}
          loaded={loaded}
        />
      </div>
    </div>
  );
}

function Nav(props) {
  const { setPost, post, maxPost, loaded } = props;
  return (
    <div className="Nav">
      <button
        onClick={() => {
          //don't change state unless we've finished our last fetch
          //otherwise we could trigger an infinite fetch loop
          if (!loaded) {
            return;
          }
          setPost((post) => (post - 1 > 0 ? post - 1 : post));
        }}
      >
        {" "}
        {"<-prev"}{" "}
      </button>
      <span>
        {" "}
        {getNavList(post, maxPost).map((i) => (
          <button onClick={() => setPost(i)}>{i}</button>
        ))}{" "}
      </span>
      <button
        onClick={() => {
          if (!loaded) {
            return;
          }
          setPost((post) => (post < maxPost ? post + 1 : post));
        }}
      >
        {" "}
        {"next->"}{" "}
      </button>
    </div>
  );
}

function getNavList(current, max) {
  //returns array of 5 elements
  //represents pagination
  const output = [];
  let start = current - 2;
  let end = current + 2;
  if (current + 2 > max) {
    // if  we're close to the end
    start = max - 4;
    end = max;
  } else if (current < 3) {
    // if  we're close to the start
    start = 1;
    end = 5;
  }
  for (let i = start; i <= end; i++) {
    if (i < 1 || i > max) {
      continue;
    }
    if (i === current) {
      output.push(<strong>{i}</strong>);
    } else {
      output.push(i);
    }
  }
  return output;
}

function BlogHeader(props) {
  const { title, created } = props.item;
  return (
    <div className="BlogHeader">
      <h1>{title}</h1>
      <em>{created}</em>
    </div>
  );
}

function BlogPost(props) {
  const { setPost, post, setMaxPost, setLoaded } = props;
  const [item, setItem] = useState({});

  useEffect(() => {
    console.log(`fetching to ${url}api/posts/${post}`);
    setLoaded(false);
    fetch(`${url}api/posts/${post}`)
      .then((res) => res.json())
      .then((result) => {
        setLoaded(true);
        if (result && result[0]) {
          setItem(result[0]);
          setPost(result[0].id);
          if (!post) {
            setMaxPost(result[0].id);
          }
        }
      });
  }, [props.post]);

  let content = <p>loading..</p>;
  if (item && item.body) {
    content = item.body.split("\n").map((para, i) => {
      return para ? <p key={"p" + i}>{para}</p> : <br key={"p" + i} />;
    });
  }
  return (
    <>
      <BlogHeader item={item} />
      <article>{content}</article>
    </>
  );
}

export default App;
