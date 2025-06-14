import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = () => {


    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const toast =useToast();
    const navigate=useNavigate();
    const submitHandler = async () => {
      setLoading(true);
      if ( !email || !password ) {
        toast({
          title: "Please fill all the fields",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
  
      try {
        const config = {
          Headers: {
            "content-type": "application/json",
          },
        };
        const { data } = await axios.post(
          "/api/user/login",
          {  email, password},
          config
        );
  
        toast({
          title: "Login Successfull",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        localStorage.setItem("userInfo",JSON.stringify(data))
        setLoading(false);
        navigate("/chats")
      } catch (error) {
        toast({
          title:"----Error Occured-----",
          description:error.response.data.message,
          status:"error",
          duration:5000,
          isClosable:true,
          position:"top"
        })
        setLoading(false);
      }
    };
  
    return (
        <VStack
        spacing={'5px'}
        >
         
          
          <FormControl id='email' >
            <FormLabel>E-mail</FormLabel>
              <Input
              type='email'
              value={email}
              placeholder='Enter Your E-mail Address'
              onChange={(e)=>setEmail(e.target.value)}
    
              />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup size="md">
              <Input
                type={show ? "text" : "password"}
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={()=>setShow(!show)}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          
          
          <Button
            variant={"solid"}
            colorScheme="blue"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
             isLoading={loading} 
          >
            Login
          </Button>

          <Button
            variant={"solid"}
            colorScheme="red"
            width="100%"
            style={{ marginTop: 15 }}
            onClick={()=>{
                setEmail("guest@example.com")
                setPassword("123456")
            }}
              
          >
            Get Guest User Credentials
          </Button>
        </VStack>
      )
}

export default Login