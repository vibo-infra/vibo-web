import { useLocation } from 'react-router-dom';
import { shouldShowNavbar } from '../config/navbar.config';

/**
 * Custom hook to determine if the bottom navbar should be displayed
 * based on the current route
 */
export const useShouldShowNavbar = (): boolean => {
  const location = useLocation();
  return shouldShowNavbar(location.pathname);
};
