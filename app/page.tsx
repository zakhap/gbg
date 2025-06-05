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
              Begin a new contemplative session. Collaborate with an AI partner to construct 
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
          
          <div className="mt-16 block p-8">
            <h4 className="font-bold mb-6 text-black text-xl">EXAMPLE TRAJECTORY</h4>
            <div className="trajectory-display mb-6">
[TECHNOLOGY]<span className="trajectory-number">1</span> ~~~ [HUMAN NATURE]<span className="trajectory-number">2</span> ═══ [CYBORG]<span className="trajectory-number">3</span> ※
            </div>
            <p className="text-black font-medium uppercase tracking-wide">
              Numbers correspond to explanatory footnotes that provide context for each concept.
            </p>
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
