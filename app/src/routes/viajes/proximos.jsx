import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/viajes/proximos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/viajes/proximos"!</div>
}
