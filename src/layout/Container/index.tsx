import React from 'react';
import './index.css';

// @ts-ignore
function Container({children}) {
    return (
        <div className='container'>
            {children}
        </div>
    );
}

export default Container;