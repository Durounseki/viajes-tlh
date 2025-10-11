import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/creditos')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/creditos"!</div>
}
