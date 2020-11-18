import React from 'react';
import { Link } from 'react-router-dom';

const CardMusic = (props) => {
  return (
    <div className="col-6 col-md-2 card-music mb-4">
      <Link to={props.playIndex}>
        <img className="img-fluid rounded" src={`${process.env.REACT_APP_BASE_URL}images/${props.img}`} alt="" />
        <div className="description mt-1">
          <div className="title float-left">{props.title}</div>
          <div className="year float-right">
            <small>{props.year}</small>
          </div>
          <br />
          <div className="artists">{props.name}</div>
        </div>
      </Link>
    </div>
  );
};

export default CardMusic;
