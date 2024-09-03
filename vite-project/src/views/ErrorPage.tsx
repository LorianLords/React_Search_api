import React from "react";
import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();
  const error = useRouteError() as Error;
  console.error(error);

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  return (
    <div className="error-page">
      <h1>Oops! Error 404</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
      <button onClick={() => navigate(-1)}>&larr; Go back</button>
    </div>
  );
};
export default ErrorPage;
