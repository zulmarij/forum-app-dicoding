import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAutoFocus, useInput } from '../../hooks';
import { asyncCreateComment } from '../../app/states/detailThread/action';

const CommentInput = forwardRef(({ onChange, value }, ref) => (
  <textarea
    ref={ref}
    value={value}
    onChange={onChange}
    className="textarea textarea-bordered w-full h-24"
    placeholder="Comment"
  />
));

export default function CommentsForm({ threadId }) {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state);
  const { hash } = useLocation();
  const commentFocus = useAutoFocus(hash);
  const [content, setContent, changeContent] = useInput();

  const onCreateComment = () => {
    dispatch(asyncCreateComment({ threadId, content })).then(({ status }) => {
      if (status === 'success') {
        changeContent('');
      }
    });
  };

  return (
    <>
      <p className="font-bold">COMMENT</p>
      {authUser ? (
        <>
          <CommentInput
            ref={commentFocus}
            value={content}
            onChange={setContent}
          />
          <div className="card-actions mb-2">
            <button type="button" className="btn" onClick={onCreateComment}>
              Post Comments
            </button>
          </div>
        </>
      ) : (
        <div>
          <Link className="link" to="/login">
            <strong>Login</strong>
          </Link>
          {' '}
          to post a comment
        </div>
      )}
    </>
  );
}

CommentInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

CommentsForm.propTypes = {
  threadId: PropTypes.string.isRequired,
};
