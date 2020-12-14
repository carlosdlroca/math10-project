export default function integerPartitions(print) {
  // I wrap our main functions up in this upper/outer function
  // so that i can pass them my custom print function
  // to be used in the app
  // Return printInteger function to be used
  return function printIntegerPartitions(targetSum, maxPartitions) {
    const partitions = Array(maxPartitions).fill(1)
    partitions[0] = targetSum - maxPartitions + 1
    breakUpPartition(partitions)
  }

  function breakUpPartition(partition, appendPartition = [], noPrint = false) {
    // This is here to prevent double printing
    noPrint ? null : print(partition, appendPartition)
    // Find next partition that is not equal to main partition
    let j = 1
    while (partition[j] == partition[0]) j++
    // We found the next partition, partition[j] that is not equal to our first(main) partition
    if (j == partition.length) {
      // We have reached the end, thus we finished breaking up the partition.
      return
      // Will create a double print if all numbers past the first partition are equal to each other
    }
    // Break up the partitions starting from the rightmost partition that is equal to partition[0]
    if (j != 1 && partition[j - 1] == partition[0]) {
      breakUpPartition(
        partition.slice(j - 1),
        [...appendPartition, ...partition.slice(0, j - 1)],
        true
      )
    }

    if (partition[j] > 2) {
      // lets break up this partition[j] into smaller partitions if its greater than 2
      breakUpPartition(
        partition.slice(j),
        [...appendPartition, ...partition.slice(0, j)],
        true
      )
    }
    // Lets take off 1 from the rightmost partition that is equal to our first(main) partition: partition[j-1]
    // then add it the next partition that is less than our partition - 1.
    if (partition[j - 1] == partition[0]) {
      let i = j
      while (i < partition.length) {
        if (partition[i] + 1 >= partition[j - 1]) {
          i++
        } else {
          partition[j - 1]--
          partition[i]++
          return breakUpPartition([...partition], [...appendPartition])
        }
      }
    }
  }
}
