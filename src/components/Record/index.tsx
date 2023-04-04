import React, {memo} from 'react';
import {RecordType} from '../../pages/Resume';
import {FaRegArrowAltCircleUp, FaRegArrowAltCircleDown, FaTrash} from 'react-icons/fa';

interface RecordProps {
  record: RecordType
  removeRecord: any
};

function Record({record, removeRecord}: RecordProps) {
  return (
    <tr>
        <td>{record.description}</td>
        <td>{record.value}</td>
        <td>{record.type === 'in' ? <FaRegArrowAltCircleUp className='in-icon'/> : <FaRegArrowAltCircleDown className='out-icon'/>}</td>
        <td> <FaTrash className='remove-icon' onClick={e => removeRecord(record)}/> </td>
    </tr>
  )
};

export default memo(Record);
