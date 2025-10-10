import { Link } from "@tanstack/react-router";

function GeneralError({ error }) {
  return (
    <main>
      <h1>¡Ups! Algo salió mal.</h1>
      <p>Ocurrió un error inesperado.</p>
      <pre>
        <code>
          {error instanceof Error
            ? error.message
            : JSON.stringify(error, null, 2)}
        </code>
      </pre>
      <Link to="/">Volver al inicio</Link>
    </main>
  );
}

export default GeneralError;
