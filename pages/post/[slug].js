import React from 'react';


import { getPosts, getPostDetails } from '@/services';
import { PostDetail, Categories, PostWidget, Author, Comments,CommentForm} from "../../components";

const PostDetails = ({ post }) => {
  return (
    <div className="container mx-auto px-20 mb-8">
        {/* creating a grid */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
            {/* spanning the cols based on screen size */}
            <div className='col-span-1 lg:col-span-8'>
                <PostDetail post={post}/>
                <Author author={post.author}/>
                <CommentForm slug={post.slug} />
                <Comments slug={post.slug} />
            </div>
            <div className='col-span-1 lg:col-span-4'>
                <div className='relative lg:sticky top-8'>
                    <PostWidget slug={post.slug} categories={post.categories.map((category)=> category.slug)} />
                    <Categories />
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostDetails;

export async function getStaticProps({ params }) {
    const data = await getPostDetails(params.slug);
  
    return {
      props: {post: data}
    }
  }
// this is required for dynamic paths url
export async function getStaticPaths() {
    // get all the posts
    const posts = await getPosts();

    return {
        // return the slug of all the posts in the params
        paths: posts.map(({node: {slug}})=>({params : {slug}})),
        fallback: false,
    }
}