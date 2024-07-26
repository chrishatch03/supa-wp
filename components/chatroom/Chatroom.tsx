"use client";
import React, { useState, useEffect } from 'react';

const Chatroom = () => {
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
    
        socket.onopen = () => {
            console.log('Connection opened');
            socket.send('I am listening');
        };
    
        socket.onmessage = (event) => {
            console.log('Received: ', event.data);
        };
    
        socket.onerror = (error) => {
            console.error('WebSocket error:', error);
        };
    
        socket.onclose = () => {
            console.log('Connection closed');
        };
    
        return () => {
            socket.close();
        };
    }, []);

    const [open, setOpen] = useState(false);
// Handle when the user toggles the chatroom open or closed
    const handleOpenChatroom = () => {
        setOpen(!open);
    };
// Handle when the user types and sends a message
    const [message, setMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const handleSubmit = () => {
        if (message !== '') {
            console.log('Message sent', message);
        }
    }

    return (
        <div className='fixed bottom-0 right-0 z-20 w-auto h-auto'>
            {!open && (<button onClick={handleOpenChatroom} className='mr-6 mb-6 bg-primary dark:bg-white text-white dark:text-primary p-2 rounded-lg shadow-lg'>Chat</button>)}
            {open && (
                <div className='mb-5 mr-5 w-96 h-96 bg-white dark:bg-secondary rounded-lg shadow-lg flex flex-col justify-between overflow-hidden'>
                    <div className='flex justify-between p-2 bg-primary text-white dark:bg-white dark:text-primary'>
                        <h1 className='text-lg font-semibold'>Chatroom</h1>
                        <button onClick={handleOpenChatroom} className='text-lg font-semibold mr-2'>X</button>
                    </div>
                    <div className='h-full overflow-y-auto p-2 '>
                        <p>Chat messages will go here</p>
                    </div>
                    <form onSubmit={handleSubmit} className='flex justify-between gap-4 p-2 border border-primary/5 shadow-sm'>
                        <input id="message" value={message} onChange={handleChange} type='text' className='w-full h-10 p-2 border border-gray-300 rounded-lg' />
                        <button type="submit" className='bg-primary dark:bg-white text-white dark:text-primary p-2 rounded-lg shadow-lg'>Send</button>
                    </form>
                </div>
            )}
        </div>
    );
}

export default Chatroom;