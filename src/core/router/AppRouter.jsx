import {Routes, Route, Navigate, useLocation} from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { useAuth } from '@presentation/contexts/AuthContext';

// Layouts
import DashboardLayout from '@presentation/layouts/DashboardLayout';
import AuthLayout from '@presentation/layouts/AuthLayout';
import {AnimatePresence} from "framer-motion";
import SensorList from "@presentation/pages/SensorList.jsx";

// Lazy-loaded pages
const LandingPage = lazy(() => import('@presentation/pages/LandingPage'));
const Dashboard = lazy(() => import('@presentation/pages/Dashboard'));
const SensorDetail = lazy(() => import('@presentation/pages/SensorDetail'));
const Settings = lazy(() => import('@presentation/pages/Settings'));
const Statistics = lazy(() => import('@presentation/pages/Statistics'));
const Login = lazy(() => import('@presentation/pages/auth/Login'));
const Register = lazy(() => import('@presentation/pages/auth/Register'));

// Loading fallback
const LoadingFallback = () => (
    <Center height="100vh">
        <VStack spacing={4}>
            <Spinner size="xl" color="brand.500" thickness="4px" />
            <Text>Cargando...</Text>
        </VStack>
    </Center>
);

// Route guard para rutas protegidas
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const AppRouter = () => {
    const location = useLocation();

    return (
        <Suspense fallback={<LoadingFallback />}>
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    {/* Landing Page */}
                    <Route path="/" element={<LandingPage />} />

                    {/* Rutas de autenticación */}
                    <Route path="/" element={<AuthLayout />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>

                    {/* Rutas protegidas del dashboard */}
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            <DashboardLayout />
                        </ProtectedRoute>
                    }>
                        <Route index element={<Dashboard />} />
                        <Route path="sensors" element={<SensorList />} />
                        <Route path="sensors/:id" element={<SensorDetail />} />
                        <Route path="statistics" element={<Statistics />} />
                        <Route path="settings" element={<Settings />} />
                    </Route>

                    {/* Redirección por defecto */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </AnimatePresence>
        </Suspense>
    );
};
export default AppRouter;