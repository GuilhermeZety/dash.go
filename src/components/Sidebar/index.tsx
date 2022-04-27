import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay, useBreakpointValue } from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";

export function Sidebar() {

    const { isOpen, onClose } = useSidebarDrawer()


    const isDrawerSidebar = useBreakpointValue({
        base: true,
        lg: false,
    })

    if(isDrawerSidebar){
        return (
            <Drawer isOpen={isOpen} placement='left' onClose={onClose} >
                <DrawerOverlay h='100%' w='100%'>
                    <DrawerContent bg='gray.700' p='4' minH='100%'>
                        <DrawerCloseButton mt='6' />
                        <DrawerHeader>Navegação</DrawerHeader>

                        <DrawerBody>
                            <SidebarNav />
                        </DrawerBody>
                    </DrawerContent>
                </DrawerOverlay>
            </Drawer>
        )
    }

    return (
        <Box as='aside' w='64' mr='8'>            
            <SidebarNav />
        </Box>
    )
} 