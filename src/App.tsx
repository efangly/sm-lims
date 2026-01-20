import { Canvas } from '@react-three/fiber'
import { Room } from './components/Room'
import { CameraController } from './components/CameraController'
import { useFocusStore } from './store/focus.store'

function ShelfNavigator() {
  const cabinetFocus = useFocusStore((s) => s.cabinetFocus)
  const nextShelf = useFocusStore((s) => s.nextShelf)
  const prevShelf = useFocusStore((s) => s.prevShelf)
  const setCabinetFocus = useFocusStore((s) => s.setCabinetFocus)

  if (!cabinetFocus) return null

  const { currentShelf, shelfPositions, cabinetId } = cabinetFocus
  const totalShelves = shelfPositions.length
  const cabinetNumber = cabinetId.split('-')[1]

  return (
    <div className="absolute top-4 right-4 md:top-1/2 md:right-6 z-20">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-3 md:p-4 shadow-2xl border border-white/20 min-w-40 md:min-w-50">
        <div className="flex items-center justify-between mb-2 md:mb-3">
          <h3 className="text-white font-semibold text-xs md:text-sm">Cabinet {cabinetNumber}</h3>
          <button
            onClick={() => setCabinetFocus(null)}
            className="text-white/60 hover:text-white transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="text-center mb-2 md:mb-3">
          <span className="text-white/80 text-xs">Shelf</span>
          <div className="text-white text-xl md:text-2xl font-bold">
            {currentShelf + 1} <span className="text-white/40 text-base md:text-lg">/ {totalShelves}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={prevShelf}
            disabled={currentShelf === 0}
            className="flex-1 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed text-white py-1.5 px-2 md:py-2 md:px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-xs md:text-sm">Up</span>
          </button>
          <button
            onClick={nextShelf}
            disabled={currentShelf === totalShelves - 1}
            className="flex-1 bg-white/10 hover:bg-white/20 disabled:bg-white/5 disabled:cursor-not-allowed text-white py-1.5 px-2 md:py-2 md:px-3 rounded-lg transition-colors flex items-center justify-center gap-1"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 md:h-4 md:w-4 rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            <span className="text-xs md:text-sm">Down</span>
          </button>
        </div>

        {/* Shelf indicators */}
        <div className="flex justify-center gap-1.5 mt-2 md:mt-3">
          {Array.from({ length: totalShelves }).map((_, i) => (
            <button
              key={i}
              onClick={() => useFocusStore.getState().setCurrentShelf(i)}
              className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all ${
                i === currentShelf 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const focus = useFocusStore((s) => s.focus)

  return (
    <div className="w-screen h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Header */}
      <nav className="sticky top-0 left-0 right-0 z-10 p-3 md:p-6">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-lg md:text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Laboratory Information Management System
            </h1>
            <p className="text-white/60 text-xs md:text-sm mt-1">Demo 3D Model Visualization</p>
          </div>
        </div>
      </nav>

      <Canvas camera={{ position: [6, 6, 12], fov: 50 }}>
        {/* Ambient light for base illumination */}
        <ambientLight intensity={0.5} />
        
        {/* Main directional light with shadows */}
        <directionalLight
          position={[5, 10, 5]}
          intensity={0.5}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill light from the opposite side */}
        <directionalLight position={[-5, 5, 5]} intensity={0.4} />
        
        {/* Point light for subtle highlights */}
        <pointLight position={[0, 5, 0]} intensity={0.3} />
        
        <CameraController focus={focus} />
        <Room />
      </Canvas>

      {/* Shelf Navigator */}
      <ShelfNavigator />

      {/* Decorative elements */}
      <div className="absolute top-10 left-4 md:top-20 md:left-10 w-20 h-20 md:w-32 md:h-32 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-4 md:bottom-20 md:right-10 w-24 h-24 md:w-40 md:h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>
    </div>
  )
}
