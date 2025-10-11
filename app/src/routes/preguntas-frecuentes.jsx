import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/preguntas-frecuentes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/preguntas-frecuentes"!</div>
}
