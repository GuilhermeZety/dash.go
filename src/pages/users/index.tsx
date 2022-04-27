import { useState } from "react";

import Link from 'next/link'
import Head from "next/head";

import { Box, Button, Checkbox,Link as ChakraLink,
    Flex, Heading, Icon, Table, Tbody, Td, Th,
    Thead, Tr, Text, useBreakpointValue, Spinner } from "@chakra-ui/react";
    
import { getUsers, User, useUsers } from "../../services/hooks/useUsers";

import { RiAddLine, RiPencilLine } from "react-icons/ri";

import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";



async function handlePrefetchUser(userId: string){
    await queryClient.prefetchQuery(['user', userId], async () => {
        const response = await api.get(`users/${userId}`)

        const user: User = response.data.user

        return user
    },
    {
        staleTime: 1000 * 60 * 10 //10 min
    })
}

export default function UserList(){
    const [page, setPage] = useState(1)

    const { data, isLoading, isFetching, error } = useUsers(page);

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })
    
    return(
        <Box>
            <Head>
                <title>Usuários | dashgo</title>
            </Head>
            
            <Header />

            <Flex w='100%' my='6' maxW={1480} mx='auto' px={['4', '4','6']}>
                <Sidebar />
                
                <Box flex='1' borderRadius={8} bg='gray.800' p='8'>
                    <Flex mb='8' justify='space-between' align='center'>
                        <Heading size='lg' fontWeight='normal'>
                            Usuários
                            {!isLoading && isFetching && 
                                <Spinner size='sm' ml='3' color="gray.500"/>
                            }
                        </Heading>
                    
                        <Link href="/users/create" passHref>
                            <Button 
                                as='a' 
                                size='sm' 
                                fontSize='sm' 
                                colorScheme='pink'
                                leftIcon={<Icon as={RiAddLine} fontSize='19'/>}
                            >
                                Criar novo usuário
                            </Button>
                        </Link>
                    </Flex>
                
                { isLoading ? (
                    <Flex justify='center' align='center' height='65%'>
                        <Spinner size='xl'/>
                    </Flex>
                ) : error ? (
                    <Flex justify='center' align='center' height='65%'>
                        <Text>Falha ao obter usuários</Text>
                    </Flex>
                ): (
                    <>                  
                        <Table colorScheme='whiteAlpha' >
                            <Thead>
                                <Tr>
                                    <Th px={['4', '4','6']} color='gray.300' width='8'>
                                        <Checkbox colorScheme='pink'></Checkbox>
                                    </Th>
                                    <Th>Usuário</Th>
                                    { isWideVersion && <Th>Data de Cadastro</Th>}
                                    { isWideVersion && <Th w='8'></Th>}
                                    
                                </Tr>
                            </Thead>
                            <Tbody>
                                {data.users.map(user => {
                                    return (
                                        <Tr key={user.id}>
                                            <Td px={['4', '4','6']}>
                                                <Checkbox colorScheme='pink'></Checkbox>
                                            </Td>
                                            <Td>
                                                <Box>
                                                    <ChakraLink color='purple.400' onMouseEnter={() => handlePrefetchUser(user.id)}>
                                                        <Text fontWeight='bold'>{user.name}</Text>
                                                    </ChakraLink>

                                                    <Text fontSize='sm' color='gray.400'>{user.email}</Text>
                                                </Box>
                                            </Td>
                                            { isWideVersion && 
                                                <>
                                                    <Td>{user.created_at}</Td>
                                                </>
                                            }
                                            <Td>
                                                <Button    
                                                    as='a' 
                                                    size='sm' 
                                                    fontSize='sm' 
                                                    colorScheme='purple'
                                                    leftIcon={<Icon mr='-2' as={RiPencilLine} />}
                                                >
                                                </Button>
                                            </Td>
                                        </Tr>
                                    )
                                })}
                            </Tbody>
                        </Table>
                        <Pagination 
                            totalCountOfRegisters={data.totalCount}
                            currentPage={page}
                            onPageChange={setPage}
                        />
                    </>                
                )}

                </Box>
            </Flex>
        </Box>
    )
}