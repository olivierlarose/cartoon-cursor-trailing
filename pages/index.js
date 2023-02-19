import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRef, useEffect} from 'react';
import { useDebounce } from 'use-debounce';

export default function Home() {

  const container = useRef();
  const img = useRef();

  let timesPerSecond = 120;
  let wait = false;

  const manageMouseMove = (event) => {
    const { clientX, clientY, movementX, movementY } = event
    const containerPosition = container.current.getBoundingClientRect();
    const x = clientX - containerPosition.x
    const y = clientY - containerPosition.y 
    img.current.style.top = y + "px";
    img.current.style.left = x + "px";

    if(!wait){
      draw(x, y)
      wait = true;
      setTimeout( () => {
        wait = false;
      }, 1000 / timesPerSecond)
    }
  }
  
  const draw = (x, y) => {
    const div = document.createElement("div");
    div.classList.add(styles['circle']);
    div.style.top = y + "px";
    div.style.left = x + "px";
    container.current.append(div);

    if(container.current.childNodes.length > 25){
      erase();
    }
    else{
      setTimeout( () => {
        erase();
      }, 1500)
    }
    
  }

  const erase = () => {
    container.current.removeChild(container.current.childNodes[1])
  }

  return (
    <div className={styles.main}>

        <div ref={container} onMouseMove={(e) => {manageMouseMove(e)}} className={styles.container}>
          <img ref={img} className={styles.img} src="/medias/smiley.svg"></img>
        </div>

    </div>
  )
}
