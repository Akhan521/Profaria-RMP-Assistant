'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Head from "next/head";
import ScrollParagraph from '@/anim-comps/Scroll-Paragraph';
import FadeInText from '@/anim-comps/FadeIn-Text';
import TwinkleText from '@/anim-comps/Twinkle-Text';
import { motion } from 'framer-motion';

const paragraph = `Profaria is an AI assistant that helps you find the best professors for your classes.`;

function Home() {
    
    return (
        <main
            style={{
                backgroundColor: "#121212",
            }}
        >
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                height='100vh'
                sx={{
                    paddingTop: '10vh',
                    color: 'white',
                }}
            >
                
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 80
                    }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            color: 'white',
                            fontSize: '5rem',
                        }}
                    >
                        <FadeInText text="Welcome to Profaria" color={'white'} duration={5} />
                    </Typography>
                </motion.div>

                <Typography variant="h4" sx={{color: 'white', paddingTop: '5vh'}}>
                    <TwinkleText text="Scroll to Learn More" color={'#819171'} />
                </Typography>
                
                
            </Box>
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