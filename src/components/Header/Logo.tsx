import { Text, Link as ChakraLink } from "@chakra-ui/react";
import Link from "next/link";

export function Logo() {
    return (
        <Link href="/dashboard" passHref>
            <ChakraLink minW='0' 
                _hover={{
                    outline: 'none',
                    filter: 'brightness(0.8)',
                    transition: 'all 0.3s'
                }}
            >
                <Text
                    fontSize={['2xl', '3xl']}
                    fontWeight='bold'
                    letterSpacing='tight'
                    w='64' 
                >
                    dashgo
                    <Text
                        as='span'
                        ml='1'
                        color='pink.500'
                    >
                        .
                    </Text>
                </Text>
            </ChakraLink>
        </Link>
    )
}