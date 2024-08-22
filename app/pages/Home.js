'use client';

import { Box, Stack, Typography } from '@mui/material';
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
            <div style={{height: "100vh"}}></div>
        </main>
    );
};

export default Home;