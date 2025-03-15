import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import {
    Box,
    Flex,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    useBreakpointValue,
} from '@chakra-ui/react';

// Componentes de layout
import Header from '../components/common/Header';
import Sidebar from '../components/common/Sidebar';

const DashboardLayout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isDesktop = useBreakpointValue({ base: false, lg: true });

    return (
        <Flex h="100vh" flexDirection="column">
            {/* Header */}
            <Header onMenuOpen={onOpen} />

            <Flex flex="1" overflow="hidden">
                {/* Sidebar para escritorio */}
                {isDesktop ? (
                    <Box
                        w="250px"
                        bg="background.secondary"
                        h="100%"
                        transition="0.3s ease"
                        borderRight="1px solid"
                        borderColor="rgba(0, 0, 0, 0.08)"
                        display={{ base: 'none', lg: 'block' }}
                    >
                        <Sidebar />
                    </Box>
                ) : null}

                {/* Drawer para móvil */}
                <Drawer
                    isOpen={isOpen}
                    placement="left"
                    onClose={onClose}
                    returnFocusOnClose={false}
                >
                    <DrawerOverlay />
                    <DrawerContent maxW="250px">
                        <DrawerCloseButton />
                        <DrawerHeader borderBottomWidth="1px" borderColor="rgba(0, 0, 0, 0.08)">
                            Free Garden
                        </DrawerHeader>
                        <DrawerBody p={0}>
                            <Sidebar onClose={onClose} />
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>

                {/* Contenido principal */}
                <Box
                    flex="1"
                    p={4}
                    bg="background.primary"
                    overflowY="auto"
                >
                    <Outlet />
                </Box>
            </Flex>
        </Flex>
    );
};

export default DashboardLayout;