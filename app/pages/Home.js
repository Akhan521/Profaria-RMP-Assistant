'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Head from "next/head";
import ScrollParagraph from '@/anim-comps/Scroll-Paragraph';

const paragraph = `Profaria is an AI assistant that helps you find the best professors for your classes.`;

function Home() {
    return (
        <main
            style={{
                backgroundColor: "#121212",
            }}
        >
            <div style={{height: "100vh"}}></div>
            <ScrollParagraph value={paragraph} />
            
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height='100vh'
            >
                <Link
                    to='/assistant'
                >
                    <ScrollParagraph value={"Get started by clicking here."} color={'#819171'}/>
                </Link>
                <div style={{height: '85vh'}}></div>
            </Box>
        </main>
    );
};

export default Home;