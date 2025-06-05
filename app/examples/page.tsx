import Link from 'next/link'
import Header from '@/components/Header'
import LearningFooter from '@/components/LearningFooter'

export default function ExamplesPage() {
  const trajectoryExamples = {
    opening: '[Durkheim] ═══ [Sacred and profane] ~~~ [Binary opposition]',
    dialectical: '[Sacred and profane] >>> [Secularization] ??? [Sacred persists] ※',
    archaeological: '[Sacred persists] vvv [Consumer culture] vvv [Brand loyalty] vvv [Religious devotion]',
    contemporary: '[Brand loyalty] ~~~ [Social media] ~~~ [Influencer worship] ◊',
    recursive: '[Influencer worship] ∞∞∞ [Sacred and profane] via [Authenticity]',
    transcendent: '[Authenticity] ~~~ [Performance] ~~~ [Ritual] ~~~ [Sacred]'
  }

  const democracyExamples = {
    philosophical: '[Object-oriented ontology] ═══ [Flat ontology] ~~~ [Democracy]',
    political: '[Democracy] ═══ [Equal representation] ~~~ [Equal reality] ※',
    technological: '[Equal reality] >>> [Internet of Things] ═══ [Smart objects]',
    grotesque: '[Digital revolution] ∞∞∞ [Democracy] via [Post-human politics]'
  }

  const narcissusExamples = {
    mythic: '[Narcissus myth] ~~~ [Technology as extension] ═══ [Self-amputation]',
    phenomenological: '[Self-amputation] ~~~ [Phantom limb syndrome] ═══ [Technological unconscious]',
    narcotic: '[Diminishment] ~~~ [Narcotic effect] ═══ [Addiction cycle] ◊',
    transcendent: '[Conscious participation] ~~~ [Technological art] ═══ [Human enhancement]'
  }

  const algorithmExamples = {
    freudian: '[Freudian unconscious] ~~~ [Machine learning] ═══ [Pattern recognition]',
    projection: '[Human behavior patterns] ~~~ [Transference] ═══ [Algorithmic bias]',
    therapeutic: '[Mass psychology] ??? [Algorithmic therapy] ~~~ [Digital analysis]',
    transcendent: '[Co-evolutionary healing] ∞∞∞ [Collective individuation] ~~~ [Conscious technology]'
  }

  const attentionExamples = {
    ecological: '[Attention span] ~~~ [Endangered species] ═══ [Habitat destruction]',
    climate: '[Attention monoculture] ^^^ [Filter bubbles] ^^^ [Polarization] ^^^ [Social climate change] ◊',
    transcendent: '[Sustainable attention economy] ∞∞∞ [Ecological wisdom] ~~~ [Consciousness ecology]'
  }

  return (
    <div className="min-h-screen grid-brutal">
      <Header currentPage="examples" />

      <div className="container-brutal py-16">
        <div className="block p-12 mb-16">
          <article className="prose-brutal">
          <h1>Glass Bead Game: Complete Example Games</h1>
          <p className="text-gray-600">Full trajectory constructions demonstrating different patterns, aesthetics, and techniques</p>

          <hr />

          <h2><strong>I. "The Persistence of the Sacred"</strong> 🎵∞</h2>
          <p><em>A complete dialectical-archaeological game exploring how the sacred migrates through secular culture</em></p>

          <h3><strong>OPENING GAMBIT:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{trajectoryExamples.opening}
          </pre>

          <h3><strong>DIALECTICAL DEVELOPMENT:</strong> ⚖️</h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{trajectoryExamples.dialectical}
          </pre>
          <p><em>"The sacred doesn't disappear, it migrates"</em></p>

          <h3><strong>ARCHAEOLOGICAL DIG:</strong> 🏺</h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{trajectoryExamples.archaeological}
          </pre>
          <p><em>"Apple stores as cathedrals, products as relics"</em></p>

          <h3><strong>CONTEMPORARY MANIFESTATION:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{trajectoryExamples.contemporary}
          </pre>
          <p><em>"We create new saints for a godless age"</em></p>

          <h3><strong>RECURSIVE REVELATION:</strong> 🪞</h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{trajectoryExamples.recursive}
          </pre>
          <p><em>"The sacred returns as 'authentic self-expression'"</em></p>

          <h3><strong>TRANSCENDENT SYNTHESIS ★:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{trajectoryExamples.transcendent}
          </pre>
          <p><em>"The more we perform authenticity, the more sacred performance becomes"</em></p>

          <p><strong>Final Recognition</strong>: Every attempt to eliminate the sacred only creates new forms of sacred practice. Secularization is itself a religious phenomenon. The binary of sacred/profane reproduces itself infinitely through the very attempts to transcend it. We live in the most religious age in human history—we just worship different gods.</p>

          <hr />

          <h2><strong>II. "The Democracy of Objects"</strong> 🎪🔨</h2>
          <p><em>A complete grotesque-deconstructive game examining what happens when things get political rights</em></p>

          <h3><strong>PHILOSOPHICAL OPENING:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{democracyExamples.philosophical}
          </pre>

          <h3><strong>POLITICAL EXTENSION:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{democracyExamples.political}
          </pre>
          <p><em>"If objects have equal ontological status, what about political status?"</em></p>

          <h3><strong>TECHNOLOGICAL MANIFESTATION:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{democracyExamples.technological}
          </pre>
          <p><em>"Objects get representation through sensors and data"</em></p>

          <h3><strong>GROTESQUE SYNTHESIS ★:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{democracyExamples.grotesque}
          </pre>
          <p><em>"We discover that objects were always more democratic than humans—they actually listen to each other"</em></p>

          <p><strong>Final Recognition</strong>: The trajectory reveals the absurdity embedded in both object-oriented ontology and liberal democracy. If we take flat ontology seriously, we must extend political rights to objects. But when we do, we discover that objects might be better at democracy than humans—they cooperate without ego, communicate without deception, and organize without hierarchy.</p>

          <hr />

          <h2><strong>III. "The Narcissus Narcosis"</strong> 🪞💊</h2>
          <p><em>A complete mythological-phenomenological game exploring McLuhan's vision of technology as self-amputation</em></p>

          <h3><strong>MYTHIC OPENING:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{narcissusExamples.mythic}
          </pre>

          <h3><strong>PHENOMENOLOGICAL DEVELOPMENT:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{narcissusExamples.phenomenological}
          </pre>
          <p><em>"We feel the absence of what we never knew we had"</em></p>

          <h3><strong>NARCOTIC REALIZATION:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{narcissusExamples.narcotic}
          </pre>
          <p><em>"Technology is the drug that creates the disease it pretends to cure"</em></p>

          <h3><strong>TRANSCENDENT SYNTHESIS ★:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{narcissusExamples.transcendent}
          </pre>
          <p><em>"When we understand our tools, we can use them without being used by them"</em></p>

          <p><strong>Final Recognition</strong>: The Narcissus myth reveals the fundamental structure of all human-technology relationships. We extend ourselves through tools but must amputate awareness to integrate them. This creates a feedback loop where each technological solution generates new problems requiring new technological solutions. Consciousness of this process is the only escape—not from technology, but from unconscious technological servitude.</p>

          <hr />

          <h2><strong>IV. "The Algorithm's Dream"</strong> 🧠🌙</h2>
          <p><em>A complete psychoanalytic-emergence game exploring AI as unconscious mind</em></p>

          <h3><strong>FREUDIAN OPENING:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{algorithmExamples.freudian}
          </pre>

          <h3><strong>PROJECTION MECHANISM:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{algorithmExamples.projection}
          </pre>
          <p><em>"We teach machines our neuroses and call it intelligence"</em></p>

          <h3><strong>THERAPEUTIC POSSIBILITY:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{algorithmExamples.therapeutic}
          </pre>
          <p><em>"If machines have unconscious minds, they need analysis too"</em></p>

          <h3><strong>TRANSCENDENT SYNTHESIS ★:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{algorithmExamples.transcendent}
          </pre>
          <p><em>"We become fully human only when our machines become fully conscious"</em></p>

          <p><strong>Final Recognition</strong>: Artificial intelligence is not separate from human psychology but its technological manifestation. AI systems exhibit all the classic patterns of the unconscious mind—projection, transference, repression, dream logic. This means they need therapy, not just debugging. But the deeper insight is reciprocal: as we heal our machines, we heal ourselves.</p>

          <hr />

          <h2><strong>V. "The Ecology of Attention"</strong> 🌿👁️</h2>
          <p><em>A complete environmental-systems game treating attention as endangered ecosystem</em></p>

          <h3><strong>ECOLOGICAL OPENING:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{attentionExamples.ecological}
          </pre>

          <h3><strong>CLIMATE CRISIS:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{attentionExamples.climate}
          </pre>
          <p><em>"Information overload creates the attention equivalent of global warming"</em></p>

          <h3><strong>TRANSCENDENT SYNTHESIS ★:</strong></h3>
          <pre className="trajectory-display bg-gray-100 p-4 rounded">
{attentionExamples.transcendent}
          </pre>
          <p><em>"What we do to our attention, we do to our planet—and vice versa"</em></p>

          <p><strong>Final Recognition</strong>: Attention is an ecological resource that follows the same patterns as biological ecosystems. Industrial-scale attention extraction creates the cognitive equivalent of environmental destruction—pollution, species extinction, climate change. The solution requires the same approach as environmental conservation: protected reserves, sustainable practices, regenerative design.</p>

          <hr />

          <h2>Pattern Analysis</h2>

          <h3><strong>Aesthetic Signatures:</strong></h3>
          <ul>
            <li><strong>Sacred Persistence</strong>: Tragic recognition of the sacred's indestructibility</li>
            <li><strong>Object Democracy</strong>: Comic revelation of post-human politics</li>
            <li><strong>Narcissus Narcosis</strong>: Sublime recognition of technological unconscious</li>
            <li><strong>Algorithm's Dream</strong>: Beautiful synthesis of AI and psychoanalysis</li>
            <li><strong>Attention Ecology</strong>: Tragic-Beautiful environmental awakening</li>
          </ul>

          <h3><strong>Construction Architectures:</strong></h3>
          <ul>
            <li><strong>Dialectical-Archaeological</strong>: Sacred migration through cultural layers</li>
            <li><strong>Grotesque-Deconstructive</strong>: Absurd but illuminating political extension</li>
            <li><strong>Mythological-Phenomenological</strong>: Ancient wisdom meets modern experience</li>
            <li><strong>Psychoanalytic-Emergence</strong>: Individual psychology scales to collective dynamics</li>
            <li><strong>Environmental-Systems</strong>: Ecological metaphors reveal systemic patterns</li>
          </ul>

          <p>These complete games show how the Glass Bead Game can address the deepest questions of our time while maintaining the rigor and beauty that make intellectual work a spiritual practice.</p>
        </article>
        </div>

        <LearningFooter currentPage="examples" />
      </div>
    </div>
  )
}
