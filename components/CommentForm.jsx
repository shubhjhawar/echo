import React, {useEffect,useState, useRef} from 'react';

import { submitComment } from '@/services';

const CommentForm = ({ slug }) => {
  const [error, setError] = useState(false);
  const [localStorage, setLocalStorage] = useState(null);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const commentEl = useRef(null);
  const nameEl = useRef(null);
  const emailEl = useRef(null);
  const storeDataEl = useRef(null);

  useEffect(() => {
    if(nameEl.current && emailEl.current) {
    nameEl.current.value = window.localStorage.getItem('name');
    emailEl.current.value = window.localStorage.getItem('email');
    }
  }, [])
  

  const handleCommentSubmission = () => {
    setError(false);

    const {value: comment} = commentEl.current || {};
    const {value: name} = nameEl.current || {};
    const {value: email} = emailEl.current || {};
    const {checked: storeData } = storeDataEl.current || {};

    if(!comment || !name ||!email )
    {
      setError(true);
      return;
    }

    const commentObj = { name, email, comment, slug };

    if(storeData){
      window.localStorage.setItem('email', email);
      window.localStorage.setItem('name', name);
    } else {
      window.localStorage.removeItem('name', name);
      window.localStorage.removeItem('email', email);
    }

    submitComment(commentObj)
      .then((res) => {
        setShowSuccessMessage(true);
        setTimeout(() => {
          setShowSuccessMessage(false);
        }, 3000);
      })
  }

  
  return (
    <div className='bg-white shadow-lg rounded-lg p-8 pb-12 mb-8'>
      <h3 className='text-xl mb-8 font-semibold border-b pb-4 text-black'>Add Comment</h3>
      <div className="grid grid-cols-1 gap-4 mb-4">
        <textarea 
          ref={commentEl} 
          className='p-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          placeholder='comment'
          name='comment'
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <input 
          type="text" ref={nameEl}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          name='name'
          placeholder="name"
        />
        <input 
          type="text" ref={emailEl}
          className='py-2 px-4 outline-none w-full rounded-lg focus:ring-2 focus:ring-gray-200 bg-gray-100 text-gray-700'
          name='email'
          placeholder="email"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div>
          <input 
            ref={storeDataEl}
            type="checkbox"
            id="storeData"
            name="storeData"
            value="true"
          />
          <label className='text-gray-500 cursor-pointer ml-2' htmlFor='storeData'>Save my email and name for next time I comment</label>
        </div>
      </div>

      {error && <p className='text-xs text-red-500'>All Fields are required!</p>}
      <div className='mt-8'>
        <button
          type="button"
          onClick={handleCommentSubmission}
          className="transition duration-500 ease hover:bg-indigo-900 inline-block bg-pink-600 text-lg rounded-full px-8 py-3 cursor-pointer"
        >
          Post Comment
        </button>
        {showSuccessMessage && <span className='text-xl float-right font-semibold mt-3 text-green-500'>Comment submitted for review</span>}
      </div>
    </div>
  )
}

export default CommentForm