'use client';

import { useMemo, useState } from 'react';

type TickerSymbol = 'BEAN' | 'GOBL' | 'RUG' | 'VOID' | 'RCKT' | 'PIPE';

type Ticker = {
  symbol: TickerSymbol;
  name: string;
  basePrice: number;
};

type MarketDay = {
  headlines: string[];
  moves: Partial<Record<TickerSymbol, number>>;
};

type TradeLog = {
  id: number;
  text: string;
  tone: 'neutral' | 'good' | 'bad';
};

const tickers: Ticker[] = [
  { symbol: 'BEAN', name: 'Bean Futures-ish', basePrice: 42 },
  { symbol: 'GOBL', name: 'Gobble Logistics', basePrice: 88 },
  { symbol: 'RUG', name: 'Rug Index', basePrice: 26 },
  { symbol: 'VOID', name: 'Void Storage', basePrice: 64 },
  { symbol: 'RCKT', name: 'Rocket Adjacent', basePrice: 118 },
  { symbol: 'PIPE', name: 'Pipeware Systems', basePrice: 53 },
];

const headlinePool: MarketDay[] = [
  {
    headlines: [
      'BEAN announces a spreadsheet with two tabs and immediate institutional awe.',
      'PIPE claims the leak was "a roadmap feature."',
    ],
    moves: { BEAN: 8, PIPE: -6, RUG: 3 },
  },
  {
    headlines: [
      'RCKT test vehicle reaches low orbit, then remembers it left the oven on.',
    ],
    moves: { RCKT: 12, VOID: -3, GOBL: 2 },
  },
  {
    headlines: [
      'VOID storage demand spikes after analysts misplace the entire afternoon.',
      'RUG denies rumors of being pulled, which somehow makes it worse.',
    ],
    moves: { VOID: 10, RUG: -11, BEAN: -2 },
  },
  {
    headlines: [
      'GOBL secures exclusive delivery rights to places nobody can pronounce.',
    ],
    moves: { GOBL: 9, PIPE: 4, RCKT: -5 },
  },
  {
    headlines: [
      'BEAN surplus discovered under finance department floor tiles.',
      'Market interns describe sentiment as "crunchy."',
    ],
    moves: { BEAN: -9, RUG: 5, VOID: 2 },
  },
  {
    headlines: [
      'PIPE patches yesterday with a strongly typed apology.',
      'RCKT guidance lowered from "moon" to "large hill."',
    ],
    moves: { PIPE: 11, RCKT: -8, GOBL: -2 },
  },
  {
    headlines: [
      'VOID reports record retention after refusing to return any data.',
    ],
    moves: { VOID: 8, BEAN: 3, RUG: -4 },
  },
  {
    headlines: [
      'RUG rebounds on bargain hunters with suspiciously excellent shoes.',
      'PIPE warns of minor pressure event, major meeting event.',
    ],
    moves: { RUG: 13, PIPE: -7, GOBL: 3 },
  },
  {
    headlines: [
      'RCKT and VOID announce joint venture: sending problems elsewhere.',
    ],
    moves: { RCKT: 9, VOID: 6, BEAN: -4 },
  },
  {
    headlines: [
      'Late session chop. Analysts agree the chart was technically a shape.',
      'BEAN closes strong after investors remember lunch exists.',
    ],
    moves: { BEAN: 7, GOBL: -4, RUG: 2, PIPE: 3, VOID: -2, RCKT: -3 },
  },
  {
    headlines: [
      'Anonymous whale exits BEAN with no comment, only a brisket recipe.',
    ],
    moves: { BEAN: -10, GOBL: 2 },
  },
  {
    headlines: [
      'VOID releases an empty press release; analysts call it "tighter than expected."',
    ],
    moves: { VOID: 11, RUG: -3 },
  },
  {
    headlines: [
      'RUG patriarch returns from a yacht and immediately denounces yachts.',
      'GOBL pivots to "experiences."',
    ],
    moves: { RUG: 6, GOBL: -7 },
  },
  {
    headlines: [
      'PIPE acquired by larger pipe; analysts unsure who is who now.',
    ],
    moves: { PIPE: 14, RCKT: -3 },
  },
  {
    headlines: [
      'BEAN unveils a subscription that costs less but does less.',
      'RCKT engineer leaks roadmap by hitting reply-all.',
    ],
    moves: { BEAN: 4, RCKT: -8 },
  },
  {
    headlines: [
      'Federal Reserve introduces "vibes-based easing." Nobody asks questions.',
    ],
    moves: { GOBL: 7, VOID: 5, RCKT: 4, BEAN: 2 },
  },
  {
    headlines: [
      'Coffee influencer endorses BEAN; cult forms in three cities by lunch.',
    ],
    moves: { BEAN: 12, GOBL: -2 },
  },
  {
    headlines: [
      'Goblin Union reaches deal nobody can read but everybody approves.',
      'PIPE hosts industry summit with somehow negative attendance.',
    ],
    moves: { GOBL: 9, PIPE: -4 },
  },
  {
    headlines: [
      'RCKT pivots from rockets to "trajectories."',
      'RUG boutique opens inside a parking garage. Sales triple.',
    ],
    moves: { RCKT: -11, RUG: 8 },
  },
  {
    headlines: [
      'Quiet day. Charts described as "doing a little dance" by one analyst.',
    ],
    moves: { BEAN: 1, GOBL: -1, RUG: 1, VOID: -1, RCKT: 1, PIPE: -1 },
  },
];

