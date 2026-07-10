'use client'

import { ChangeEvent, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import styles from './investing-101.module.css'

const disclaimer =
  'This website is provided solely for educational and planning purposes. Nothing on this site constitutes financial, tax, accounting, legal, or investment advice. Investment returns are not guaranteed. Always perform your own research and consult qualified professionals before making financial decisions.'

const accounts = [
  {
    title: 'Start with the basics',
    eyebrow: 'Foundation',
    description: 'Build an emergency fund, protect your near-term bills, and make a plan for high-interest debt before taking market risk.',
    points: ['Emergency cash for unexpected costs', 'High-interest debt usually deserves attention first', 'Short-term goals generally need lower-risk cash options'],
  },
  {
    title: 'TFSA',
    eyebrow: 'Flexible investing',
    description: 'A registered account where investment growth and withdrawals are generally tax-free. Available room depends on your personal history.',
    points: ['Useful for flexible goals and retirement', 'Withdrawals restore room in a future calendar year', 'Contribution room is personal: check CRA My Account'],
  },
  {
    title: 'FHSA',
    eyebrow: 'First home',
    description: 'A registered account designed for eligible first-time home buyers. Rules, deadlines, and qualifying withdrawals matter.',
    points: ['Potential tax deduction on contributions', 'Potential tax-free qualifying home withdrawal', 'Confirm eligibility and current rules before opening'],
  },
  {
    title: 'RRSP',
    eyebrow: 'Retirement',
    description: 'A retirement account where contributions may reduce taxable income now, while withdrawals are generally taxable later.',
    points: ['Often useful when income is higher today', 'Withdrawals have tax and room implications', 'Contribution room is personal: check your notice of assessment'],
  },
  {
    title: 'RESP',
    eyebrow: 'Education',
    description: 'An education savings account for a child, with rules around beneficiaries, grants, and eligible post-secondary withdrawals.',
    points: ['May be worth reviewing if education is a goal', 'Grant eligibility and timelines matter', 'Understand the withdrawal and repayment rules'],
  },
  {
    title: 'Non-registered account',
    eyebrow: 'After registered room',
    description: 'A regular investment account with no contribution limit, but taxable income and record keeping can be part of the picture.',
    points: ['No contribution room to track', 'Capital gains, dividends, and interest can be taxable', 'Keep records for adjusted cost base and taxes'],
  },
]

const etfs = [
  ['XEQT / VEQT', 'All-equity', 'Broad Canadian, U.S., and international stock exposure. Can move sharply up or down.'],
  ['VGRO / XGRO', 'Growth', 'A mix of global stocks and bonds for investors who want some bonds in the mix.'],
  ['VBAL / XCNS', 'Balanced / conservative', 'More bonds and less stock exposure. Potentially steadier, with different long-term tradeoffs.'],
  ['Cash ETFs', 'Cash-like', 'Products that may hold deposits or short-term instruments. Read the product details and risks carefully.'],
]

const brokers = [
  ['Wealthsimple', 'Simple mobile-first experience', 'Often appeals to first-time self-directed investors', 'Review the current fee schedule, currency conversion costs, and product availability.'],
  ['Questrade', 'Established self-directed platform', 'Useful to compare if you want account choices and ETF access', 'Review trading commissions, transfer fees, and platform features.'],
  ['National Bank Direct Brokerage', 'Low-cost self-directed option', 'Worth comparing for active or long-term investors', 'Review current eligibility, data, and account fees.'],
  ['RBC Direct Investing', 'Bank-connected brokerage', 'May suit people who value branch or bank integration', 'Review commission pricing, account minimums, and platform tools.'],
  ['TD Direct Investing', 'Bank-connected brokerage', 'May suit people who already bank with TD', 'Review commission pricing, account minimums, and platform tools.'],
  ['BMO InvestorLine', 'Bank-connected brokerage', 'May suit people who want BMO integration', 'Review commission pricing, ETF policies, and account features.'],
  ['Interactive Brokers', 'Advanced trading platform', 'Often better suited to experienced, hands-on users', 'Review pricing, currency conversion, product complexity, and support needs.'],
]

const learning = [
  'What is a TFSA?',
  'What is an RRSP?',
  'What is an ETF?',
  'Diversification',
  'Market crashes',
  'Dollar-cost averaging',
  'Lump sum investing',
  'Rebalancing',
  'Taxes and capital gains',
  'Dividends and interest',
  'Behaviour and emotions',
  'Beginner mistakes to avoid',
]

function money(value: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(Math.max(0, value))
}

function projection(initial: number, contribution: number, years: number, annualReturn: number) {
  const months = Math.max(0, years * 12)
  const monthlyRate = annualReturn / 100 / 12
  if (monthlyRate === 0) return initial + contribution * months
  return initial * Math.pow(1 + monthlyRate, months) + contribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
}

function Icon({ children }: { children: string }) {
  return <span className={styles.icon} aria-hidden="true">{children}</span>
}

export default function Investing101() {
  const [acknowledged, setAcknowledged] = useState(false)
  const [activeTab, setActiveTab] = useState<'plan' | 'whatif'>('plan')
  const [inputs, setInputs] = useState({
    age: 34,
    retirementAge: 65,
    province: 'Alberta',
    income: 85000,
    monthlyExpenses: 3200,
    monthlyRent: 0,
    emergencyMonths: 6,
    cash: 50000,
    houseProceeds: 0,
    existingInvestments: 12000,
    tfsaRoom: 0,
    rrspRoom: 0,
    risk: 'Balanced',
    expectedReturn: 5,
    inflation: 2,
    monthlyContribution: 650,
    upcomingExpenses: 6000,
  })

  useEffect(() => {
    document.body.classList.add('investing-101-mode')
    return () => document.body.classList.remove('investing-101-mode')
  }, [])

  const plan = useMemo(() => {
    const monthlyNeeds = inputs.monthlyExpenses + inputs.monthlyRent
    const emergencyFund = monthlyNeeds * inputs.emergencyMonths
    const totalCash = inputs.cash + inputs.houseProceeds
    const cashReserve = emergencyFund + inputs.upcomingExpenses
    const investable = Math.max(0, totalCash - cashReserve)
    const years = Math.max(0, inputs.retirementAge - inputs.age)
    const startPortfolio = inputs.existingInvestments + investable
    const retirementValue = projection(startPortfolio, inputs.monthlyContribution, years, inputs.expectedReturn)
    const realValue = retirementValue / Math.pow(1 + inputs.inflation / 100, years)
    const yearly = Array.from({ length: Math.min(years, 7) + 1 }, (_, index) => {
      const year = Math.round(inputs.age + (years / Math.min(years || 1, 7)) * index)
      const yearsFromNow = Math.max(0, year - inputs.age)
      return { year, value: projection(startPortfolio, inputs.monthlyContribution, yearsFromNow, inputs.expectedReturn) }
    })
    return { emergencyFund, cashReserve, investable, years, retirementValue, realValue, monthlyNeeds, yearly }
  }, [inputs])

  const scenarios = useMemo(() => {
    const years = Math.max(1, Math.min(20, inputs.retirementAge - inputs.age))
    const rate = inputs.expectedReturn
    return [
      { name: 'Invest $50k now', value: projection(50000, 0, years, rate), tone: 'blue' },
      { name: 'Spread $50k over 12 months', value: projection(0, 50000 / 12, years, rate), tone: 'teal' },
      { name: 'Keep $50k as cash', value: 50000, tone: 'gray' },
      { name: 'Invest $500 / month', value: projection(0, 500, years, rate), tone: 'indigo' },
      { name: 'Invest $1,000 / month', value: projection(0, 1000, years, rate), tone: 'violet' },
    ]
  }, [inputs.age, inputs.expectedReturn, inputs.retirementAge])

  const updateNumber = (key: keyof typeof inputs) => (event: ChangeEvent<HTMLInputElement>) => {
    setInputs((current) => ({ ...current, [key]: Number(event.target.value) || 0 }))
  }

  const chartMax = Math.max(...plan.yearly.map((item) => item.value), 1)
  const scenarioMax = Math.max(...scenarios.map((item) => item.value), 1)

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top"><span>Investing</span> 101 <b>Canada</b></a>
        <nav aria-label="Page navigation" className={styles.nav}>
          <a href="#roadmap">Roadmap</a>
          <a href="#learn">Learn</a>
          <a href="#planner">Planner</a>
          <a href="#brokers">Compare brokers</a>
        </nav>
        <a className={styles.headerButton} href="#planner">Build my plan <span aria-hidden="true">→</span></a>
      </header>

      <main id="top">
        <section className={styles.hero}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.dot} /> A calm place to start</p>
            <h1>Understand your money.<br /><em>Then make a plan.</em></h1>
            <p className={styles.lede}>Investing 101 Canada is a plain-language guide for understanding the choices in front of you, one practical step at a time.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#planner">Start with my numbers <span aria-hidden="true">→</span></a>
              <a className={styles.textButton} href="#roadmap">Explore the roadmap <span aria-hidden="true">↓</span></a>
            </div>
            <p className={styles.heroNote}><Icon>✦</Icon> Built for Canadians who want clarity, not pressure.</p>
          </div>
          <div className={styles.heroArt}>
            <Image
              src="/investing-101/dollar-hill-hero.png"
              alt="A dollar sign moving up a green hill"
              fill
              priority
              sizes="(max-width: 850px) 100vw, 48vw"
            />
          </div>
        </section>

        <section className={styles.disclaimer} aria-label="Important disclaimer">
          <Icon>i</Icon><p>{disclaimer}</p>
        </section>

        <section className={styles.basics} aria-labelledby="basics-title">
          <div className={styles.sectionIntro}>
            <p className={styles.kicker}>The essentials</p>
            <h2 id="basics-title">Before you invest, get the big picture.</h2>
          </div>
          <div className={styles.basicsGrid}>
            <article><Icon>↗</Icon><h3>Investing is ownership</h3><p>When you invest, your money is usually buying a small piece of many businesses, lending to governments, or both.</p></article>
            <article><Icon>◌</Icon><h3>Inflation changes what money buys</h3><p>Cash is useful for near-term needs. Over long periods, rising prices can reduce what that cash can purchase.</p></article>
            <article><Icon>+</Icon><h3>Growth can build on growth</h3><p>Compounding means returns can begin to earn returns. Time can matter as much as the amount you start with.</p></article>
            <article><Icon>⇄</Icon><h3>Saving and investing have different jobs</h3><p>Savings can protect short-term goals. Investing accepts some uncertainty in pursuit of long-term growth.</p></article>
          </div>
        </section>

        <section id="roadmap" className={styles.roadmap} aria-labelledby="roadmap-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>Your roadmap</p><h2 id="roadmap-title">Put your money in the right order.</h2><p>There is no universal sequence. This is a practical way to organize the questions, not a prescription.</p></div>
          <div className={styles.accountGrid}>
            {accounts.map((account, index) => <article className={styles.accountCard} key={account.title}>
              <div className={styles.accountTop}><span>{String(index + 1).padStart(2, '0')}</span><p>{account.eyebrow}</p></div>
              <h3>{account.title}</h3><p>{account.description}</p>
              <ul>{account.points.map((point) => <li key={point}>{point}</li>)}</ul>
            </article>)}
          </div>
        </section>

        <section id="learn" className={styles.etfSection} aria-labelledby="etf-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>ETF education</p><h2 id="etf-title">A simpler way to understand diversification.</h2><p>An ETF is a fund that trades on an exchange. Many ETFs hold a collection of investments, which can make diversification more accessible.</p></div>
          <div className={styles.etfLayout}>
            <article className={styles.etfPrimer}><div className={styles.primerIcon}>◎</div><h3>Three ideas to understand first</h3><div><b>Index investing</b><p>Some ETFs aim to follow a market index instead of selecting individual stocks.</p></div><div><b>MER fees</b><p>Management expense ratios are ongoing fund costs expressed as a percentage. Small differences can matter over time.</p></div><div><b>Risk levels</b><p>More stock exposure can mean bigger swings. Bonds and cash-like holdings can change the balance, not erase risk.</p></div></article>
            <div className={styles.etfList}>{etfs.map(([name, type, description]) => <article key={name} className={styles.etfCard}><div><span>{type}</span><h3>{name}</h3></div><p>{description}</p><small>Example only, not a recommendation</small></article>)}</div>
          </div>
        </section>

        <section id="planner" className={styles.planner} aria-labelledby="planner-title">
          <div className={styles.plannerHeading}><div><p className={styles.kicker}>Interactive planning tool</p><h2 id="planner-title">See the moving pieces together.</h2><p>Use rough numbers to start a conversation with yourself or a qualified professional. Nothing is saved.</p></div><div className={styles.plannerTabs} role="tablist" aria-label="Calculator mode"><button className={activeTab === 'plan' ? styles.activeTab : ''} onClick={() => setActiveTab('plan')} role="tab" aria-selected={activeTab === 'plan'}>My plan</button><button className={activeTab === 'whatif' ? styles.activeTab : ''} onClick={() => setActiveTab('whatif')} role="tab" aria-selected={activeTab === 'whatif'}>What if?</button></div></div>
          {!acknowledged && <div className={styles.calculatorGate}><div><Icon>✓</Icon><h3>One quick acknowledgement</h3><p>Before using the calculator, please confirm that you understand this is an educational model, not personal financial advice.</p><label><input type="checkbox" checked={acknowledged} onChange={(event) => setAcknowledged(event.target.checked)} /> I understand and want to explore a planning scenario.</label></div></div>}
          {acknowledged && <div className={styles.calculatorContent}>
            {activeTab === 'plan' ? <>
              <form className={styles.inputPanel} onSubmit={(event) => event.preventDefault()}>
                <h3>Your starting point</h3>
                <div className={styles.fields}>
                  <Field label="Current age" value={inputs.age} onChange={updateNumber('age')} suffix="years" />
                  <Field label="Retirement age" value={inputs.retirementAge} onChange={updateNumber('retirementAge')} suffix="years" />
                  <label><span>Province</span><select value={inputs.province} onChange={(event) => setInputs((current) => ({ ...current, province: event.target.value }))}><option>Alberta</option><option>British Columbia</option><option>Manitoba</option><option>New Brunswick</option><option>Newfoundland and Labrador</option><option>Nova Scotia</option><option>Ontario</option><option>Prince Edward Island</option><option>Quebec</option><option>Saskatchewan</option></select></label>
                  <label><span>Risk comfort</span><select value={inputs.risk} onChange={(event) => setInputs((current) => ({ ...current, risk: event.target.value }))}><option>Conservative</option><option>Balanced</option><option>Growth</option></select></label>
                  <Field label="Monthly living costs" value={inputs.monthlyExpenses} onChange={updateNumber('monthlyExpenses')} prefix="$" />
                  <Field label="Monthly rent / mortgage" value={inputs.monthlyRent} onChange={updateNumber('monthlyRent')} prefix="$" />
                  <Field label="Cash available" value={inputs.cash} onChange={updateNumber('cash')} prefix="$" />
                  <Field label="House sale proceeds" value={inputs.houseProceeds} onChange={updateNumber('houseProceeds')} prefix="$" />
                  <Field label="Existing investments" value={inputs.existingInvestments} onChange={updateNumber('existingInvestments')} prefix="$" />
                  <Field label="Upcoming large expenses" value={inputs.upcomingExpenses} onChange={updateNumber('upcomingExpenses')} prefix="$" />
                  <Field label="Monthly contribution" value={inputs.monthlyContribution} onChange={updateNumber('monthlyContribution')} prefix="$" />
                  <Field label="Expected return" value={inputs.expectedReturn} onChange={updateNumber('expectedReturn')} suffix="%" step="0.5" />
                  <Field label="Inflation assumption" value={inputs.inflation} onChange={updateNumber('inflation')} suffix="%" step="0.5" />
                  <label><span>Emergency fund target</span><select value={inputs.emergencyMonths} onChange={(event) => setInputs((current) => ({ ...current, emergencyMonths: Number(event.target.value) }))}><option value={3}>3 months</option><option value={6}>6 months</option><option value={9}>9 months</option></select></label>
                </div>
                <p className={styles.fieldFootnote}>TFSA and RRSP room are personal. Confirm available room with the CRA before contributing.</p>
              </form>
              <div className={styles.resultsPanel}>
                <p className={styles.resultLabel}>Your planning snapshot</p>
                <div className={styles.resultGrid}><Result label="Emergency fund target" value={money(plan.emergencyFund)} detail={`${inputs.emergencyMonths} months of core costs`} /><Result label="Cash reserve" value={money(plan.cashReserve)} detail="Emergency fund + known expenses" /><Result label="Potentially investable" value={money(plan.investable)} detail="After the reserve in this model" /><Result label="Monthly investing" value={money(inputs.monthlyContribution)} detail="Your stated contribution" /></div>
                <article className={styles.retirementCard}><div><p>Illustrative value at age {inputs.retirementAge}</p><h3>{money(plan.retirementValue)}</h3><span>About {money(plan.realValue)} in today&apos;s dollars using your inflation assumption.</span></div><div className={styles.retirementMeta}><b>{plan.years} years</b><span>to retirement</span><b>{money(plan.retirementValue * 0.04 / 12)}</b><span>monthly at a hypothetical 4% annual withdrawal</span></div></article>
                <div className={styles.barChart} aria-label="Illustrative portfolio growth chart"><div className={styles.chartTitle}><span>Illustrative growth path</span><small>Based on your return and contribution assumptions</small></div><div className={styles.chartBars}>{plan.yearly.map((item) => <div className={styles.barGroup} key={item.year}><div className={styles.bar} style={{ height: `${Math.max(8, (item.value / chartMax) * 100)}%` }}><span>{money(item.value)}</span></div><small>{item.year}</small></div>)}</div></div>
              </div>
            </> : <div className={styles.whatIf}>
              <div className={styles.scenarioCopy}><p className={styles.resultLabel}>Compare a few paths</p><h3>Same starting amount.<br />Different timing.</h3><p>This illustration uses {inputs.expectedReturn}% annual growth over {Math.max(1, Math.min(20, inputs.retirementAge - inputs.age))} years. It cannot predict market returns.</p><label><span>Expected annual return</span><input type="range" min="0" max="10" step="0.5" value={inputs.expectedReturn} onChange={updateNumber('expectedReturn')} /><b>{inputs.expectedReturn}%</b></label></div>
              <div className={styles.scenarioChart}>{scenarios.map((scenario) => <div className={styles.scenarioRow} key={scenario.name}><div><span>{scenario.name}</span><b>{money(scenario.value)}</b></div><div className={styles.scenarioTrack}><span className={`${styles.scenarioBar} ${styles[scenario.tone]}`} style={{ width: `${(scenario.value / scenarioMax) * 100}%` }} /></div></div>)}</div>
            </div>}
          </div>}
        </section>

        <section id="brokers" className={styles.brokers} aria-labelledby="broker-title">
          <div className={styles.sectionIntro}><p className={styles.kicker}>Broker comparison</p><h2 id="broker-title">A brokerage is a tool, not a verdict.</h2><p>There is no universally best platform. Compare what matters for your habits, account type, and the services you actually want. Fees and features change, so use the current published schedule before deciding.</p></div>
          <div className={styles.brokerTable}><div className={styles.brokerHead}><span>Broker</span><span>What people often value</span><span>May suit</span><span>Check before deciding</span></div>{brokers.map(([name, value, fit, check]) => <article key={name}><h3>{name}</h3><p>{value}</p><p>{fit}</p><p>{check}</p></article>)}</div>
        </section>

        <section className={styles.guides} aria-labelledby="guide-title"><div className={styles.guideCard}><p className={styles.kicker}>Step-by-step guides</p><h2 id="guide-title">Opening an account should not feel mysterious.</h2><p>Our guides break down a typical process, including identity checks, linking a bank account, funding your account, buying an ETF, order types, and how dividends work.</p><div className={styles.guideSteps}>{['Choose account type', 'Verify your identity', 'Fund the account', 'Understand the order', 'Review, then wait'].map((step, index) => <div key={step}><span>{index + 1}</span>{step}</div>)}</div><a className={styles.primaryButton} href="#planner">Use the planning tool <span aria-hidden="true">→</span></a></div></section>

        <section className={styles.library} aria-labelledby="library-title"><div className={styles.sectionIntro}><p className={styles.kicker}>Educational library</p><h2 id="library-title">Learn at your own pace.</h2></div><div className={styles.libraryGrid}>{learning.map((title, index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><h3>{title}</h3><b>Read the basics <span aria-hidden="true">→</span></b></article>)}</div></section>
      </main>
      <footer className={styles.footer}><a className={styles.brand} href="#top"><span>Investing</span> 101 <b>Canada</b></a><p>{disclaimer}</p><span>© 2026 Investing 101 Canada · Educational planning only</span></footer>
    </div>
  )
}

function Field({ label, value, onChange, prefix, suffix, step = '1' }: { label: string; value: number; onChange: (event: ChangeEvent<HTMLInputElement>) => void; prefix?: string; suffix?: string; step?: string }) {
  return <label><span>{label}</span><div className={styles.numberField}>{prefix && <i>{prefix}</i>}<input type="number" value={value} min="0" step={step} onChange={onChange} />{suffix && <i>{suffix}</i>}</div></label>
}

function Result({ label, value, detail }: { label: string; value: string; detail: string }) {
  return <article><p>{label}</p><h3>{value}</h3><span>{detail}</span></article>
}
