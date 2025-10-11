import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/viajes/$viajeId')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/viajes/$viajeId"!</div>
}
