import React from 'react';
import PropTypes from 'prop-types';
import {
  ChatBubbleLeftRightIcon,
  HandThumbDownIcon as HandThumbDownIconOutline,
  HandThumbUpIcon as HandThumbUpIconOutline,
} from '@heroicons/react/24/outline';
import {
  HandThumbDownIcon as HandThumbDownIconFilled,
  HandThumbUpIcon as HandThumbUpIconFilled,
} from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { asyncToggleVoteDetailThread } from '../app/states/detailThread/action';
import { asyncToggleVoteThread } from '../app/states/threads/action';

export default function ThreadAction({
  id, totalComments, upVotesBy, downVotesBy, type,
}) {
  const { authUser } = useSelector((state) => state);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToggleVoteThread = (voteType) => {
    if (authUser) {
      if (type === 'detail') {
        dispatch(asyncToggleVoteDetailThread({ threadId: id, voteType, userId: authUser.id }));
      }
      if (type === 'item') {
        dispatch(asyncToggleVoteThread({ threadId: id, voteType, userId: authUser.id }));
      }
    } else {
      alert('Please login first');
    }
  };

  return (
    <div className="card-actions">
      <div className="flex items-center">
        <span>{upVotesBy.length}</span>
        <button type="button" className="btn btn-ghost btn-sm btn-circle" onClick={() => onToggleVoteThread(upVotesBy.includes(authUser?.id) ? 0 : 1)}>
          {upVotesBy.includes(authUser?.id) ? (
            <HandThumbUpIconFilled className="h-5 w-5" />
          ) : (
            <HandThumbUpIconOutline className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex items-center">
        <span>{downVotesBy.length}</span>
        <button type="button" className="btn btn-ghost btn-sm btn-circle" onClick={() => onToggleVoteThread(downVotesBy.includes(authUser?.id) ? 0 : -1)}>
          {downVotesBy.includes(authUser?.id) ? (
            <HandThumbDownIconFilled className="h-5 w-5" />
          ) : (
            <HandThumbDownIconOutline className="h-5 w-5" />
          )}
        </button>
      </div>
      <div className="flex items-center">
        <span>{totalComments}</span>
        <button type="button" className="btn btn-ghost btn-sm btn-circle" onClick={() => navigate(`/threads/${id}#comments`)}>
          <ChatBubbleLeftRightIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

ThreadAction.propTypes = {
  id: PropTypes.string.isRequired,
  totalComments: PropTypes.number.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};
