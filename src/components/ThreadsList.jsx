import React from 'react';
import PropTypes from 'prop-types';
import ThreadItem from './ThreadItem';

export default function ThreadsList({ threads }) {
  return (
    <article>
      <h1 className="font-bold text-2xl">Threads</h1>
      {threads ? (
        <article className="grid lg:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-4 mt-2">
          {threads.map((thread) => (
            <ThreadItem
              key={thread.id}
              id={thread.id}
              title={thread.title}
              body={thread.body}
              category={thread.category}
              createdAt={thread.createdAt}
              ownerId={thread.ownerId}
              totalComments={thread.totalComments}
              upVotesBy={thread.upVotesBy}
              downVotesBy={thread.downVotesBy}
            />
          ))}
        </article>
      ) : (
        <p>Thread not found</p>
      )}
    </article>
  );
}

const threadsShape = {
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

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadsShape)).isRequired,
};
