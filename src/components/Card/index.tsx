import React from "react";
import './index.css';

type CardProps = {
    title: string,
    value: string,
    icon: any
};

function Card({title, value, icon}: CardProps) {
  return (
    <div className='card'>
        <div className='wrapper1'>
            <span className='card-title'>{title}</span>
            {icon}
        </div>
        <div className='wrapper2'>
            <span className='card-value'>{value}</span>
        </div>
    </div>
  )
}

export default Card;
