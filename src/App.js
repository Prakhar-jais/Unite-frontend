import { Fragment, useEffect ,useState} from 'react';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Register from './Register';
import Login from './Login';
import Chat from './Chat';
import SetAvatar from './SetAvatar';
import Sidebar from "./Sidebar";

function App() {
  

  return (
    <div  className="app">
      <div className="app_body">
        <BrowserRouter>
            <Routes>
                <Route path="/register" element={<Register />}/>
                <Route path="/logged-in" element={[<Sidebar />]}/>
                <Route path="/" element={ <Login />}/>
                <Route path="/setAvatar" element={ <SetAvatar/>}/>
                  
                
            </Routes>
        </BrowserRouter>
        
      </div>
     
    </div>
  );
}

export default App;




// const [messages,setMessages] = useState([]);

//   useEffect(()=>{
    

//     axios.get('/messages/sync')
//     .then(response=>{
//       console.log(response.data)
//       setMessages(response.data);
//     })
//   },[])

//   useEffect(()=>{
//     const pusher = new Pusher('b08b38f046b171599a62', {
//       cluster: 'ap2'
//     });

//     const channel = pusher.subscribe('messages');
//     channel.bind('inserted', function(newMessage) {
//       alert(JSON.stringify(newMessage));
//       setMessages([...messages,newMessage])
//     });

//     return ()=>{
//       channel.unbind_all();
//       channel.unsubscribe();
//     };
//   },[messages])

//   console.log(messages);