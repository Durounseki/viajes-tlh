import { Link } from "@tanstack/react-router";

function NotFound() {
  return (
    <main>
      <h1>404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default NotFound;
