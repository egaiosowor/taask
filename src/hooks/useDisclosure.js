import { useCallback, useState } from "react"

export default function useDisclosure(){
    const [isOpen, setIsOpen] = useState(true) 

    const onOpen = useCallback(() => setIsOpen(true), [])

    const onClose = useCallback(() => setIsOpen(false), [])

    const onToggle = useCallback(() => setIsOpen(prev => !prev), [])


    return{
        isOpen,
        onOpen,
        onClose,
        onToggle
    }
}