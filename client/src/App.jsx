/*eslint-disable*/
import React, { useEffect,useState} from "react";
import getWeb3 from "./getWeb3";
import ProxyAbi from "./contracts/Proxy.json"
import ParentAd from "./contracts/Parent.json"
import ChildAd from "./contracts/Child.json"
import Parent from "./Components/Parent/Parent"
import Child from "./Components/Child/Child";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Upgrade from "./Components/Upgrade/Upgrade";
function App() {
  const [state, setState] = useState({web3: null,contract: null});
  const [contractaddres,setcontractaddres]=useState(null)
  const [ParentAddr,setParentAddr]=useState("no address")
  const [ChildAddr,setChild]=useState("no address")
  
  useEffect(() => {
    const init = async () => {
      try {
        const web3 = await getWeb3();
        const networkId = await web3.eth.net.getId();
        
        const deployedNetwork = ProxyAbi.networks[networkId];
        const deployedParent = ParentAd.networks[networkId];
        const deployedCheld = ChildAd.networks[networkId];
        setcontractaddres(deployedNetwork.address)
        setParentAddr(deployedParent.address)
        setChild(deployedCheld.address);
        console.log("Proxy Contract Address:", deployedNetwork.address);
        console.log("Parent Contract Address:", deployedParent.address);
        console.log(" Child Contract Address:", deployedCheld.address);
        const instance = new web3.eth.Contract(
          ProxyAbi.abi,
          deployedNetwork && deployedNetwork.address
        );
        setState({ web3, contract: instance });
      } catch (error) {
        alert("Please connect with wallet first");
        console.log(error);
      }
    };
    init();
  }, []);
console.log("objectdfd",ChildAddr)
console.log("fughudfguyfd",contractaddres)
  return (
   <>


<BrowserRouter>
        <Navbar state={state} contractaddres={contractaddres}  />
        <Routes>
          <Route path="/" element={<Parent state={state} contractaddres={contractaddres} ParentAddr={ParentAddr} />} />
          <Route path="/Upgrade" element={<Upgrade state={state} />}/>
          <Route path="/Version2" element={<Child state={state} contractaddres={contractaddres} ChildAddr={ChildAddr} />} />
        </Routes>
  
      </BrowserRouter>
   </>
  );
}

export default App;
