import { useState } from 'react'
import './App.css'
import { Box, Button, FormControl, InputLabel, LinearProgress, MenuItem, Select, TextField } from '@mui/material'
import SendIcon from "@mui/icons-material/Send"
import axios from 'axios'

function App() {
  
  const [Input, setInput] = useState("")
  const [type, setType] = useState("")
  const [Content, setContent] = useState("")

  const [load, setload] = useState(false)

  const generateJoke = async (topic,type) => {
    let userPrompt = `Generate a ${type} about ${topic}`;
    console.log(userPrompt);
    setload(true)
    try{


    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages:[{
          role:"user",
          content:userPrompt
        }]
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
        },
      }
      );
      console.log(response.data)
      let data = response.data.choices[0].message.content;
      setContent(data);
      setload(false);
    }
    catch(err){
      console.log(err)
      setload(false);
    setContent("Something went Wrong");
    }
  };

  let handleSend = ()=>{
    generateJoke(Input, type)
    console.log(Input, type)
    console.log(import.meta.env.VITE_OPENAI_API_KEY)
  }
  

  return (
    <>
      <div style={{display:"flex", placeContent:"center", alignItems:"center", height:"450px", gap:"52px"}}>
      <TextField required label="Enter Your Text Here" outlined-basic sx={{border:"3px solid black", borderRadius:"15px" }} value={Input} onChange={(e)=>setInput(e.target.value)} />
      <FormControl sx={{ m: 1, minWidth: 120, border:"3px solid black", borderRadius:"15px" }}>
        <InputLabel>Select</InputLabel>
        <Select value={type} onChange={(e)=>setType(e.target.value)}>
          <MenuItem value={"Joke"}>Joke</MenuItem>
          <MenuItem value={"Shayari"}>Shayari</MenuItem>
          <MenuItem value={"Quote"}>Quote</MenuItem>
          <MenuItem value={"Story"}>Story</MenuItem>
        </Select>
      </FormControl>
        
      
      <Button variant="contained" color="success" sx={{border:"1px solid black"}}  endIcon={<SendIcon />} onClick={handleSend}>
        Send
      </Button>
      </div>

     
      <div>
        {
          load ? (
            <Box sx={{ width: '100%' }}>
              <LinearProgress />
            </Box>
          ) : (
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
            <div style={{border:"1px solid black", width:"600px", padding:"20px"}}>
            <p>{Content=="" ? "Your Output Will Be Here" : Content}</p>
            </div>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App
