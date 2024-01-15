import { useEffect, useState } from 'react'
import { MsgBox } from './styles'


const Message = (message: string, type = 'FAILED') => {

    const [notify, setNotify] = useState<string | undefined>()
    const [messageType, setMessageType] = useState<string | undefined>()
    
    const handleMessage = () => {
        setNotify(message)
        setMessageType(type)
    }

    useEffect(() => {
        handleMessage()
    }, [notify])

    return (
        <MsgBox type={messageType}>{notify}</MsgBox>
    )
}

export default Message