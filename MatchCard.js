const MatchCard = ({ match, onScoreUpdate }) => {
  return (
    <div className="border rounded-lg p-4 shadow-sm bg-white mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-gray-700">Match {match.id}</span>
        {match.completed && <span className="text-green-600 text-sm">✓ Final</span>}
      </div>
      
      {/* Team 1 */}
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm">{match.team1_names.join(" & ")}</div>
        <input 
          type="number" 
          value={match.score_t1}
          onChange={(e) => onScoreUpdate(match.id, 't1', e.target.value)}
          className="border p-2 w-16 text-center rounded"
        />
      </div>

      {/* Team 2 */}
      <div className="flex justify-between items-center">
        <div className="text-sm">{match.team2_names.join(" & ")}</div>
        <input 
          type="number" 
          value={match.score_t2}
          onChange={(e) => onScoreUpdate(match.id, 't2', e.target.value)}
          className="border p-2 w-16 text-center rounded"
        />
      </div>
    </div>
  );
};
