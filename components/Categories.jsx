import React, {useState, useEffect} from 'react';
import Link from 'next/link';

import { getCategories } from '@/services';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories()
      .then((newCategories) => setCategories(newCategories))
  }, [])

  
  return (
    <div className="bg-white shadow-lg p-8 mb-8 rounded-lg text-black">
      <h3 className='font-semibold text-xl border-b pb-4 mb-8'>Categories</h3>
      {categories.map((category)=> (
          <Link key={category.slug} href={`/category/${category.slug}`}>
            <span className="cusrsor-pointer block pb-3 mb-3">
              {category.name}
            </span>
          </Link>
        ))}
    </div>
  )
}

export default Categories