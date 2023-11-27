import { useState } from "react"
import { useCallback } from "react"
import { useRef } from "react"
import { useEffect } from "react"

function PasswordGenerator(){
    const [length,setLength]=useState(8);
    const [numAllowed,setNum]=useState(false);
    const [charAllowed,setChar]=useState(false);
    const [Password,setPassword]=useState("");
    const passwordGenerator=useCallback(()=>{
        let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        let pass="";
        if(numAllowed)
            str+="1234567890";
        if(charAllowed)
        str+="!@#$%^&*(){}";
        for(let i=0;i<length;i++){
            let char=Math.floor(Math.random()*str.length+1);
            pass+=str.charAt(char);
        }
        setPassword(pass);

    },[length,charAllowed,numAllowed,setPassword]);

const passwordRef=useRef(null);

    useEffect(()=>{
        passwordGenerator()
    },[length,numAllowed,charAllowed,passwordGenerator]);

    const copyToClipBoard=useCallback(()=>{
        passwordRef.current?.select();
        passwordRef.current?.setSelectionRange(0,31);
        window.navigator.clipboard.writeText(Password);
    },[Password]);
    return(
        <>
        <div className="w-full h-screen bg-gray-400 flex justify-center items-center">
            <div className="w-[700px] h-[200px] border-2 border-blue-600 rounded-lg ">
                <h2 className="text-center m-3 text-gray-900 text-[30px] shadow-md tracking-wide">Password Generator</h2>
                <div className="flex m-3 justify-center ">
                <input type="text" placeholder="Password" 
                ref={passwordRef}
                value={Password}
                
                className="h-[40px] w-[70%] rounded-l-lg border-2 border-blue-500 text-lg text-gray-700 px-[6px]"/>
                <button className="h-[40px] text-lg p-1 px-3 border-2 border-black bg-blue-600 rounded-r-lg bg-"
                onClick={copyToClipBoard}
                >copy</button>
                </div>
                <div className="flex gap-4 justify-center items-center mt-6">
                    <input type="range"
                        min={8}
                        max={30}
                        onChange={(e)=>setLength(e.target.value)}
                    />
                    <label className="text-md">length: {length}</label>
                    <input type="checkbox" 
                    onChange={()=>{setNum((prev)=>!prev)}}
                    className="w-[20px] h-[20px]" />
                    <label className="text-md">Number</label>
                    <input type="checkbox"
                    onChange={()=>{setChar((prev)=>!prev)}}
                     className="w-[20px] h-[20px]" />
                    <label className="text-md">Special Character</label>
                </div>
            </div>
        </div>
        </>
    )
}
export default PasswordGenerator