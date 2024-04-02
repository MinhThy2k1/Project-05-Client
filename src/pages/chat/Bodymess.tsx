import React from 'react'
import { Chat, socketChat } from '../../service/chat-socket'
import './chat-box.scss'
import { user } from '../../store/slices/user.slice'
import { StoreType } from "../../store";
import { useSelector } from 'react-redux';
import ChatBox from './chat-box';
export default function Bodymess() {

    const chatStore = useSelector((store: StoreType) => store.chatStore)

    const userStore = useSelector((store: StoreType) => store.userStore)

    return (
        <div>
            <div className='box-chats'>
                {

                    chatStore.data && (
                        <div style={{
                            width: 500,
                        }}>
                            <ChatBox data={chatStore.data || []} user={userStore.data} />
                        </div>
                    )
                }
            </div>
        </div>
    )
}
{/* <div>
    {
        chatStore.data && (
            <div style={{
                width: 500,
            }}>
                <ChatBox data={chatStore.data || []} user={userStore.data} />
            </div>
        )
    }
</div> */}
