'use client';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"



const UserPage = () => {
  const [users, setUsers] = useState([]);
  const[inputVal,setInputVal]=useState('');
  const[isLoading,setisLoading]=useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
};


const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        
  if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      setInputVal('');
      callApi(inputVal);
      
      
  }
};

  const callApi=((inputVal:string) => {
    setisLoading(true)
    const fetchData = async () => {
      try {
        const res = await fetch("/api/data", { method: "POST" ,body:inputVal});

        if (!res.ok) {
          console.error(`Failed to fetch data. Status code: ${res.status}`);
          return;
        }
        const usersData = await res.json();
        console.log(usersData)
        setUsers(usersData.result.response);
        setisLoading(false)
        console.log(usersData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }); 

  return (
    <>
     

      <Card>
  <CardHeader>
    <CardTitle>Ask Llama-2-7b-chat</CardTitle>
    <CardDescription><Input placeholder="Enter you Query..." onChange={handleInputChange}  onKeyDown={handleKeyDown}/>
</CardDescription>
  </CardHeader>
  <CardHeader>
  <CardTitle>Llama-2 reply</CardTitle>
    
  </CardHeader>
  
  <CardContent >
  {
      isLoading?'Processing your Request...':<p >{users}</p>
    }
  </CardContent>
  <CardFooter >
    
    
  </CardFooter>
</Card>

      
    </>
  );
};

export default UserPage;
