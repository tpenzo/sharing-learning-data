import { createStandaloneToast } from '@chakra-ui/toast'

const { toast } = createStandaloneToast()

export default function showToast(message, status){
    toast({
        description: message,
        status: status,
        duration: 3000,
        position: 'top-right',
        isClosable: true,
    })
}