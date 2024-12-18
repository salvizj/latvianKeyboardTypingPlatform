import { Navigate } from 'react-router-dom';
import { ReactNode } from 'react';
import translate from '../utils/translate';
import { useLanguage } from '../context/LanguageContext';
import useAuthStatus from '../hooks/useAuthStatus';

type ProtectedRouteProps = {
    children: ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { isSignedIn, loading } = useAuthStatus();
    const { language } = useLanguage();

    if (loading) {
        return (
            <div>
                {translate('loading', language)}
                {'...'}
            </div>
        );
    }

    if (!isSignedIn) {
        return <Navigate to="/sign-up" replace />;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
