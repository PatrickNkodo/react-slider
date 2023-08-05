import React,{useState,useEffect} from 'react'
import {data} from './data'
import './index.css'
const Slider = () => {
    const [people, setPeople] = useState(data);
  const [index, setIndex] = React.useState(0);

  //Looping on the indexes
  useEffect(() => {
    const lastIndex = people.length - 1;
    if (index < 0) {
      return setIndex(lastIndex);
    }
    if (index > lastIndex) {
      return setIndex(0);
    }
  }, [index]);

  //Auto slide set
  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => clearInterval(slider);
  }, [index]);
  return (
    <section className="section">
      <div className="title">
        <h2>
          <span>/</span>reviews
        </h2>
      </div>
      <div className="section-center">
        {people.map((person, personIndex) => {
          const { id, image, name, job, text } = person;

          let position = 'nextSlide'; //Slide position is nextslide by default
          //Setting the active slide where index==personIndex
          if (personIndex === index) {
            position = 'activeSlide';
          }
          //Lastslide=index-1 or when index=0 && personIndex=last array item
          if (personIndex === index - 1 ||(index === 0 && personIndex === people.length - 1)) {
            position = 'lastSlide';
          }

          return (
            // Change the classes according to their passage positions
            <article className={position} key={id}> 
              <img src={image} alt={name} className="person-img" />
              <h4>{name}</h4>
              <p className="job">{job}</p>
              <p className="text">{text}</p>
            </article>
          );
        })}
        <button className="prev" onClick={() => setIndex(index - 1)}>
        <i class="fa fa-chevron-left" aria-hidden="true"></i> 
        </button>
        <button className="next" onClick={() => setIndex(index + 1)}>
          <i class="fa fa-chevron-right" aria-hidden="true"></i>
        </button>
      </div>
    </section>
  );
}

export default Slider
