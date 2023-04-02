import React, { useState } from 'react';
import Card from '../../components/Card';
import {FaDollarSign, FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash} from 'react-icons/fa';
import './index.css';


type Record = {
    id: string,
    description: string,
    value: number,
    type: 'in' | 'out'
};

function Resume() {

    const [records, setRecords] = useState<Array<Record>>(loadRecords());
    const [record, setRecord] = useState<Record>({
        id: generateUniqueId(),
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

    function generateUniqueId(): string {
        const timestamp = Date.now().toString(36);
        const randomStr = Math.random().toString(36).substr(2, 5);
        return `${timestamp}${randomStr}`;
      }

    function removeRecord(record: Record): void {
        setRecords(records => {
            const newRecords = records.filter(rec => rec.id !== record.id);
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
            id: generateUniqueId(),
            description: '',
            value: 0,
            type: 'in'
        });
    }

    return (
        <div className='resume-container'>
            {/* cards */}
            <div className="card-wrapper">
                <Card title='Entradas' value={`R$ ${getTotal('in')}`} icon={<FaRegArrowAltCircleUp size={20}></FaRegArrowAltCircleUp>}></Card>
                <Card title='Saídas' value={`R$ ${getTotal('out')}`} icon={<FaRegArrowAltCircleDown size={20}></FaRegArrowAltCircleDown>}></Card>
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
                            <th className='description-col'>Descrição</th>
                            <th className='value-col'>Valor</th>
                            <th className='type-col'>Tipo</th>
                            <th className='action-col'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map(record => 
                                <tr key={record.id}>
                                    <td>{record.description}</td>
                                    <td>{record.value}</td>
                                    <td>{record.type === 'in' ? <FaRegArrowAltCircleUp className='in-icon'/> : <FaRegArrowAltCircleDown className='out-icon'/>}</td>
                                    <td> <FaTrash className='remove-icon' onClick={e => removeRecord(record)}/> </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Resume;