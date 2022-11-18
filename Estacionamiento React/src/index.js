import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
      <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300&family=Rubik:wght@500&display=swap" rel="stylesheet"/>
      <link href="https://fonts.googleapis.com/css2?family=Stick+No+Bills:wght@200&display=swap" rel="stylesheet"/> 
      <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@900&family=Stick+No+Bills:wght@200&display=swap" rel="stylesheet"/>
    </head>
    <App />
  </React.StrictMode>
);
