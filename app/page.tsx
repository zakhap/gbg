import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen grid-brutal">
      <div className="container-brutal py-16">
        <header className="text-center mb-24">
          <h1 className="text-8xl mb-8 text-black tracking-tighter">
            GLASS BEAD GAME
          </h1>
          <div className="block bg-orange-600 text-white p-8 mx-auto max-w-4xl">
            <p className="text-xl font-bold uppercase tracking-wide">
              A practice of intellectual improvisation, treating knowledge as a living constellation 
              rather than a collection of facts.
            </p>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8 mb-24">
          <div className="block p-8">
            <h2 className="text-3xl mb-6">LEARN</h2>
            <p className="text-black mb-8 font-medium">
              Study the philosophy, practice techniques, and example trajectories 
              to deepen your understanding of this contemplative art.
            </p>
            <div className="space-y-4">
              <Link href="/guide" className="btn-secondary block text-center">
                CONSTRUCTION GUIDE
              </Link>
              <Link href="/practice" className="btn-secondary block text-center">
                PRACTICE METHODS
              </Link>
              <Link href="/examples" className="btn-secondary block text-center">
                EXAMPLE GAMES
              </Link>
            </div>
          </div>

          <div className="block p-8">
            <h2 className="text-3xl mb-6">PLAY THE GAME</h2>
            <p className="text-black mb-8 font-medium">
              Begin a new contemplative session. Collaborate with the Magister Ludi to construct 
              trajectories of meaning and discover hidden connections between concepts.
            </p>
            <Link href="/play" className="btn-primary">
              START PLAYING
            </Link>
          </div>

          <div className="block p-8">
            <h2 className="text-3xl mb-6">GALLERY</h2>
            <p className="text-black mb-8 font-medium">
              Explore completed trajectories created by other contemplative practitioners. 
              Each game reveals unique patterns of thinking and synthesis.
            </p>
            <Link href="/gallery" className="btn-accent">
              VIEW GALLERY
            </Link>
          </div>
        </div>

        <div className="symbol-key mb-24">
          <h3 className="text-5xl mb-8 text-center text-black">THE SYMBOLIC LANGUAGE</h3>
          <div className="text-center mb-16">
            <Link href="/guide" className="btn-accent">
              LEARN THE COMPLETE RULES
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <h4 className="font-bold text-xl mb-8 text-black border-b-4 border-orange-600 pb-2">STRUCTURAL CONNECTIONS</h4>
              <div className="space-y-6">
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-structural">═══</span>
                  <span className="symbol-key-label">LOGICAL NECESSITY</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-structural">───</span>
                  <span className="symbol-key-label">LOGICAL DEPENDENCY</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-structural">&gt;&gt;&gt;</span>
                  <span className="symbol-key-label">TEMPORAL SEQUENCE</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-structural">^^^</span>
                  <span className="symbol-key-label">EMERGENCE</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-structural">vvv</span>
                  <span className="symbol-key-label">REDUCTION</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-8 text-black border-b-4 border-orange-600 pb-2">AESTHETIC CONNECTIONS</h4>
              <div className="space-y-6">
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-aesthetic">~~~</span>
                  <span className="symbol-key-label">METAPHORICAL RESONANCE</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-aesthetic">◊◊◊</span>
                  <span className="symbol-key-label">IRONIC REFLECTION</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-aesthetic">∞∞∞</span>
                  <span className="symbol-key-label">RECURSIVE RELATIONSHIP</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-aesthetic">???</span>
                  <span className="symbol-key-label">PRODUCTIVE TENSION</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-aesthetic">!!!</span>
                  <span className="symbol-key-label">REVELATORY LEAP</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold text-xl mb-8 text-black border-b-4 border-orange-600 pb-2">SYNTHESIS POINTS</h4>
              <div className="space-y-6">
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-synthesis">※</span>
                  <span className="symbol-key-label">MINOR SYNTHESIS</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-synthesis">◊</span>
                  <span className="symbol-key-label">MAJOR SYNTHESIS</span>
                </div>
                <div className="symbol-key-item">
                  <span className="symbol-key-symbol symbol-synthesis">★</span>
                  <span className="symbol-key-label">TRANSCENDENT SYNTHESIS</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-24">
          <div className="text-center mb-8">
            <h4 className="text-2xl font-bold text-black">EXAMPLE TRAJECTORY</h4>
          </div>
          
          <div className="block p-6 max-w-4xl mx-auto">
            <div className="bg-white border-4 border-black mb-6">
              <div className="bg-neutral-200 px-6 py-4 border-b-4 border-black">
                <h5 className="font-bold text-lg uppercase">Current Trajectory</h5>
              </div>
              <div className="p-6">
                <div className="font-mono text-lg leading-relaxed">
                  <span className="font-bold">[TECHNOLOGY]</span><span className="text-orange-600 text-sm align-super">1</span>{' '}
                  <span className="text-purple-700 font-bold">~~~</span>{' '}
                  <span className="font-bold">[HUMAN NATURE]</span><span className="text-orange-600 text-sm align-super">2</span>{' '}
                  <span className="text-blue-700 font-bold">═══</span>{' '}
                  <span className="font-bold">[CYBORG]</span><span className="text-orange-600 text-sm align-super">3</span>{' '}
                  <span className="text-orange-600 font-bold">※</span>
                </div>
              </div>
            </div>
            
            <div className="bg-neutral-50 border-4 border-black">
              <div className="bg-neutral-200 px-6 py-3 border-b-2 border-neutral-200">
                <h5 className="font-bold text-sm uppercase">Commentary</h5>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-orange-600 font-bold flex-shrink-0 font-mono">1.</span>
                  <span>Technology: The application of scientific knowledge for practical purposes</span>
                </div>
                <div className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-orange-600 font-bold flex-shrink-0 font-mono">2.</span>
                  <span>Human Nature: Our essential characteristics and ways of being</span>
                </div>
                <div className="flex gap-3 text-sm leading-relaxed">
                  <span className="text-orange-600 font-bold flex-shrink-0 font-mono">3.</span>
                  <span>Cyborg: The hybrid entity emerging from human-tech integration</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-8 max-w-4xl mx-auto">
            <div className="block-accent p-6 text-center">
              <p className="text-white font-medium uppercase tracking-wide leading-relaxed">
                This demonstrates the symbolic notation with numbered concept references and explanatory commentary.
              </p>
            </div>
          </div>
        </div>

        <div className="block-dark p-12 text-center">
          <h3 className="text-4xl mb-8 text-white">ABOUT THE PRACTICE</h3>
          <div className="max-w-4xl mx-auto">
            <p className="text-white text-lg font-medium mb-6">
              THE GLASS BEAD GAME IS A CONTEMPLATIVE PRACTICE THAT TRANSFORMS THINKING INTO ART. 
              THROUGH SYMBOLIC NOTATION AND CAREFUL ATTENTION TO CONCEPTUAL RELATIONSHIPS, 
              PRACTITIONERS CONSTRUCT TRAJECTORIES THAT REVEAL THE HIDDEN HARMONIES CONNECTING ALL KNOWLEDGE.
            </p>
            <p className="text-white text-lg font-medium">
              EACH SESSION IS A FORM OF INTELLECTUAL IMPROVISATION—A DANCE BETWEEN LOGICAL PRECISION 
              AND INTUITIVE WISDOM THAT AWAKENS NEW PATTERNS OF UNDERSTANDING.
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
