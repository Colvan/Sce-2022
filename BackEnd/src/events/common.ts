import { Server,Socket } from "socket.io"

type ImsMessageDirect = {
    to: string,
    from: string,
    message: string
}

type ImsToAll = {
    message: string,
    time: string,
    from: string
}



export = (io:Server, socket:Socket) => {
    const echoHandler = (payload:string) => {
        socket.emit("common:echo", payload)
    }
 
    const imsSendMessageHandler = (payload:ImsMessageDirect) => {
        console.log("imsSendMessageHandler " + payload.from + " " + payload.to)
        const to = payload.to
        io.to(to).emit("ims:receive_message",payload)
    }
    const messageToAllHandler = (payload:ImsToAll) => {
        io.emit("ims:message_to_all", payload);
    }

    socket.on("common:echo", echoHandler);
    socket.on("ims:send_message", imsSendMessageHandler);
    socket.on('message', messageToAllHandler )
 }
 