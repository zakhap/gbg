import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-800">
            Glass Bead Game
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            A practice of intellectual improvisation, treating knowledge as a living constellation 
            rather than a collection of facts.
          </p>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Play the Game</h2>
            <p className="text-gray-600 mb-6">
              Begin a new contemplative session. Collaborate with an AI partner to construct 
              trajectories of meaning and discover hidden connections between concepts.
            </p>
            <Link 
              href="/play"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Playing
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
            <p className="text-gray-600 mb-6">
              Explore completed trajectories created by other contemplative practitioners. 
              Each game reveals unique patterns of thinking and synthesis.
            </p>
            <Link 
              href="/gallery"
              className="inline-block bg-purple-600 text-white px-6 py-3 rounded-md hover:bg-purple-700 transition-colors"
            >
              View Gallery
            </Link>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-semibold mb-4">Learn</h2>
            <p className="text-gray-600 mb-6">
              Study the philosophy, practice techniques, and example trajectories 
              to deepen your understanding of this contemplative art.
            </p>
            <div className="space-y-2">
              <Link 
                href="/guide"
                className="block text-blue-600 hover:text-blue-800 text-sm"
              >
                → Construction Guide
              </Link>
              <Link 
                href="/practice"
                className="block text-blue-600 hover:text-blue-800 text-sm"
              >
                → Practice Methods
              </Link>
              <Link 
                href="/examples"
                className="block text-blue-600 hover:text-blue-800 text-sm"
              >
                → Example Games
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h3 className="text-2xl font-semibold mb-6">Symbolic Language</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Structural Connections</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-mono text-blue-600">═══</span> Logical necessity</div>
                <div><span className="font-mono text-blue-600">───</span> Logical dependency</div>
                <div><span className="font-mono text-blue-600">&gt;&gt;&gt;</span> Temporal sequence</div>
                <div><span className="font-mono text-blue-600">^^^</span> Emergence</div>
                <div><span className="font-mono text-blue-600">vvv</span> Reduction</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Aesthetic Connections</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-mono text-purple-600">~~~</span> Metaphorical resonance</div>
                <div><span className="font-mono text-purple-600">◊◊◊</span> Ironic reflection</div>
                <div><span className="font-mono text-purple-600">∞∞∞</span> Recursive relationship</div>
                <div><span className="font-mono text-purple-600">???</span> Productive tension</div>
                <div><span className="font-mono text-purple-600">!!!</span> Revelatory leap</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-lg mb-4 text-gray-800">Synthesis Points</h4>
              <div className="space-y-2 text-sm">
                <div><span className="font-mono text-green-600">※</span> Minor synthesis</div>
                <div><span className="font-mono text-green-600">◊</span> Major synthesis</div>
                <div><span className="font-mono text-green-600">★</span> Transcendent synthesis</div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Example Trajectory:</h4>
            <div className="font-mono text-sm">
              [Technology]1 ~~~ [Human Nature]2 ═══ [Cyborg]3 ※
            </div>
            <p className="text-sm text-gray-600 mt-2">
              Numbers correspond to explanatory footnotes that provide context for each concept.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-4">About the Practice</h3>
          <div className="prose text-gray-600">
            <p>
              The Glass Bead Game is a contemplative practice that transforms thinking into art. 
              Through symbolic notation and careful attention to conceptual relationships, 
              practitioners construct trajectories that reveal the hidden harmonies connecting all knowledge.
            </p>
            <p className="mt-4">
              Each session is a form of intellectual improvisation—a dance between logical precision 
              and intuitive wisdom that awakens new patterns of understanding.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
