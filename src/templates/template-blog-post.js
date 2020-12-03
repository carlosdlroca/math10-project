import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import "katex/dist/katex.min.css";

export default function Template({ data }) {
  const { markdownRemark: post } = data
  return (
    <div className="blog-post-container h-screen bg-red-900">
      <Helmet title={`Your Blog Name - ${post.frontmatter.title}`} />
      <div className="blog-post h-full">
        <h1 className="text-center text-gray-50">{post.frontmatter.title}</h1>
        <div
          className="blog-post-content w-11/12 lg:max-w-5xl mx-auto bg-white text-gray-800 p-4"
          dangerouslySetInnerHTML={{ __html: post.html }}
        />
      </div>
    </div>
  )
}

export const pageQuery = graphql`
  query BlogPostByPath($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`