import { Flex, Box, Avatar, Text } from "@chakra-ui/react";
import { useQuery } from 'react-query'

interface ProfileProps {
    showProfileData: boolean
}

export function Profile({ showProfileData } : ProfileProps) {
    return (
        <Flex align='center' >
            {showProfileData && (
                <Box mr='4' textAlign='right'>
                    <Text>Guilherme Martins</Text>
                    <Text
                        color='gray.300'
                        fontSize='small'
                    >
                        guilherme.m.zety@gmail.com
                    </Text>
                </Box>
            )}
            
            <Avatar size='md' name='Guilherme Martins' src='https://github.com/GuilhermeZety.png'/>
        </Flex>
    )
}