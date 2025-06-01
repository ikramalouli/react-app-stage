import React, { useState } from 'react'

export default function DropDown({
    data
}) {

    const [newStatut, setNewStatut] = useState('not_yet_started');

    
  return (<>
    <select
            value={newStatut}
            onChange={(e) => setNewStatut(e.target.value)}
          >{data.map((item, index)=>{ 
            return (<option key={index} value={item.key} disabled hidden>{item.value}</option>)
           }
           )}
           
    </select>
    </>
    
  )
}
