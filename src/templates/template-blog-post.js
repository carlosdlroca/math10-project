import React from "react"
import { Helmet } from "react-helmet"
import { Link, graphql } from "gatsby"
import "katex/dist/katex.min.css"

export default function Template({ data }) {
  const { markdownRemark: post } = data
  return (
    <div className="blog-post-container min-h-screen bg-orange-300 pb-10">
      <Helmet title={`Math 10 Project - ${post.frontmatter.title}`} />
      <div className="blog-post h-full py-5">
        <Link
          to="/"
          className="text-4xl text-white bg-blue-400 px-5 py-1 rounded"
        >
          Home
        </Link>
        <div
          className="blog-post-content w-11/12 lg:max-w-5xl mx-auto bg-white text-coolGray-800 p-1 md:p-4"
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
