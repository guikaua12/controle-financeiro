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

    const [records, setRecords] = useState<Array<Record>>(loadRecords());

    const [record, setRecord] = useState<Record>({
        description: '',
        value: 0,
        type: 'in'
    });

    function loadRecords(): Array<Record> {
        const localRecords = localStorage.getItem('controle_financeiro');
        
        return JSON.parse(localRecords || '[]');
    }

    function addRecord(record: Record): void {
        setRecords(records => {
            const newRecords = [record, ...records];
            localStorage.setItem('controle_financeiro', JSON.stringify(newRecords));
            
            return newRecords;
        });
    }

    function getTotal(type: 'in' | 'out' | 'total'): number {
        let value = 0;

        records.filter(record => record.type === type).forEach(record => {
            value += Number(record.value);
        });

        if(type === 'total') {
            value += getTotal('in') + getTotal('out');
        }

        return value;
    }

    function handleChange(e): void {
        setRecord(record => ({...record, [e.target.name]: e.target.value}));
    }

    function handleAddRecordSubmit(e): void {
        e.preventDefault();

        if(!record.description) {
            return;
        }

        if(!record.value || isNaN(record.value) || record.value < 1) {
            return;
        }

        addRecord(record);
        setRecord({
            description: '',
            value: 0,
            type: 'in'
        });
    }

    return (
        <div className='resume-container'>
            {/* cards */}
            <div className="card-wrapper">
                <Card title='Entradas' value={`R$ ${getTotal('in')}`} icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
                <Card title='Saídas' value={`R$ ${getTotal('out')}`} icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
                <Card title='Total' value={`R$ ${getTotal('total')}`} icon={<FaDollarSign size={20}></FaDollarSign>}></Card>
            </div>

            {/* control form */}
            <form className="control-form" onSubmit={handleAddRecordSubmit}>
                
                <div className='input-wrapper'>
                    <label htmlFor="description">Descrição</label>
                    <input id='description' name='description' type="text" placeholder='Insira a descrição' value={record.description} onChange={handleChange}/>
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="value">Valor</label>
                    <input id='value' name='value' type="text" placeholder='Insira o valor' value={record.value} onChange={handleChange}/>
                </div>
    
                <div className="radio-wrapper">
                    <label>
                        <input id='in' type="radio" name='type' value='in' checked onChange={handleChange}/>
                        Entrada
                    </label>
                    <label>
                        <input id='out' type="radio" name='type' value='out' onChange={handleChange}/>
                        Saída
                    </label>
                </div>

                <button type="submit" className='submit-button'>ADICIONAR</button>
            </form>

            <div className="records-table-wrapper">
                <table className='records-table'>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Tipo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map(record => 
                                <tr>
                                    <td>{record.description}</td>
                                    <td>{record.value}</td>
                                    <td>{record.type}</td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Resume;