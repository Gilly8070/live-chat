import React from 'react';
import io from 'socket.io-client';
// import { Provider } from 'react-redux'
// import Dashboard from './Dashboard';

export const CTX = React.createContext();

const initState = {
    general: [
        {fromm: 'aaron', msg: 'hello'},
        {fromm: 'arnold', msg: 'hello'},
        {fromm: 'archer', msg: 'hello'},
    ],
    topic2: [
        {fromm: 'aaron', msg: 'hello'},
        {fromm: 'arnold', msg: 'hello'},
        {fromm: 'archer', msg: 'hello'},
    ]
}

function reducer(state, action) {
    const [fromm, msg, topic] = action.payload;
    switch(action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                ...state,
                [topic]: [
                    ...state[topic],
                    {
                        fromm,
                        msg
                    }
                ]
            }
        default: 
            return state
    }
}

let socket;


function sendChatAction(value) {
    socket.emit("chat message", value);
}


export default function Store(props) {

    const [allChats, dispatch] = React.useReducer(reducer, initState);

    if(!socket) {
        socket = io(':3001');
        socket.on('chat message', function(msg) {
            dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
        })
    }

    const user = 'aaron' + Math.random(100).toFixed(2)
    

    return (
        
            <CTX.Provider value={{allChats, sendChatAction, user}}>
                {props.children}
            </CTX.Provider>
        
    )
}