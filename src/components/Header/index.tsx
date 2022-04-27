import { Flex, Icon, Input, HStack, Text, Box, Avatar, useBreakpointValue, IconButton } from "@chakra-ui/react";
import { RiMenuLine, RiNotificationLine, RiSearchLine, RiUserAddLine } from "react-icons/ri";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { Logo } from "./Logo";
import { NotificationNav } from "./NotificationNav";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";

export function Header() {

    const { onOpen } = useSidebarDrawer();

    const isWideVersion = useBreakpointValue({
        base: false,
        lg: true
    })

    return (
        <Flex
          w='100%'
          maxW={1480}
          h='20'
          mx='auto'
          mt='4'
          px='6'
          align='center'
          as='header'
        >

            {! isWideVersion && (
                <IconButton 
                    aria-label="Open Navigation"
                    icon={<Icon as={RiMenuLine} />} 
                    fontSize='24'
                    variant='unstyled'
                    onClick={onOpen}
                    mr='2'
                    pt='2'
                >

                </IconButton>
            )}

            <Logo />

            {isWideVersion && <SearchBox />}

            <Flex align='center' ml='auto'>
                <NotificationNav />

                <Profile showProfileData={isWideVersion}/>
            </Flex>
        </Flex>
    )
}