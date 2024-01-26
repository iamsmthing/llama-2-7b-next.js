import { METHODS } from "http";
import { NextApiRequest, NextApiResponse } from "next";
import { headers } from "next/headers";


const API_KEY=process.env.CLOUDFLARE_API_KEY
const ACCOUNT_ID=process.env.CLOUDFLARE_ACCOUNT_ID
export default async function logout(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {

    const messages = [
        { role: 'system', content: 'You are a friendly assistant.Replace *smiling* with 😊' },
        { role: 'user', content: req.body }
      ];
    
      try {
        
        const data=await fetch(`https://api.cloudflare.com/client/v4/accounts/${process.env.CLOUDFLARE_ACCOUNT_ID}/ai/run/@cf/meta/llama-2-7b-chat-int8`,
    
        {method:'POST',body:JSON.stringify({
         messages
        }),headers:{Authorization: `Bearer ${process.env.CLOUDFLARE_API_KEY}`,
            'Content-Type': 'application/json', }
      })
   
       const response=await data.json()
      //  console.log(response.result.response)
        res.send(response); // Send the response back to the client if needed
        res.end();
      } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Internal Server Error'); // Handle errors and send an appropriate response
      }

    res.json({ message: "data" });
    res.end();
  } else {
    res.status(401);
    res.end();
  }
}
