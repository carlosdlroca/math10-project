import React, { useState } from "react"
import { Link } from "gatsby"
import integerPartitions from "../algorithms/integerPartitions"

export default function IntegerPartitions() {
  const [state, setState] = useState({
    maxPartitions: 1,
    targetSum: 1,
    partitions: [],
  })

  function handleOnChange(e) {
    e.persist()
    setState(prevState => ({
      ...prevState,
      [e.target.name]: Number(e.target.value),
    }))
  }

  function handleSubmit(e) {
    e.persist()
    e.preventDefault()
    const getPartitions = integerPartitions(addPartition)
    setState(prevState => ({
      ...prevState,
      partitions: [],
    }))
    getPartitions(state.targetSum, state.maxPartitions)
  }

  function addPartition(partition, appendPartition) {
    setState(prevState => ({
      ...prevState,
      partitions: [
        ...prevState.partitions,
        [...appendPartition, ...partition].join(" + "),
      ],
    }))
  }

  return (
    <div className="my-12 bg-coolGray-500 py-4 px-1 md:px-5">
      <h2 className="text-xl md:text-3xl font-bold mb-5">
        Find all n partitions of an integer
      </h2>
      <form onSubmit={handleSubmit}>
        <label>
          Max Partitions
          <input
            className="text-black"
            type="number"
            name="maxPartitions"
            min="1"
            placeholder="Number of Partitions"
            value={state.maxPartitions}
            onChange={handleOnChange}
          />
        </label>
        <label>
          Target Sum
          <input
            className="text-black"
            type="number"
            name="targetSum"
            min="1"
            placeholder="Number of Partitions"
            value={state.targetSum}
            onChange={handleOnChange}
          />
        </label>
        <button className="bg-blue-400 hover:bg-blue-300 p-1 md:px-4 md:py-5 text-md md:text-xl text-white">
          Get Partitions
        </button>
      </form>
      <section className="flex flex-col">
        <Link
          to="/integer-partitions-doc"
          className="text-xl underline text-orange-400 hover:text-white mt-5"
        >
          Write up
        </Link>
        <a
          className="text-xl underline text-orange-400 hover:text-white mt-5"
          href="https://repl.it/@aisu_kurimu/integerPartitions-finallySOLVED#index.js"
        >
          Link to more accurate code
        </a>
      </section>
      <DisplayIntegerPartitions partitions={state.partitions} />
    </div>
  )
}

function DisplayIntegerPartitions({ partitions }) {
  if (partitions.length < 1) {
    return <p className="text-4xl">Lets See some integer partitions</p>
  }

  return (
    <div className="">
      {partitions.map(partition => (
        <p className="text-2xl">{partition}</p>
      ))}
    </div>
  )
}
