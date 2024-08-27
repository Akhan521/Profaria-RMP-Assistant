'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import Head from "next/head";
import ScrollParagraph from '@/anim-comps/Scroll-Paragraph';
import FadeInText from '@/anim-comps/FadeIn-Text';
import TwinkleText from '@/anim-comps/Twinkle-Text';
import { motion } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { SignIn, UserButton, useUser } from '@clerk/nextjs';

const paragraph = `Profaria is an AI assistant that helps you find the best professors for your classes.`;

function Home() {
    const { isSignedIn } = useUser();

    return (
        <main
            style={{
                backgroundColor: "#121212",
                scrollBehavior: 'smooth',
            }}
        >
            <Head>
                <title>Profaria AI Assistant</title>
            </Head>
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                height='100vh'
                sx={{
                    paddingTop: '5vh',
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
                    style={{
                        paddingBottom: '2.5vh'
                    }}
                >
                    <Typography
                        variant='p'
                        sx={{
                            color: 'white',
                            fontSize: '50px',
                        }}
                    >
                        <FadeInText text="Welcome to Profaria" color={'white'} duration={5} />
                    </Typography>
                </motion.div>

                <div
                    style={{
                        paddingTop: '5vh',
                        width: '95vw',
                        height: '80vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: '10px',
                        backgroundColor: 'white',
                    }}
                >
                <Spline
                    scene="https://prod.spline.design/KD4uqAG9TPKEyp-R/scene.splinecode" 
                />
                </div>
                
            </Box>

            <ScrollParagraph value={paragraph} />

            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                height='100vh'
            >
                {isSignedIn ? (
                    <>
                        <UserButton />
                        <Link to='/assistant'>
                            <ScrollParagraph value={"Get started by clicking here."} color={'#819171'} />
                        </Link>
                    </>
                ) : (
                    <Link to='/sign-in'>
                        <ScrollParagraph value={"Sign in to get started."} color={'#819171'} />
                    </Link>
                )}
                <div style={{ height: '85vh' }}></div>
            </Box>
        </main>
    );
};

export default Home;
