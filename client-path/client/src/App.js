import React, {useEffect, useState} from "react"
import Login from "./Components/Login";
import Chat from "./Components/Chat";
import io from "socket.io-client";
import HttpButtons from "./Components/HttpButtons"

function App() {
  const [login,setLogin] = useState(localStorage.getItem("myLogin"));
  const [socket, setSocket] = useState();

  useEffect(() => {
    if(login){
      const newSocket = io(
          "http://localhost:4000", {
            reconnectionDelayMax: 10000,
            query: {
              id:login
            }
          }
      );

      setSocket(newSocket);
      return () => newSocket.close();
    }
  }, [login])

  return (
        login ? <><Chat socket = {socket} senderName ={login}/> <HttpButtons set = {setLogin}/></> : <Login set = {setLogin}/>

  );
}

export default App;
