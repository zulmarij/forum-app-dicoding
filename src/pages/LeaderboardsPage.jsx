import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Leaderboards from '../components/Leaderboards';
import { asyncGetLeaderboards } from '../app/states/leaderboards/action';

export default function LeaderboardsPage() {
  const dispatch = useDispatch();
  const { leaderboards } = useSelector((state) => state);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, []);

  return (
    <section>
      <Leaderboards leaderboards={leaderboards} />
    </section>
  );
}
