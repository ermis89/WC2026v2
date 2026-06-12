import { useMemo, useState } from 'react';
import {
  CalendarDays,
  ChevronRight,
  GitBranch,
  Globe2,
  MapPin,
  Medal,
  Moon,
  Search,
  Shield,
  Sparkles,
  Stadium,
  Sun,
  Table2,
  Trophy,
  Users,
} from 'lucide-react';
import { groups, teams } from './data/teams.js';
import { matches } from './data/matches.js';
import { results } from './data/results.js';
import { stadiums } from './data/stadiums.js';
import {
  calculateBestThirdRanking,
  calculateGroupStandings,
  resolveTeamSlot,
} from './utils/standings.js';

const tabs = [
  { id: 'overview', label: 'Overview', icon: Trophy },
  { id: 'matches', label: 'Matches', icon: CalendarDays },
  { id: 'groups', label: 'Groups', icon: Table2 },
  { id: 'bracket', label: 'Bracket', icon: GitBranch },
  { id: 'teams', label: 'Teams', icon: Users },
  { id: 'stadiums', label: 'Stadiums', icon: Stadium },
];

const formatDate = new Intl.DateTimeFormat(undefined, {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
  hour: '2-digit',
  minute: '2-digit',
});

function teamByCode(code) {
  return teams.find((team) => team.code === code);
}

function venueById(id) {
  return stadiums.find((venue) => venue.id === id);
}

