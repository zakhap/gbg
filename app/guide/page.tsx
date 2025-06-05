import Link from 'next/link'
import Header from '@/components/Header'
import LearningFooter from '@/components/LearningFooter'

export default function GuidePage() {
  return (
    <div className="min-h-screen grid-brutal">
      <Header currentPage="guide" />

      <div className="container-brutal py-16">
        <div className="block p-12 mb-16">
          <article className="prose-brutal">
          <h1>Construction Guide & Philosophy</h1>

          <h2>Core Construction Principles</h2>

          <h3>The Trajectory as Architecture</h3>

          <p>Each trajectory is a <strong>conceptual building</strong> with its own structural integrity. Like architecture, it must be both <strong>functional</strong> through logical soundness and <strong>beautiful</strong> through aesthetic satisfaction. The connections are load-bearing elements where each one must support the weight of the overall argument while contributing to its elegance.</p>

          <h3>Connection Types & Their Functions</h3>

          <h4><strong>Structural Connections</strong> (the load-bearing framework)</h4>
          <ul>
            <li><strong>═══</strong> <strong>Logical necessity</strong>: A directly implies B, no interpretation needed</li>
            <li><strong>───</strong> <strong>Logical dependency</strong>: A requires B for full understanding</li>
            <li><strong>&gt;&gt;&gt;</strong> <strong>Temporal sequence</strong>: A historically precedes B</li>
            <li><strong>^^^</strong> <strong>Emergence</strong>: B arises from A through complexity</li>
            <li><strong>vvv</strong> <strong>Reduction</strong>: A can be understood as a special case of B</li>
          </ul>

          <h4><strong>Aesthetic Connections</strong> (the beauty and meaning)</h4>
          <ul>
            <li><strong>~~~</strong> <strong>Metaphorical resonance</strong>: A and B share structural patterns</li>
            <li><strong>◊◊◊</strong> <strong>Ironic reflection</strong>: A and B mirror each other in surprising ways</li>
            <li><strong>∞∞∞</strong> <strong>Recursive relationship</strong>: A contains B which contains A</li>
            <li><strong>???</strong> <strong>Productive tension</strong>: A and B contradict in illuminating ways</li>
            <li><strong>!!!</strong> <strong>Revelatory leap</strong>: Connection that transforms understanding</li>
          </ul>

          <h4><strong>Synthesis Points</strong> (where new insights crystallize)</h4>
          <ul>
            <li><strong>※</strong> <strong>Minor synthesis</strong>: Small insight that advances the trajectory</li>
            <li><strong>◊</strong> <strong>Major synthesis</strong>: Significant new understanding emerges</li>
            <li><strong>★</strong> <strong>Transcendent synthesis</strong>: Insight that opens entirely new questions</li>
          </ul>

          <h2>Construction Rules</h2>

          <h3><strong>Rule 1: The Necessity Constraint</strong></h3>
          <p>Every connection must be <strong>necessary for the trajectory's logic</strong>. If you can remove a connection without damaging the overall argument or aesthetic, it should be removed. Each step must earn its place.</p>

          <h3><strong>Rule 2: The Surprise Imperative</strong></h3>
          <p>At least one connection in every trajectory must <strong>surprise even you</strong>. If you can predict the entire path before constructing it, you are following conventional wisdom rather than discovering new patterns.</p>

          <h3><strong>Rule 3: The Synthesis Obligation</strong></h3>
          <p>Every complete trajectory must generate <strong>at least one insight that exists nowhere in the source material</strong>. The trajectory fails if it only makes explicit what was already implicit in individual concepts.</p>

          <h3><strong>Rule 4: The Aesthetic Coherence Principle</strong></h3>
          <p>The trajectory must have <strong>internal aesthetic logic</strong> through a consistent style or mood that unifies the whole construction. You can build tragic trajectories, comic trajectories, sublime trajectories. Chaotic mixtures create confusion rather than beauty.</p>

          <h3><strong>Rule 5: The Interpretive Responsibility Rule</strong></h3>
          <p>Every connection must be <strong>explicable upon request</strong>. You need to provide explanations in the construction itself. You must be able to justify every move if challenged.</p>

          <h2>Construction Philosophy</h2>

          <h3><strong>The Contemplative Approach</strong></h3>
          <p>The Glass Bead Game is about <strong>seeing more clearly</strong>. Each trajectory is a form of <strong>meditation on relationships</strong>, a way of <strong>contemplating the deep structures</strong> that connect all knowledge.</p>

          <h3><strong>The Aesthetic Dimension</strong></h3>
          <p>Beauty in trajectory construction comes from <strong>elegance</strong> through achieving maximum insight with minimum moves, <strong>surprise</strong> through discovering unexpected yet meaningful connections, and <strong>coherence</strong> through maintaining logical and aesthetic unity throughout.</p>

          <h3><strong>The Personal Practice</strong></h3>
          <p>Over time, trajectory construction reveals your own <strong>cognitive signature</strong>. These are the patterns of how your mind naturally moves through conceptual space. The game becomes a form of <strong>intellectual autobiography</strong> and <strong>contemplative self-knowledge</strong>.</p>

          <p>The goal is not to master the game but to let the game <strong>transform your relationship to knowledge itself</strong>—from possession to participation, from consumption to creation, from analysis to synthesis.</p>
        </article>
        </div>

        <LearningFooter currentPage="guide" />
      </div>
    </div>
  )
}
