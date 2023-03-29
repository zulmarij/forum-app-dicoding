import React from 'react';
import PropTypes from 'prop-types';
import Parse from 'html-react-parser';
import { HashtagIcon } from '@heroicons/react/24/outline';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ThreadOwner from './ThreadOwner';
import ThreadAction from './ThreadAction';

export default function ThreadItem({
  id, title, body, category, createdAt, ownerId, totalComments, upVotesBy, downVotesBy,
}) {
  const { users } = useSelector((state) => state);

  const owner = users.find((user) => user.id === ownerId);

  return (
    <div className="card bg-base-100 shadow-xl hover:scale-105 duration-300">
      <div className="card-body">
        <h2 className="card-title line-clamp-2 text-xl"><Link to={`/threads/${id}`}>{title}</Link></h2>
        <ThreadOwner avatar={owner.avatar} name={owner.name} createdAt={createdAt} />
        <div className="line-clamp-3 flex-1">{Parse(body)}</div>
        <span className="badge">
          <HashtagIcon className="h-3 w-3" />
          {category}
        </span>
        <ThreadAction
          id={id}
          totalComments={totalComments}
          upVotesBy={upVotesBy}
          downVotesBy={downVotesBy}
          type="item"
        />
      </div>
    </div>
  );
}

ThreadItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  ownerId: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};
