import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Parse from 'html-react-parser';
import {
  HashtagIcon,
} from '@heroicons/react/24/outline';

import { asyncGetDetailThread, resetDetailThreadActionCreator } from '../app/states/detailThread/action';
import DetailThreadComments from './DetailThreadComments';
import ThreadAction from './ThreadAction';
import ThreadOwner from './ThreadOwner';

export default function DetailThread() {
  const { id } = useParams();

  const { detailThread } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) dispatch(asyncGetDetailThread(id));
    return () => {
      dispatch(resetDetailThreadActionCreator());
    };
  }, []);

  if (!detailThread || !id) return null;

  return (
    <>
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="text-2xl font-bold">{detailThread.title}</h2>
          <ThreadOwner
            avatar={detailThread.owner.avatar}
            name={detailThread.owner.name}
            createdAt={detailThread.createdAt}
          />
          <div className="line-clamp-3 flex-1">{Parse(detailThread.body)}</div>
          <span className="badge">
            <HashtagIcon className="h-3 w-3" />
            {detailThread.category}
          </span>
          <ThreadAction
            id={id}
            totalComments={detailThread.comments.length}
            upVotesBy={detailThread.upVotesBy}
            downVotesBy={detailThread.downVotesBy}
            type="detail"
          />
        </div>
      </div>
      <DetailThreadComments id={id} comments={detailThread.comments} />
    </>
  );
}
