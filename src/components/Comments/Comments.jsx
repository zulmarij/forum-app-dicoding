import React from 'react';
import PropTypes from 'prop-types';
import CommentsForm from './CommentsForm';
import Comment from './Comment';

export default function DetailThreadComments({ threadId, comments }) {
  return (
    <div className="card bg-base-100 shadow-xl mt-4">
      <div className="card-body">
        <CommentsForm threadId={threadId} />
        {comments.map((comment) => (
          <Comment key={comment.id} threadId={threadId} {...comment} />
        ))}
      </div>
    </div>
  );
}

const commentsShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.objectOf(PropTypes.string).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

DetailThreadComments.propTypes = {
  threadId: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentsShape)).isRequired,
};
