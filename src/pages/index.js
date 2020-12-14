import React from "react"
import SEO from "../components/seo"
import LargestSubsequence from "../components/LargestSubsequence"
import IntegerPartitions from "../components/IntegerPartition"
const IndexPage = () => (
  <>
    <SEO title="Home" />
    <h1 className="bg-orange-500 text-white py-2 text-center font-bold text-3xl md:text-6xl ">
      Math 10 Project
    </h1>

    <LargestSubsequence />
    <IntegerPartitions />
  </>
)

export default IndexPage
