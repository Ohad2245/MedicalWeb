import React from 'react';
import { useRouter } from 'next/router';

const canceled = () => {
    const router = useRouter();

    const handleButton = () =>{
        router.push("/Home")   
    }
  return (
    <div style={{textAlign:'center'}}>
    <h1>You canceled the transaction, continue to the home page </h1>
    <img src="/imrs.webp" width={50}/>
    <br/>
    <button className="btn" onClick={handleButton}>Continue</button>
    </div>
  )
}

export default canceled;