import React, {useEffect} from "react";
import { styled } from "styled-components";
import Spinner from "./Spinner";
import { useUser } from "../features/authentication/useUser";
import { useNavigate } from "react-router-dom";

function ProtectedRouteContainer({ children }) {

  const FullPage = styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    align-items: center;
    justify-content: center;
`
  const navigate = useNavigate();

  // Load the authenticated user
  const { isAuthenticated, isLoading } = useUser();

  // If there is no authenticated user redirect to login
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate('/login');
  }, [isAuthenticated, isLoading, navigate])
  
  // Show a Spinner while loading
  if (isLoading) return <FullPage> <Spinner /> </FullPage>

  // If there is a user render the app
  if(isAuthenticated) return children;
}

export default ProtectedRouteContainer;