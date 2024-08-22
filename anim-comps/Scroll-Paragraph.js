'use client';
import React, { useEffect, useRef } from "react";
import styles from '../app/scroll-paragraph.module.css';
import { useScroll, motion, useTransform } from "framer-motion";

export default function ScrollParagraph({value, color}) {

    const element = useRef(null);
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 0.8', 'start 0.5'],
    });

    const words = value.split(" ");

    return (
        <p
            style={{color: color}}
            className={styles.paragraph}
            ref={element}
        >
            {
                words.map((word, i) => {
                    const start = i / words.length;
                    const end = start + ( 1 / words.length );
                    return <Word key={i} range={[start, end]} progress={scrollYProgress} >{word}</Word>
                }
            )}
        </p>
    );
}

const Word = ({children, range, progress}) => {

    const characters = children.split("");
    const amount = range[1] - range[0];
    const step = amount / children.length;
    
    return (
        <span className={styles.word}>
            {
                characters.map( (character, i) => {
                    const start = range[0] + (step * i);
                    const end = range[0] + (step * (i + 1));
                    return <Character key={i} range={[start, end]} progress={progress} >{character}</Character>
                })
            }
        </span>
    )
}

const Character = ({children, range, progress}) => {
    
    const opacity = useTransform(progress, range, [0, 1]);
    return (
        <span>
            <span className={styles.shadow}>{children}</span>
            <motion.span
                style={{opacity}}
            >
                {children}
            </motion.span>
        </span>
    )
}