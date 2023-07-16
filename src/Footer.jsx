import React from 'react';
import {Button, Stack} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

export const Footer = ()=> {
    const navigate = useNavigate();
return (    <Stack direction="horizontal" gap={3} className={"p-4"}><div>Copyright 2023</div><div className="ms-auto"><Button variant="link" onClick={()=> {navigate('/about')}}>About</Button></div><div><Button variant="link" onClick={()=> {navigate('/')}}>Home</Button></div></Stack>)
}