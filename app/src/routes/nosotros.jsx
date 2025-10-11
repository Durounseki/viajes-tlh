import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/nosotros')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/nosotros"!</div>
}
