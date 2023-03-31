import React from 'react';
import Card from '../../components/Card';
import {FaDollarSign} from 'react-icons/fa';
import './index.css';

function Resume() {
    return (
        <div className='resume-container'>
            <div className="card-wrapper">
                <Card title='Entradas' value='R$1000' icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
                <Card title='Saídas' value='R$1000' icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
                <Card title='Total' value='R$1000' icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
            </div>
        </div>
    );
}

export default Resume;