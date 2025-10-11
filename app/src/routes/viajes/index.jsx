import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/viajes/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/viajes/"!</div>
}
