export default function findLongestSequence(sequence) {
  let longestIncreasing = [0, 0]
  let longestDecreasing = [0, 0]
  let i = 0
  let isIncreasing, wasIncreasing

  for (let curr = 1; curr < sequence.length; curr++) {
    if (sequence[curr] > sequence[curr - 1]) {
      isIncreasing = true
    } else {
      isIncreasing = false
    }

    if (wasIncreasing == null) {
      wasIncreasing = isIncreasing
    }

    if (isIncreasing && !wasIncreasing) {
      // if sequence is currently increasing,
      // but was decreasing before
      // Then update longestIncreasingTuple.
      if (curr - 1 - i >= longestDecreasing[1] - longestDecreasing[0]) {
        longestDecreasing = [i, curr - 1]
      }
      // now set i to current, because we
      // are starting a new sequence
      i = curr - 1
    }
    if (!isIncreasing && wasIncreasing) {
      // if sequence is currently decreasing,
      // but was increasing before
      // We need to update longestIncreasing, if previous sequence is longer than the last decreasing sequence.
      if (curr - 1 - i >= longestIncreasing[1] - longestIncreasing[0]) {
        longestIncreasing = [i, curr - 1]
      }
      i = curr - 1
    }
    // If we have reached the end of the sequence.
    // We need to update the longesIncreasing/Decreasing
    // tuples if the current sequence is longer than the last
    if (curr == sequence.length - 1) {
      if (isIncreasing && wasIncreasing) {
        if (curr - i > longestIncreasing[1] - longestIncreasing[0]) {
          longestIncreasing = [i, curr]
        }
      }
      if (!isIncreasing && !wasIncreasing) {
        if (curr - i > longestDecreasing[1] - longestDecreasing[0]) {
          longestDecreasing = [i, curr]
        }
      }
    }
    // capture last isIncreasing state
    wasIncreasing = isIncreasing
  }
  return [longestIncreasing, longestDecreasing]
}
