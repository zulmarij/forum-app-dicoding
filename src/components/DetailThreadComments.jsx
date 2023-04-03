import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import Parser from 'html-react-parser';
import {
  HandThumbDownIcon as HandThumbDownIconOutline,
  HandThumbUpIcon as HandThumbUpIconOutline,
} from '@heroicons/react/24/outline';
import {
  HandThumbDownIcon as HandThumbDownIconFilled,
  HandThumbUpIcon as HandThumbUpIconFilled,
} from '@heroicons/react/24/solid';
import { useDispatch, useSelector } from 'react-redux';
import { useAutoFocus, useInput } from '../hooks';
import { asyncCreateComment, asyncToggleVoteCommentThread } from '../app/states/detailThread/action';
import ThreadOwner from './ThreadOwner';

const CommentInput = forwardRef(({ onChange, value }, ref) => (
  <textarea
    ref={ref}
    value={value}
    onChange={onChange}
    className="textarea textarea-bordered w-full h-24"
    placeholder="Comment"
  />
));

export default function DetailThreadComments({ id, comments }) {
  const { hash } = useLocation();
  const { authUser } = useSelector((state) => state);
  const dispatch = useDispatch();
  const commentFocus = useAutoFocus(hash);
  const [content, setContent, changeContent] = useInput();

  const onCreateComment = () => {
    dispatch(asyncCreateComment({ threadId: id, content })).then(({ status }) => {
      if (status === 'success') {
        changeContent('');
      }
    });
  };

  const onToggleVoteComment = ({ voteType, commentId }) => {
    if (authUser) {
      dispatch(asyncToggleVoteCommentThread({
        threadId: id, voteType, userId: authUser.id, commentId,
      }));
    } else {
      alert('Please login first');
    }
  };

  return (
    <div className="card bg-base-100 shadow-xl mt-4">
      <div className="card-body">
        <p className="font-bold">COMMENT</p>
        {authUser ? (
          <>
            <CommentInput ref={commentFocus} value={content} onChange={setContent} />
            <div className="card-actions mb-2">
              <button type="button" className="btn" onClick={onCreateComment}>
                Post Comments
              </button>
            </div>
          </>
        )
          : (
            <div>
              <Link className="link" to="/login"><strong>Login</strong></Link>
              {' '}
              to post a comment
            </div>
          )}

        {comments.map((comment) => (
          <div key={comment.id} className="card bg-base-200 shadow-md mt-2">
            <div className="card-body">
              <ThreadOwner
                avatar={comment.owner.avatar}
                name={comment.owner.name}
                createdAt={comment.createdAt}
              />
              <div>{Parser(comment.content)}</div>
              <div className="card-actions">
                <div className="flex items-center">
                  <span>{comment.upVotesBy.length}</span>
                  <button type="button" className="btn btn-ghost btn-sm btn-circle" onClick={() => onToggleVoteComment({ voteType: comment.upVotesBy.includes(authUser?.id) ? 0 : 1, commentId: comment.id })}>
                    {comment.upVotesBy.includes(authUser?.id) ? (
                      <HandThumbUpIconFilled className="h-5 w-5" />
                    ) : (
                      <HandThumbUpIconOutline className="h-5 w-5" />
                    )}
                  </button>
                </div>
                <div className="flex items-center">
                  <span>{comment.downVotesBy.length}</span>
                  <button type="button" className="btn btn-ghost btn-sm btn-circle" onClick={() => onToggleVoteComment({ voteType: comment.downVotesBy.includes(authUser?.id) ? 0 : -1, commentId: comment.id })}>
                    {comment.downVotesBy.includes(authUser?.id) ? (
                      <HandThumbDownIconFilled className="h-5 w-5" />
                    ) : (
                      <HandThumbDownIconOutline className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

CommentInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

const commentsShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DetailThreadComments.propTypes = {
  id: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentsShape)).isRequired,
};
