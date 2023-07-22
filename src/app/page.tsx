import Image from 'next/image'
// import Wormhole from './Wormhole'
import GalaxyCanvans, { Controller } from './Galaxy'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <GalaxyCanvans />
    </main>
  )
}
