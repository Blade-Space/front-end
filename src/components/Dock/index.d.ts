export interface DockApplication {
  icon: string
  name: string
  id: string
}

export interface DockProps {
  launched: DockApplication[]
}