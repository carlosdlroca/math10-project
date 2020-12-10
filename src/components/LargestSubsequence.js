import React, { useState } from "react"
import { Link } from "gatsby"
import findLongestSequence from "../algorithms/findLongestSequence"

export default function LargestSubsequence() {
  const [state, setState] = useState({
    sequence: "",
    increasing: null,
    decreasing: null,
  })

  function handleSubmit(e) {
    e.persist()
    e.preventDefault()

    const [increasing, decreasing] = findLongestSequence(
      state.sequence.split("")
    )
    setState(prevState => ({ ...prevState, increasing, decreasing }))
  }

  function handleInput(e) {
    e.persist()
    setState(prevState => ({
      ...prevState,
      sequence: e.target.value,
      increasing: null,
      decreasing: null,
    }))
  }

  return (
    <div className="my-12 bg-coolGray-500 py-4 px-1 md:px-5">
      <h2 className="text-xl font-bold mb-5 md:text-3xl">
        Find Largest Increasing/Decreasing subsequences
      </h2>
      <form onSubmit={handleSubmit} className="flex mb-5 flex-wrap">
        <input
          type="text"
          name="sequence"
          value={state.sequence}
          onChange={handleInput}
          className="text-orange-500 text-4xl md:text-3xl flex-grow"
        />
        <button className="bg-blue-400 hover:bg-blue-300 p-1 md:px-4 md:py-5 text-md md:text-xl text-white">
          Calculate
        </button>
      </form>
      {state.sequence.length > 0 && state.increasing && state.decreasing && (
        <>
          <h2 className="text-xl mb-4">
            Largest Increasing Sequence:{" "}
            <span className="text-2xl font-bold text-green-500">
              {state.sequence.slice(
                state.increasing[0],
                state.increasing[1] + 1
              )}
            </span>
          </h2>
          <h2 className="text-xl">
            Largest Decreasing Sequence:{" "}
            <span className="text-2xl font-bold text-red-400">
              {state.sequence.slice(
                state.decreasing[0],
                state.decreasing[1] + 1
              )}
            </span>
          </h2>
        </>
      )}
      <Link
        to="/largest-sequence-doc"
        className="text-xl underline text-orange-400 hover:text-white mt-5"
      >
        Write up
      </Link>
    </div>
  )
}
