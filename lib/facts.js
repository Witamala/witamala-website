// Single source of truth for institutional facts, offerings, posts and trust statements.
// No fact is typed twice: pages import from here.
export const F = {
      nav: [
        {label:'AI Innovation', slug:'ai-innovation'},
        {label:'Partnerships', slug:'partnerships'},
        {label:'Public Policy', slug:'public-policy'},
        {label:'Blog', slug:'blog'},
        {label:'About', slug:'about'}
      ],
      domains: [
        {slug:'ai-innovation', num:'01', name:'AI Innovation', bridge:'Digital transformation for the age of AI',
         intro:'The core practice. Witamala is an AI innovation company; it delivers AI Innovation through the practical application of AI to problems, products, capabilities and organizations.',
         offerings:[
          {name:'Problem Solving', def:'Apply AI and innovation methods to a defined challenge — including making consequential strategic choices visible and operable.', receive:'A challenge worked to a usable resolution: the analysis, the options with their consequences stated, and the decision made operable.', relates:'The entry point. Innovation Capability Building makes the resolution repeatable; Product Development ships it; AI Transformation rewires the organization around it.'},
          {name:'Innovation Capability Building', def:'Develop the people, systems and routines required to innovate with AI.', receive:'People who can run the method without us: trained teams, working routines, and the systems they practice on.', relates:'What makes Problem Solving stick. Every other offering draws on it — capability is what remains when the engagement ends.'},
          {name:'Product Development', def:'Create products in which AI performs a meaningful function.', receive:'A product in operation — scoped, built and handed over with its architecture and reasoning documented.', relates:'Where resolved problems become artifacts. Venture Building uses it when a product needs a company around it.'},
          {name:'AI Transformation', def:'Redesign how an organization operates around AI.', receive:'An organization that runs differently: redesigned workflows, governance for AI in operation, and internal owners named.', relates:'The widest scope. It usually begins as Problem Solving and draws on Capability Building throughout.'}
         ]},
        {slug:'partnerships', num:'02', name:'Partnerships', bridge:'Built with, not for',
         intro:'Work Witamala does alongside others — ventures, ecosystems and communities across the Bangkok–Florianópolis axis.',
         offerings:[
          {name:'Venture Building', def:'Build new AI-native ventures with partners, from thesis to operating company.', receive:'A venture taken from hypothesis to operation, with Witamala building beside you rather than advising from outside.', relates:'Runs on Product Development. The ventures it produces feed the Ecosystem.'},
          {name:'Ecosystem', def:'Connect organizations, builders and institutions into working relationships across Southeast Asia and Brazil.', receive:'Introductions that become working relationships: partners, pilots, and routes between the two regions.', relates:'The connective tissue — ventures, communities and policy work all move through it.'},
          {name:'Communities of Practice', def:'Convene practitioners who build AI capability together, across organizations.', receive:'A maintained community: a cadence, a curriculum, and shared artifacts that outlive any single meeting.', relates:'Innovation Capability Building, socialized — what one organization learns, the community keeps.'}
         ]},
        {slug:'public-policy', num:'03', name:'Public Policy', bridge:'AI in the public interest',
         intro:'Work for governments, multilateral bodies and institutions responsible for how AI arrives in public life.',
         note:'Two offerings, deliberately. Public Policy publishes no evidence yet; when it does, every claim will carry a date, a method, a source and its uncertainty — the same standard as everything else on this site.',
         offerings:[
          {name:'Applied Research & Assessment', def:'Study AI questions in the public interest and assess what is actually happening on the ground.', receive:'An assessment that states its method, sources, uncertainty and limitations — usable in institutional decision-making.', relates:'The evidence base that Policy & Strategy Design builds on.'},
          {name:'Policy & Strategy Design', def:'Design policy and strategy instruments for institutions adopting or governing AI.', receive:'An instrument ready for decision: the policy or strategy, its reasoning, and the implementation path.', relates:'Turns assessment into direction. Often paired with Innovation Capability Building inside the institution.'}
         ]}
      ],
      posts: [
        {slug:'contact-draft', placeholder:false, title:'A contact flow that keeps the visitor\'s draft',
         date:'2026-08-18', loc:'Bangkok', author:'Rafael Torquato Cruz', org:'Witamala — this website', role:'Founder & CEO; designed and specified the system',
         challenge:'First conversations die in generic contact forms: drafts vanish on failure, states are opaque, and nothing says what happens to the data.',
         offering:'Product Development', domainName:'AI Innovation', domainSlug:'ai-innovation',
         method:'Staged interaction states (acknowledged → validating → working → confirmed → inscribed → settled); device-local draft persistence; privacy boundaries stated at the moment they apply.',
         output:'The contact system now running on this site.', status:'In operation, v1.',
         source:'This website — the Contact route is the artifact.',
         measured:'Not yet measured. Stage-completion instrumentation is specified; no visitor data exists.',
         uncertainty:'A single implementation with no traffic. Claims are limited to design intent and behavior you can observe yourself.',
         attribution:'witamala', permission:'Fully disclosable — Witamala\'s own work on its own property.', updated:'2026-08-25',
         body:[
          {t:'Most contact forms treat the visitor\'s text as worthless until the moment it is submitted — then punish any failure by destroying it. This site takes the opposite position: the draft is the most valuable object in the interaction, so it is kept on the visitor\'s device from the first keystroke.', c:'Drafts persist on this device from the first keystroke.'},
          {t:'Every action answers within a hundred milliseconds, and anything slower than a third of a second names its stage. There is no generic loading state in the flow: six stages say what is actually happening, and a failed validation preserves everything and explains itself.', c:'Six named stages; no generic loading state.'},
          {t:'Every claim in this post can be tested by using the Contact page. That is the point of writing about our own work first — the evidence is one route away.', c:null}
         ]},
        {slug:'capability-before-tooling', placeholder:true, title:'[Placeholder] Capability before tooling: an adoption sequence that held',
         date:'2026-06-30', loc:'[City]', author:'Rafael Torquato Cruz', org:'[The organization where this work happened]', role:'[Exact role held at the time]',
         challenge:'[One sentence: the defined challenge the organization faced.]',
         offering:'Innovation Capability Building', domainName:'AI Innovation', domainSlug:'ai-innovation',
         method:'[The method actually used, named plainly.]', output:'[What was produced.]', status:'[Result, or current status.]',
         source:'[Where a reader could verify this.]', measured:'[How the result was measured.]', uncertainty:'[What this account cannot claim.]',
         attribution:'prior', permission:'[State exactly what the organization has cleared for disclosure.]', updated:'2026-08-25',
         body:[
          {t:'This is a structural placeholder. It exists so the evidence system can be judged before real accounts are written: every post carries the full provenance block below, and the attribution field states — as a first-class element, never fine print — that this work predates Witamala.', c:'Attribution is a first-class element, never fine print.'},
          {t:'A real account replaces this text with what happened: the situation, the intervention, and what held after the author left. The permission field is not decorative; it records what the organization cleared for disclosure.', c:null}
         ]},
        {slug:'uncertainty-in-assessment', placeholder:true, title:'[Placeholder] Writing uncertainty into an assessment institutions used',
         date:'2026-05-12', loc:'[City]', author:'Rafael Torquato Cruz', org:'[Institution or program]', role:'[Exact role held at the time]',
         challenge:'[One sentence: the public-interest question at stake.]',
         offering:'Applied Research & Assessment', domainName:'Public Policy', domainSlug:'public-policy',
         method:'[Study design and sources.]', output:'[The assessment produced.]', status:'[How it was used, or current status.]',
         source:'[Where a reader could verify this.]', measured:'[How use or effect was measured.]', uncertainty:'[Sampling, access and interpretation limits.]',
         attribution:'prior', permission:'[State exactly what the institution has cleared for disclosure.]', updated:'2026-08-25',
         body:[
          {t:'A structural placeholder for Public Policy evidence. Assessments earn trust by stating what they do not know: the uncertainty field below is mandatory, and a claim without a source does not ship.', c:'A claim without a source does not ship.'},
          {t:'When a real account replaces this one, the method, measurement and limitation fields will describe the actual study — and the permission boundary will say who cleared it.', c:null}
         ]}
      ],
      trust: [
        {label:'Governance', body:'Witamala is founder-led: Rafael Torquato Cruz, Founder & CEO. Legal identity and registration will be published here before launch. What this site may claim is governed by the provenance standard — dated, attributed, permission-checked.'},
        {label:'Privacy', body:'This site stores your drafts and preferences on this device only. No analytics run, no cookies are set beyond your own choices, and nothing is transmitted until you deliberately complete a conversation.'},
        {label:'Responsible AI', body:'Generous AI is the operating stance: AI applied so the power to create accumulates where the work lives. Where AI assists an interaction on this site, the assistance is disclosed at the moment it operates — never silently.'},
        {label:'Accessibility', body:'Built to WCAG AA contrast throughout, with one H1 per page, full keyboard routes, visible focus, and motion that respects both your system reduced-motion setting and the Quiet preference below. If something fails you, say so in a conversation.'},
        {label:'Security', body:'No accounts, no third-party trackers, no embedded surveillance. The only data on this site is the data you typed, held on your device. Report anything suspicious through a conversation.'},
        {label:'Content provenance', body:'Every claim of work carries a date, an author, an attribution and a permission boundary. Work that predates Witamala is labeled as prior work — nothing on this site implies a client history that does not exist.'}
      ]
    };

export const IDENTITY = {
  eyebrow: 'AI INNOVATION COMPANY · BANGKOK | FLORIANÓPOLIS',
  slogan: 'Audacity to create on our terms.',
  offices: 'BANGKOK, THAILAND | FLORIANÓPOLIS, BRAZIL'
};
