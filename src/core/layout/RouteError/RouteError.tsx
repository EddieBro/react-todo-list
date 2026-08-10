import {isRouteErrorResponse, useRouteError} from 'react-router-dom';

export const RouteError = () => {
  const error = useRouteError();
  const msg = isRouteErrorResponse(error) ? error.statusText : error instanceof Error ? error.message : 'Неизвестная ошибка';
  return <div><h1>Что-то пошло не так: {msg}</h1></div>
}