function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [query, setQuery] = useState('');
  const [theme, setTheme] = useState('dark');

  const filteredTeams = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return teams;
    return teams.filter((team) =>
      [team.name, team.code, team.confederation, team.group].some((field) =>
        String(field).toLowerCase().includes(value),
      ),
    );
  }, [query]);

  const groupStandings = useMemo(
    () => calculateGroupStandings({ groups, teams, matches, results }),
    [],
  );

  const bestThirdRanking = useMemo(
    () => calculateBestThirdRanking(groupStandings),
    [groupStandings],
  );

  const nextMatches = matches.slice().sort((a, b) => new Date(a.date) - new Date(b.date));
  const knockoutMatches = nextMatches.filter((match) => match.stageCode !== 'G');
  const topSeeds = teams.slice().sort((a, b) => a.fifaRank - b.fifaRank).slice(0, 5);

  return (
    <main className="app" data-theme={theme}>
      <section className="hero">
        <div className="hero__glow" />
        <nav className="topbar" aria-label="Primary navigation">
          <div className="brand" aria-label="WC2026 Hub home">
            <span className="brand__mark">26</span>
            <span>
              WC2026 <strong>Hub</strong>
            </span>
          </div>

          <div className="tabs" role="tablist" aria-label="App sections">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={activeTab === id ? 'tab tab--active' : 'tab'}
                onClick={() => setActiveTab(id)}
                type="button"
                role="tab"
                aria-selected={activeTab === id}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </div>

          <button
            className="iconButton"
            type="button"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle color theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </nav>

        <div className="hero__content">
          <div className="eyebrow">
            <Sparkles size={16} /> Unofficial tournament companion
          </div>
          <h1>World Cup 2026 command center</h1>
          <p>
            A clean, maintainable React app for matches, groups, teams, venues, stats and fan tools. Built as the new foundation for the WC2026 project.
          </p>

          <div className="hero__actions">
            <button className="primaryButton" type="button" onClick={() => setActiveTab('matches')}>
              View matches <ChevronRight size={18} />
            </button>
            <button className="secondaryButton" type="button" onClick={() => setActiveTab('groups')}>
              View groups
            </button>
          </div>
        </div>
      </section>

      <section className="contentShell">
        <div className="statsStrip" aria-label="Tournament statistics">
          <StatCard icon={Users} label="Teams" value="48" />
          <StatCard icon={CalendarDays} label="Matches" value="104" />
          <StatCard icon={Globe2} label="Host nations" value="3" />
          <StatCard icon={Stadium} label="Venues" value="16" />
        </div>

        {activeTab === 'overview' && (
          <div className="grid twoColumns">
            <Panel title="Next fixtures" icon={CalendarDays}>
              <div className="matchList">
                {nextMatches.slice(0, 4).map((match) => (
                  <MatchCard key={match.id} match={match} compact />
                ))}
              </div>
            </Panel>

            <Panel title="Top-ranked teams" icon={Medal}>
              <div className="rankList">
                {topSeeds.map((team) => (
                  <div className="rankRow" key={team.code}>
                    <span className="flag" aria-hidden="true">{team.flag}</span>
                    <div>
                      <strong>{team.name}</strong>
                      <small>{team.confederation} · Group {team.group}</small>
                    </div>
                    <span className="rankBadge">#{team.fifaRank}</span>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {activeTab === 'matches' && (
          <Panel title="Match schedule" icon={CalendarDays} description="Full 104-match skeleton. Knockout opponents remain placeholders until standings are known.">
            <div className="matchGrid">
              {nextMatches.map((match) => (
                <MatchCard key={match.id} match={match} />
              ))}
            </div>
          </Panel>
        )}

        {activeTab === 'groups' && (
          <div className="stackedPanels">
            <Panel title="Group standings" icon={Table2} description="Calculated from completed group-stage results. Positions remain projected until all six matches in the group are complete.">
              <div className="groupsGrid">
                {Object.entries(groupStandings).map(([group, table]) => (
                  <article className="groupCard" key={group}>
                    <header>
                      <span>Group {group}</span>
                      <StatusPill status={table[0]?.status} progress={table[0]?.progress} />
                    </header>
                    <StandingsTable table={table} label={`Group ${group} standings`} />
                  </article>
                ))}
              </div>
            </Panel>

            <Panel title="Best third-place ranking" icon={Medal} description="The eight best third-placed teams qualify for the Round of 32. This ranking is projected until every group is complete.">
              <ThirdPlaceTable table={bestThirdRanking} />
            </Panel>
          </div>
        )}

        {activeTab === 'bracket' && (
          <Panel title="Knockout bracket" icon={GitBranch} description="Round of 32 slots resolve from standings. Projected teams are explicitly labelled until group qualification is confirmed.">
            <div className="bracketGrid">
              {['R32', 'R16', 'QF', 'SF', '3RD', 'F'].map((stageCode) => (
                <section className="bracketRound" key={stageCode}>
                  <h3>{knockoutMatches.find((match) => match.stageCode === stageCode)?.stage}</h3>
                  {knockoutMatches
                    .filter((match) => match.stageCode === stageCode)
                    .map((match) => (
                      <MatchCard
                        key={match.id}
                        match={match}
                        compact
                        groupStandings={groupStandings}
                        bestThirdRanking={bestThirdRanking}
                      />
                    ))}
                </section>
              ))}
            </div>
          </Panel>
        )}

        {activeTab === 'teams' && (
          <Panel title="Teams" icon={Shield} description="Search by country, code, group or confederation.">
            <label className="searchBox">
              <Search size={18} />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search teams..."
                type="search"
              />
            </label>

            <div className="teamGrid">
              {filteredTeams.map((team) => (
                <article className="teamCard" key={team.code}>
                  <span className="teamCard__flag" aria-hidden="true">{team.flag}</span>
                  <h3>{team.name}</h3>
                  <p>{team.code} · {team.confederation}</p>
                  <div className="metaLine">
                    <span>Group {team.group}</span>
                    <span>{team.titles} titles</span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        )}

        {activeTab === 'stadiums' && (
          <Panel title="Host stadiums" icon={Stadium} description="All 16 host venues with capacity and planned match count.">
            <div className="stadiumGrid">
              {stadiums.map((venue) => (
                <article className="stadiumCard" key={venue.id}>
                  <div className="stadiumCard__icon"><MapPin size={24} /></div>
                  <h3>{venue.name}</h3>
                  <p>{venue.fifaName}</p>
                  <div className="metaLine">
                    <span>{venue.city}</span>
                    <span>{venue.capacity.toLocaleString()}</span>
                  </div>
                </article>
              ))}
            </div>
          </Panel>
        )}
      </section>
    </main>
  );
}

function StatCard({ icon: Icon, label, value }) {
  return (
    <article className="statCard">
      <Icon size={20} />
      <strong>{value}</strong>
      <span>{label}</span>
    </article>
  );
}

function Panel({ title, icon: Icon, description, children }) {
  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <h2><Icon size={21} /> {title}</h2>
          {description && <p>{description}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function StandingsTable({ table, label }) {
  return (
    <div className="standingsTable" role="table" aria-label={label}>
      <div className="standingsRow standingsRow--head" role="row">
        <span>Team</span>
        <span>P</span>
        <span>W</span>
        <span>D</span>
        <span>L</span>
        <span>GD</span>
        <span>Pts</span>
      </div>
      {table.map((row) => (
        <div className={`standingsRow standingsRow--${row.zone}`} role="row" key={row.code}>
          <span className="standingsTeam">
            <span className="rankNumber">{row.rank}</span>
            <span className="flag" aria-hidden="true">{row.team?.flag ?? '🏳️'}</span>
            <strong>{row.team?.name ?? row.code}</strong>
            <span className={`miniStatus miniStatus--${row.status}`}>{row.status}</span>
          </span>
          <span>{row.played}</span>
          <span>{row.won}</span>
          <span>{row.drawn}</span>
          <span>{row.lost}</span>
          <span>{formatGoalDifference(row.goalDifference)}</span>
          <span className="pointsCell">{row.points}</span>
        </div>
      ))}
    </div>
  );
}

function ThirdPlaceTable({ table }) {
  return (
    <div className="thirdTable" role="table" aria-label="Best third-place ranking">
      {table.map((row) => (
        <div className={`thirdRow thirdRow--${row.zone}`} role="row" key={row.code}>
          <span className="rankNumber">{row.rank}</span>
          <span className="flag" aria-hidden="true">{row.team?.flag ?? '🏳️'}</span>
          <strong>{row.team?.name ?? row.code}</strong>
          <small>Group {row.group}</small>
          <span>{row.played}P</span>
          <span>{formatGoalDifference(row.goalDifference)}</span>
          <span className="pointsCell">{row.points} pts</span>
          <span className={`miniStatus miniStatus--${row.status}`}>{row.status}</span>
        </div>
      ))}
    </div>
  );
}

function StatusPill({ status, progress }) {
  const label = status === 'confirmed' ? 'Confirmed' : 'Projected';
  const progressText = progress ? `${progress.completed}/${progress.total}` : '0/0';

  return (
    <span className={`statusPill statusPill--${status}`}>
      {label} · {progressText}
    </span>
  );
}

function MatchCard({ match, compact = false, groupStandings = null, bestThirdRanking = null }) {
  const home = teamByCode(match.home) ?? resolveTeamSlot(match.home, groupStandings, bestThirdRanking);
  const away = teamByCode(match.away) ?? resolveTeamSlot(match.away, groupStandings, bestThirdRanking);
  const venue = venueById(match.stadiumId);

  return (
    <article className={compact ? 'matchCard matchCard--compact' : 'matchCard'}>
      <div className="matchCard__top">
        <span>#{match.id} · {match.stage}</span>
        {match.group && <span>Group {match.group}</span>}
      </div>
      <div className="matchCard__teams">
        <TeamName team={home} fallback={match.home} />
        <span className="versus">vs</span>
        <TeamName team={away} fallback={match.away} align="right" />
      </div>
      <div className="matchCard__bottom">
        <span>{formatDate.format(new Date(match.date))}</span>
        <span>{venue?.city ?? 'TBD'}</span>
      </div>
    </article>
  );
}

function TeamName({ team, fallback, align = 'left' }) {
  return (
    <div className={align === 'right' ? 'teamName teamName--right' : 'teamName'}>
      <span className="flag" aria-hidden="true">{team?.flag ?? '🏳️'}</span>
      <span>{team?.name ?? fallback}</span>
      {team?.slotStatus && <span className={`miniStatus miniStatus--${team.slotStatus}`}>{team.slotStatus}</span>}
    </div>
  );
}

function formatGoalDifference(value) {
  if (value > 0) return `+${value}`;
  return String(value);
}

export default App;
