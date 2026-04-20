
import {defineStore} from "pinia";
import {useWebSocket} from "@vueuse/core";
import {useTh4AdminSystem} from "@/store/th4/admin/system/system.ts";
interface MessageListener{
    id?:string;
    support:(type: th4.framework.Enumerated<string> )=>boolean;
    onMessage:(event:any,state:th4.framework.Enumerated<string>,type:th4.framework.Enumerated<string>)=>void;
}
interface MessageDispatcher{
    id?:string;
    [key:string]:any
}
export const useTh4MessageStore = defineStore("th4/message", () => {
    const {token}=useTh4AdminSystem();
    const wsUri = "/web/socket/message/publisher";
    const messageListeners:(MessageListener[])=[];
    const messageDispatchers:(MessageDispatcher[])=[];
    const websocket= useWebSocket(
        `${window.location.protocol.endsWith('s')?'wss':'ws'}://${window.document.location.host}${wsUri}/${token}`,
        {
            // 自动重连
            autoReconnect: true,
            onMessage: (_ws: WebSocket, messageEvent: MessageEvent) => {
                const {source,state,type}=JSON.parse(messageEvent.data);
                messageListeners.forEach(messageListener=>{
                    if(messageListener.support(type)){
                        messageListener.onMessage(source,state,type)
                    }
                })
                messageDispatchers.forEach(messageDispatcher=>{
                    if(messageDispatcher[type.key||type.value]){
                        if(messageDispatcher[type.key||type.value][state.key||state.value] && typeof messageDispatcher[type.key||type.value][state.key||state.value] === "function"){
                            messageDispatcher[type.key||type.value][state.key||state.value](source,state,type)
                        }
                    }
                })
            }
        }
    );
    const registerMessageListener=(messageListener:MessageListener)=>{
        messageListeners.push(messageListener);
    }

    const cancelMessageListener=(messageListener:MessageListener)=>{
        messageListeners.splice(messageListeners.findIndex(itemMessageListener=>itemMessageListener.id==messageListener.id),1);
    }
    const registerMessageDispatcher= (messageDispatcher: MessageDispatcher)=>{
        messageDispatchers.push(messageDispatcher);
    }

    const cancelMessageDispatcher=(messageDispatcher:MessageDispatcher)=>{
        messageDispatchers.splice(messageDispatchers.findIndex(itemMessageDispatcher=>itemMessageDispatcher.id==messageDispatcher.id),1);
    }


    const sendMessage=(_message:any,_type:any)=>{
        websocket.send(JSON.stringify({}))
    }
    return {registerMessageListener,cancelMessageListener,registerMessageDispatcher,cancelMessageDispatcher,sendMessage}
})