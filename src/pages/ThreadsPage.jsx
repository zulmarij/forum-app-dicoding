/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useDispatch, useSelector } from 'react-redux';
import ThreadsList from '../components/ThreadsList';
import ThreadModalAdd from '../components/ThreadModalAdd';
import { asyncPopulateUsersAndThreads } from '../app/states/shared/action';

export default function ThreadsPage() {
  const dispatch = useDispatch();
  const { threads, authUser } = useSelector((state) => state);
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, []);

  const threadsList = threads.filter((thread) => thread.category.includes(keyword));
  const categories = threads
    .map((item) => item.category)
    .filter(
      (category, index, currentCategory) => currentCategory.indexOf(category) === index,
    );

  return (
    <section>
      <h1 className="font-bold text-2xl">All Categories</h1>
      <div className="flex gap-2 mb-4 mt-2">
        {categories.map((category) => (
          <button key={category} type="button" className={`btn btn-sm gap-2 ${category !== keyword.toLocaleLowerCase() ? 'btn-outline' : ''}`} onClick={() => setKeyword((state) => (state === category ? '' : category))}>
            #
            {category}
          </button>
        ))}
      </div>
      <ThreadsList threads={threadsList} />
      {authUser && (
        <>
          <label
            htmlFor="create-thread-modal"
            className="btn btn-circle fixed right-8 bottom-16"
          >
            <PlusIcon className="h-6 w-6" />
          </label>
          <ThreadModalAdd />
        </>
      )}
    </section>
  );
}
