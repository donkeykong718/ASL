'use client';

// import { useState, useEffect } from 'react'
import '../../app/globals.css'
import styles from './Chatroom.module.css'
import '98.css'
// import { w3cwebsocket as W3CWebSocket } from "websocket"

import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React, { useState, useEffect } from 'react'
import dynamic from "next/dynamic";
import ListBuddy from './ListBuddy';
import ChatLine from './Chatline';

// const ReactQuill = dynamic(import('react-quill'), {
//   ssr: false, loading: () => <p>Loading ...</p>
// })

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ color: ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", 'custom-color'] }],
    ['bold', 'italic', 'underline']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  'font',
  'color',
  'bold',
  'italic',
  'underline'
]

let activeUsers = [{ username: 'FakeUser' }, { username: 'FakeUser2' }]
let messages = [{ author: 'FakeUser', text: 'Test' }, { author: 'FakeUser2', text: 'Test2' }]

const currentUser = 'davidkoll'


if (activeUsers.includes({ username: currentUser }) === false) {
  activeUsers.push({ username: currentUser })
}

// const closeButton = document.querySelector(('[aria-label="Close"]'))

export default function Chatroom() {

  const [value, setValue] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    let newText = value;
    let newMessage = { author: currentUser, text: newText }

    setValue(newMessage);
    messages.push(newMessage);
    console.log(messages);
  }

  return (
    <div className="window">
      <div className="title-bar">
        <div className="title-bar-text">
          <img></img>
          ASL - ['Chatroom Name' Chat] </div>
        <div className="title-bar-controls">
          <button aria-label="Minimize"></button>
          <button aria-label="Maximize"></button>
          <button aria-label="Close"></button>
        </div>
      </div>
      <div className="window-body">
        <div className={styles.chatContainer}>
          <div className={styles.chatCol}>
            <div className={styles.chatWindow}>
              {messages.map((message, index) => (<ChatLine message={message} key={index} />))}
            </div>
            <ReactQuill modules={modules} formats={formats} value={value} onChange={setValue} theme="snow" />
            <button className={styles.submitButton} onClick={handleSubmit}>Send!</button>

          </div>
          <div className={styles.buddyCol}>
            <p className={styles.userList}>{activeUsers.length} people here</p>
            <div className={styles.buddyList}>
              {/* Need to input active users. How? */}
              {activeUsers.map((user, index) => (<ListBuddy user={user} key={index} />))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}