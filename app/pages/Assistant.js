'use client';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useRef, useState, useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, animate } from 'framer-motion';

const COLORS = ["#13FFAA", "#1E67C6", "#CE84CF", "#DD335C"];

const typingSpeed = 30; // Speed of typing can be adjusted here

function TypingMessage({ text }) {
  const [displayText, setDisplayText] = useState("");
  const index = useRef(0);
  const displayTextRef = useRef("");

  useEffect(() => {
    const timer = setInterval(() => {
      if (index.current < text.length) {
        displayTextRef.current += text.charAt(index.current);
        setDisplayText(() => displayTextRef.current);
        index.current += 1;
      } else {
        clearInterval(timer);
      }
    }, typingSpeed);

    return () => clearInterval(timer);
  }, [text]);

  return <span className="typing">{displayText}</span>;
}

function Assistant() {
  
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi! I'm the Rate My Professor support assistant. How can I help you today?`,
    },
  ])
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!message.trim() || isLoading) return;
    setIsLoading(true);

    setMessage('');
    setMessages((messages) => [
      ...messages,
      {role: 'user', content: message},
      {role: 'assistant', content: ''},
    ]);

    await new Promise((resolve) => setTimeout(resolve, 5000));
  
    const response = fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, {role: 'user', content: message}]),
    }).then(async (res) => {
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let result = '';
  
      return reader.read().then(function processText({done, value}) {
        if (done) {
          return result;
        }
        const text = decoder.decode(value || new Uint8Array(), {stream: true});
        setMessages((messages) => {
          let lastMessage = messages[messages.length - 1];
          let otherMessages = messages.slice(0, messages.length - 1);
          return [
            ...otherMessages,
            {...lastMessage, content: lastMessage.content + text},
          ]
        });
        return reader.read().then(processText);
      })
    })

    setIsLoading(false);
  };


  const color = useMotionValue(COLORS[0]);
  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #020617 50%, ${color})`;

  useEffect(() => {
    animate(color, COLORS, {
      ease: 'easeInOut',
      duration: 10,
      repeat: Infinity,
      repeatType: 'mirror',
    });
  }, []);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <motion.section style={{
      backgroundImage,
      width: '100vw',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Stack
        direction={'column'}
        border="1px solid #9A9498"
        p={2}
        spacing={3}
        width="100%"
        height="100%"
      >
        <Stack
          direction={'column'}
          spacing={4}
          flexGrow={1}
          overflow="auto"
          maxHeight="100%"
          p={2}
        >
          {messages.map((message, index) => (
            <Box
              key={index}
              display="flex"
              justifyContent={
                message.role === 'assistant' ? 'flex-start' : 'flex-end'
              }
            >
              <Box
                bgcolor={
                  message.role === 'assistant'
                    ? 'primary.main'
                    : 'secondary.main'
                }
                color="white"
                borderRadius={16}
                p={3}
                sx={{ maxWidth: "fit-content", width: "auto" }}
              >
                <TypingMessage key={message.content} text={message.content} />
              </Box>
            </Box>
          ))}
          <div ref={messagesEndRef} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <TextField
            label="Message"
            fullWidth
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isLoading}
            sx={{
              "& label": {
                color: "white",
              },
              "&:hover label": {
                color: "white", // Sets the label color to white on hover
              },
              "& .MuiInputBase-input": {
                color: "white", // Sets the text color inside the input field to white
              },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#9A9498",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "white",
                },
              },
            }}
          />
          <Button variant="contained" onClick={sendMessage} disabled={isLoading}>
            {isLoading ? "Sending..." : "Send"}
          </Button>
        </Stack>
      </Stack>
    </Box>
    </motion.section>
  );
  
}

export default Assistant;