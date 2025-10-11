import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/viajes/pasados')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/viajes/pasados"!</div>
}
