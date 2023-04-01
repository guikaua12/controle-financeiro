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

            <form className="control-form">
                <div className='input-wrapper'>
                    <label htmlFor="description">Descrição</label>
                    <input id='description' type="text" placeholder='Insira a descrição'/>
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="value">Valor</label>
                    <input id='value' type="text" placeholder='Insira o valor'/>
                </div>
        
                <div className="radio-wrapper">
                    <label>
                        <input id='in' type="radio" name='type'/>
                        Entrada
                    </label>
                    <label>
                        <input id='out' type="radio" name='type'/>
                        Saída
                    </label>
                </div>

                <button type="submit" className='submit-button'>ADICIONAR</button>
            </form>
        </div>
    );
}

export default Resume;