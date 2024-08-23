'use client';
import React from "react";
import { motion } from "framer-motion";

const fadeInAnim = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
};

export default function FadeInText({ text, color }){

    const chars = text.split('');

    return (
        
        <p style={{color: color}} >
            {chars.map( (char, i) => {
                return (
                    <motion.span
                        key={i}
                        initial='hidden'
                        animate='visible'
                        variants={fadeInAnim}
                        transition={{
                            duration: 1.5,
                            delay: i * 0.1, // Stagger delay
                            ease: 'easeInOut',
                        }}
                    >
                        {char}
                    </motion.span>
                );
            })}
        </p>
    );
}