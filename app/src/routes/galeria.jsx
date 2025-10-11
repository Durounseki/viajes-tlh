import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/galeria')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/galeria"!</div>
}
