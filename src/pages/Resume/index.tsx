import React, { useState } from 'react';
import Card from '../../components/Card';
import {FaDollarSign} from 'react-icons/fa';
import './index.css';

type Record = {
    description: string,
    value: number,
    type: 'in' | 'out'
};

function Resume() {

    const [record, setRecord] = useState<Record>({
        description: '',
        value: 0,
        type: 'in'
    });

    function handleChange(e) {
        setRecord(record => ({...record, [e.target.name]: e.target.value}));
    }

    return (
        <div className='resume-container'>
            <div className="card-wrapper">
                <Card title='Entradas' value='R$1000' icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
                <Card title='Saídas' value='R$1000' icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
                <Card title='Total' value='R$1000' icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
            </div>

            <form className="control-form">
                
                <div className='input-wrapper'>
                    <label htmlFor="description">Descrição</label>
                    <input id='description' name='description' type="text" placeholder='Insira a descrição' onChange={handleChange}/>
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="value">Valor</label>
                    <input id='value' name='value' type="text" placeholder='Insira o valor' onChange={handleChange}/>
                </div>
    
                <div className="radio-wrapper">
                    <label>
                        <input id='in' type="radio" name='type' value='in' onChange={handleChange}/>
                        Entrada
                    </label>
                    <label>
                        <input id='out' type="radio" name='type' value='out' onChange={handleChange}/>
                        Saída
                    </label>
                </div>

                <button type="submit" className='submit-button'>ADICIONAR</button>
            </form>
        </div>
    );
}

export default Resume;