function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function makeRunDays() {
  return shuffle(headlinePool).slice(0, maxTradingDays);
}

const initialCash = 10000;
const maxTradingDays = 10;

function formatMoney(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function getInitialHoldings() {
  return tickers.reduce(
    (holdings, ticker) => ({ ...holdings, [ticker.symbol]: 0 }),
    {} as Record<TickerSymbol, number>
  );
}

function applyMoves(
  prices: Record<TickerSymbol, number>,
  moves: MarketDay['moves']
) {
  return tickers.reduce(
    (nextPrices, ticker) => {
      const move = moves[ticker.symbol] ?? 0;
      // ±2.5% random noise so even repeated headlines never play identically
      const noise = (Math.random() - 0.5) * 5;
      const nextPrice = prices[ticker.symbol] * (1 + (move + noise) / 100);

      nextPrices[ticker.symbol] = Math.max(2, Math.round(nextPrice));
      return nextPrices;
    },
    {} as Record<TickerSymbol, number>
  );
}

function getInitialPrices(firstMoves: MarketDay['moves']) {
  // ±3% drift on opening tape so the starting board varies between runs
  const basePrices = tickers.reduce(
    (prices, ticker) => ({
      ...prices,
      [ticker.symbol]: Math.max(
        2,
        ticker.basePrice * (1 + (Math.random() - 0.5) * 0.06)
      ),
    }),
    {} as Record<TickerSymbol, number>
  );

  return applyMoves(basePrices, firstMoves);
}

function getRank(value: number) {
  if (value >= 13000) return 'Terminal Prophet';
  if (value >= 11500) return 'Spreadsheet Shark';
  if (value >= 10000) return 'Solvent Operator';
  if (value >= 8500) return 'Bag Holder, Polite';
  return 'Margin Call Poet';
}

export default function MarketSimGame() {
  const [cash, setCash] = useState(initialCash);
  const [dayIndex, setDayIndex] = useState(0);
  const [days, setDays] = useState<MarketDay[]>(makeRunDays);
  const [prices, setPrices] = useState<Record<TickerSymbol, number>>(() =>
    getInitialPrices(days[0].moves)
  );
  const [holdings, setHoldings] = useState(getInitialHoldings);
  const [selectedSymbol, setSelectedSymbol] = useState<TickerSymbol>('BEAN');
  const [quantity, setQuantity] = useState(1);
  const [completed, setCompleted] = useState(false);
  const [logId, setLogId] = useState(1);
  const [tradeLog, setTradeLog] = useState<TradeLog[]>([
    {
      id: 0,
      text: 'opening tape loaded // fake money only',
      tone: 'neutral',
    },
  ]);

  const currentDay = days[dayIndex];
  const portfolioValue = useMemo(
    () =>
      cash +
      tickers.reduce(
        (total, ticker) => total + holdings[ticker.symbol] * prices[ticker.symbol],
        0
      ),
    [cash, holdings, prices]
  );
  const selectedPrice = prices[selectedSymbol];
  const selectedHolding = holdings[selectedSymbol];
  const maxBuyQuantity = Math.floor(cash / selectedPrice);
  const marketMove = portfolioValue - initialCash;

  function addLog(text: string, tone: TradeLog['tone'] = 'neutral') {
    setTradeLog((current) => [{ id: logId, text, tone }, ...current].slice(0, 7));
    setLogId((current) => current + 1);
  }

  function clampQuantity(value: number) {
    if (Number.isNaN(value)) return 1;
    return Math.max(1, Math.min(999, Math.floor(value)));
  }

  function buy() {
    if (completed) return;

    const shares = clampQuantity(quantity);
    const cost = selectedPrice * shares;

    if (cost > cash) {
      addLog(`buy rejected // ${selectedSymbol} requires ${formatMoney(cost)}`, 'bad');
      return;
    }

    setCash((current) => current - cost);
    setHoldings((current) => ({
      ...current,
      [selectedSymbol]: current[selectedSymbol] + shares,
    }));
    addLog(`bought ${shares} ${selectedSymbol} @ ${formatMoney(selectedPrice)}`, 'good');
  }

  function sell() {
    if (completed) return;

    const shares = clampQuantity(quantity);

    if (shares > selectedHolding) {
      addLog(`sell rejected // only ${selectedHolding} ${selectedSymbol} held`, 'bad');
      return;
    }

    setCash((current) => current + selectedPrice * shares);
    setHoldings((current) => ({
      ...current,
      [selectedSymbol]: current[selectedSymbol] - shares,
    }));
    addLog(`sold ${shares} ${selectedSymbol} @ ${formatMoney(selectedPrice)}`, 'good');
  }

  function hold() {
    if (completed) return;

    addLog('held position // conviction or indecision recorded');
  }

  function finishGame() {
    setCompleted(true);
    addLog('closing bell // lab.market-sim.complete = true', 'good');
  }

  function nextDay() {
    if (completed) return;

    if (dayIndex >= maxTradingDays - 1) {
      finishGame();
      return;
    }

    const nextIndex = dayIndex + 1;
    setDayIndex(nextIndex);
    setPrices((current) => applyMoves(current, days[nextIndex].moves));
    addLog(`advanced to day ${nextIndex + 1} // tape re-priced`);
  }

  function reset() {
    const freshDays = makeRunDays();
    setDays(freshDays);
    setCash(initialCash);
    setDayIndex(0);
    setPrices(getInitialPrices(freshDays[0].moves));
    setHoldings(getInitialHoldings());
    setSelectedSymbol('BEAN');
    setQuantity(1);
    setCompleted(false);
    setTradeLog([
      {
        id: 0,
        text: 'market reset // tape reshuffled, the past has been marked-to-imagination',
        tone: 'neutral',
      },
    ]);
    setLogId(1);
  }

  return (
    <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_340px]">
      <div className="rounded-2xl border border-white/10 bg-black p-3 shadow-2xl shadow-black/40 sm:p-4">
        <div className="mb-3 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3 font-mono text-xs text-white/50">
          <span>market_sim.exe</span>
          <span>day {completed ? maxTradingDays : dayIndex + 1}/{maxTradingDays}</span>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Metric label="cash" value={formatMoney(cash)} />
          <Metric label="portfolio" value={formatMoney(portfolioValue)} />
          <Metric
            label="p/l"
            value={`${marketMove >= 0 ? '+' : ''}${formatMoney(marketMove)}`}
            alert={marketMove < 0}
          />
        </div>

        <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 font-mono">
          <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/35">
            news tape
          </p>
          <div className="space-y-2 text-sm leading-6 text-white/65">
            {currentDay.headlines.map((headline) => (
              <p key={headline}>
                <span className="text-emerald-300">&gt;</span> {headline}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
          <div className="grid grid-cols-[0.8fr_1fr_0.8fr_0.7fr] gap-2 border-b border-white/10 bg-white/[0.04] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35 sm:grid-cols-[0.8fr_1.4fr_0.8fr_0.7fr]">
            <span>ticker</span>
            <span>name</span>
            <span>price</span>
            <span>held</span>
          </div>

          {tickers.map((ticker) => {
            const move = currentDay.moves[ticker.symbol] ?? 0;
            const selected = selectedSymbol === ticker.symbol;

            return (
              <button
                key={ticker.symbol}
                type="button"
                onClick={() => setSelectedSymbol(ticker.symbol)}
                className={`grid w-full grid-cols-[0.8fr_1fr_0.8fr_0.7fr] gap-2 border-b border-white/10 px-3 py-3 text-left font-mono text-xs transition last:border-b-0 sm:grid-cols-[0.8fr_1.4fr_0.8fr_0.7fr] ${
                  selected
                    ? 'border-emerald-300/40 bg-emerald-300/10 text-white shadow-[0_0_18px_rgba(0,230,118,0.12)]'
                    : 'bg-black text-white/65 hover:border-emerald-300/40 hover:bg-white/[0.04]'
                }`}
              >
                <span className="text-emerald-200">{ticker.symbol}</span>
                <span className="truncate">{ticker.name}</span>
                <span>{formatMoney(prices[ticker.symbol])}</span>
                <span>
                  {holdings[ticker.symbol]}
                  <span
                    className={
                      move >= 0 ? 'ml-2 text-emerald-300' : 'ml-2 text-red-300'
                    }
                  >
                    {move >= 0 ? '+' : ''}
                    {move}%
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <aside className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 font-mono">
        <p className="mb-3 text-xs uppercase tracking-[0.24em] text-white/35">
          order terminal
        </p>

        {completed ? (
          <div className="mb-4 rounded-lg border border-emerald-300/40 bg-emerald-300/10 p-3">
            <p className="text-sm text-emerald-200">final value</p>
            <p className="mt-1 text-2xl text-white">{formatMoney(portfolioValue)}</p>
            <p className="mt-2 text-sm text-white/60">rank: {getRank(portfolioValue)}</p>
          </div>
        ) : (
          <div className="mb-4 rounded-lg border border-white/10 bg-black/50 p-3">
            <p className="text-sm text-white/55">selected</p>
            <p className="mt-1 text-2xl text-emerald-200">{selectedSymbol}</p>
            <p className="mt-1 text-sm text-white/50">
              {formatMoney(selectedPrice)}
              {' // held '}
              {selectedHolding}
            </p>
          </div>
        )}

        <label className="mb-3 block text-xs uppercase tracking-[0.2em] text-white/35">
          quantity
          <input
            type="number"
            min={1}
            max={999}
            value={quantity}
            onChange={(event) => setQuantity(clampQuantity(event.target.valueAsNumber))}
            disabled={completed}
            className="mt-2 w-full rounded-md border border-white/15 bg-black px-3 py-2 text-base text-white outline-none transition focus:border-emerald-300 disabled:opacity-50"
          />
        </label>

        <div className="mb-4 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={buy}
            disabled={completed}
            className="rounded-md border border-emerald-300/60 px-3 py-2 text-xs text-emerald-200 transition hover:border-emerald-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            buy
          </button>
          <button
            type="button"
            onClick={sell}
            disabled={completed}
            className="rounded-md border border-red-300/50 px-3 py-2 text-xs text-red-200 transition hover:border-red-200 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            sell
          </button>
          <button
            type="button"
            onClick={hold}
            disabled={completed}
            className="rounded-md border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-emerald-300 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            hold
          </button>
        </div>

        <div className="mb-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
          <button
            type="button"
            onClick={nextDay}
            disabled={completed}
            className="rounded-md border border-emerald-300/60 px-3 py-2 text-xs text-emerald-200 transition hover:border-emerald-200 hover:shadow-[0_0_14px_rgba(0,230,118,0.18)] hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {dayIndex >= maxTradingDays - 1 ? 'close market' : 'next day'}
          </button>
          <button
            type="button"
            onClick={reset}
            className="rounded-md border border-white/15 px-3 py-2 text-xs text-white/70 transition hover:border-emerald-300 hover:text-white"
          >
            reset
          </button>
        </div>

        <div className="mb-4 rounded-lg border border-white/10 bg-black/50 p-3 text-xs leading-5 text-white/45">
          <p>max buy: {maxBuyQuantity} {selectedSymbol}</p>
          <p>{'no real tickers // no advice // no external feeds'}</p>
        </div>

        <div className="min-h-44 rounded-lg border border-white/10 bg-black/50 p-3 text-xs leading-5">
          {tradeLog.map((entry) => (
            <p
              key={entry.id}
              className={
                entry.tone === 'good'
                  ? 'text-emerald-300/80'
                  : entry.tone === 'bad'
                    ? 'text-red-300/80'
                    : 'text-white/50'
              }
            >
              $ {entry.text}
            </p>
          ))}
        </div>
      </aside>
    </section>
  );
}

function Metric({
  label,
  value,
  alert = false,
}: {
  label: string;
  value: string;
  alert?: boolean;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-black/50 p-3 font-mono">
      <p className={alert ? 'text-red-300' : 'text-emerald-300'}>{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-white/35">
        {label}
      </p>
    </div>
  );
}
