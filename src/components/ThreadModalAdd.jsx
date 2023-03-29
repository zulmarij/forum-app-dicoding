import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDispatch } from 'react-redux';
import { useInput, useToggle } from '../hooks';
import { asyncCreateThread } from '../app/states/threads/action';

export default function ThreadModalAdd() {
  const dispatch = useDispatch();
  const [title, setTitle, changeTitle] = useInput('');
  const [category, setCategory, changeCategory] = useInput('');
  const [body, setBody, changeBody] = useInput('');
  const [checked, setChecked, changeChecked] = useToggle(false);

  const onToggleChecked = () => {
    setChecked();
    changeTitle('');
    changeCategory('');
    changeBody('');
  };

  const onCreateThread = () => {
    dispatch(asyncCreateThread({ title, body, category })).then(({ status }) => {
      if (status === 'success') {
        changeChecked(false);
      }
    });
  };

  return (
    <>
      <input type="checkbox" id="create-thread-modal" className="modal-toggle" checked={checked} onChange={onToggleChecked} />
      <div className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative">
          <button type="button" className="btn btn-xs btn-circle absolute right-2 top-2" onClick={onToggleChecked}>
            <XMarkIcon />
          </button>
          <h3 className="font-bold text-lg">Create Thread</h3>
          <div className="flex flex-col gap-3 py-4">
            <input
              type="text"
              placeholder="Title"
              className="input input-bordered w-full"
              value={title}
              onChange={setTitle}
            />
            <input
              type="text"
              placeholder="Category"
              className="input input-bordered w-full"
              value={category}
              onChange={setCategory}
            />
            <textarea
              value={body}
              onChange={setBody}
              className="textarea textarea-bordered w-full h-24"
              placeholder="Body"
            />
          </div>
          <div className="modal-action justify-center">
            <button type="button" className="btn" onClick={onCreateThread}>Add Thread</button>
          </div>
        </div>
      </div>
    </>
  );
}
