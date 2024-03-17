/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import Web3 from 'web3';

function Parent({ state, contractaddres,ParentAddr }) {
    const [address, setAddress] = useState("No account connected yet");
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [getName,setGetName]=useState("No name yet")
    const [getage,setGetAge]=useState("No age yet")
    const [errors, setErrors]=useState()
        useEffect(() => {
        async function getAccount() {
            if (window.ethereum) {
                try {
                    const web3 = new Web3(window.ethereum);
                    const accounts = await web3.eth.getAccounts();
                    if (accounts.length > 0) {
                        setAddress(accounts[0]);
                    } else {
                        console.log('No accounts found');
                    }
                } catch (error) {
                    console.error('Error fetching accounts:', error);
                }
            } else {
                console.error('Please install MetaMask or another Ethereum wallet extension');
            }
        }
        getAccount();
    }, []);

    async function handleSetValue(e) {
        e.preventDefault();
        const { web3, contract } = state;
        if (contract) {
            try {
                const data = web3.eth.abi.encodeFunctionCall({
                    name: 'setValue',
                    type: 'function',
                    inputs: [
                        {
                            type: 'string',
                            name: '_name'
                        },
                        {
                            type: 'uint256',
                            name: '_age'
                        }
                    ]
                }, [name, age]);
                  const transaction = {
                    from: address,
                    to: contractaddres,
                    data: data,
                };

                await web3.eth.sendTransaction(transaction);
                window.alert("Success");
            } catch (error) {
                window.alert(error.message);
                console.error("Error sending transaction:", error);
            }
        }
    }



    async function handleGetValue(e) {
    e.preventDefault();
    const { web3, contract } = state;
    if (contract) {
        try {
            const data = web3.eth.abi.encodeFunctionCall({
                name: 'getValue',
                type: 'function',
                inputs: []
            }, []);
            const transaction = {
                from: address,
                to: contractaddres,
                data: data,
            };

            const result = await web3.eth.call(transaction);
            console.log("reiryuouifygui", result);
             const decodedResult = web3.eth.abi.decodeParameters(['string', 'uint256'], result);

            console.log("Decoded result:", decodedResult);
            
            setGetName(decodedResult[0]);
            setGetAge(decodedResult[1]);
        } catch (error) {
           setErrors(error)
        }
    }
}

  
    
  
    async function click(e) {
        e.preventDefault();
        const { contract, web3 } = state;
        if (contract) {
            try {
                const das = await contract.methods.getimplime().call({ from: address });
                console.log("implementation:", das[0].stringyfy);
                console.log("admin:", das[1]);
            } catch (error) {
                window.alert(error.message);
                console.error("Error fetching implementation and admin addresses:", error);
            }
        }
    }
    
    
  
    return (
        <div>
<div className="container-fluid">
    <div className="row">
    <div className="col-sm-6" style={{borderRight:"1px solid black",padding:"1rem"}} >  
            <h2 className='text-center' >InPut</h2>
            <form className="row g-3" onSubmit={handleSetValue}>
                    <div className="col-md-12">
                        <label htmlFor="inputName" className="form-label">Name</label>
                        <input type="text" className="form-control" id="inputName" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="col-md-12">
                        <label htmlFor="inputAge" className="form-label">Age</label>
                        <input type="number" className="form-control" id="inputAge" value={age} onChange={(e) => setAge(e.target.value)} />
                    </div>
                    <div className="col-12">
                        <button type="submit" className="btn btn-primary">Set Value</button>
                    </div>
                </form>

        </div>
        <div className="col-sm-6">
        <h2 className='text-center ' style={{marginBottom:"5rem"}} > OutPut </h2>
       
       {errors ? (
                <p>Error: {errors.message}</p>
            ) : (
                <>
        <p>Name: {getName}</p>
                <p>Age: {getage}</p>
                <button className="btn btn-primary" onClick={handleGetValue}>Get Value</button>
                   
                   
                    </>
            )}

        </div>
    </div>
</div>

        </div>



);
}

export default Parent;
