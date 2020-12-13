---
path: "/largest-sequence-doc"
date: 2020-12-02T17:12:33.962Z
title: "Algorithm"
---

# Algorithm 1: Largest Increasing/Decreasing sequence

**Problem**: Find the largest _increasing_ or _decreasing_ subsequence in a given sequence of integers.

I wanted to solve this problem by traversing the list once.
To solve it this way, I kept track of the the current longest
increasing/decreasing subsequences represented as an ordered pair
of the starting and ending indices.
My function starts out by initializing

    function findLongestSequence(sequence) {
      let longestIncreasing = [0,0];
      let longestDecreasing = [0,0];
    }

When I traverse the sequence, I'll keep track of the current sequence by keeping 1 pointer at the start of a sequence and another at the current point the loop is going through.
So, one pointer, **i**, will keep track of the start of the current subsequence when we encounter a new one. And another pointer, **curr**, will be at the front of any new sequence.

    function findLongestSequence(sequence) {
      let longestIncreasing = [0,0]
      let longestDecreasing = [0,0]

      let i = 0;
      for(let curr = 1; curr < sequence.length; curr++) {
        ...
      }
    }

I also want to be able to keep track of whether a sequence is increasing or not. So I used two variables to keep track of that.

    function findLongestSequence(sequence) {
      let longestIncreasing = [0,0]
      let longestDecreasing = [0,0]

      let isIncreasing, wasIncreasing;

      let i = 0;
      for(let curr = 1; curr < sequence.length; curr++) {
        if(sequence[curr] > sequence[curr - 1]) {
          isIncreasing = true
        } else {
          isIncreasing = false
        }
        // I need to initialize wasIncreasing in the first iteration to avoid errors.
        if(wasIncreasing == null) {
          wasIncreasing = isIncreasing
        }
        //
        //
        //
        wasIncreasing = isIncreasing
      }
    }

At the start of each loop iteration, I check whether the current item in the sequence is larger than the previous one. If so, the current subsequence is increasing, or is _not_ increasing otherwise. I assign the value of **isIncreasing** to **wasIncreasing** at the end of the loop so I can compare the current and next states of the subsequence in the next iteration.

We have to update the order pairs whenever there is a switch in direction of the sequence.
For example:

1. Sequence goes from increasing to decreasing
   - We know that in this case, the sequence finished an increasing subsequence
2. Sequence goes from decreasing to increasing
   - We know that in this case, the sequence finished a decreasing sequence so we check whether this decreasing sequence is larger than the last recorded decreasing sequence.

Now I just update the corresponding values for the longest increasing or longest decreasing subsequences by updating the values for their ordered pairs if they meet those conditions above.

    function findLongestSequence(sequence) {
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
          if (curr - 1 - i >= longestDecreasing[1] - longestDecreasing[0]) {
            longestDecreasing = [i, curr - 1]
          }
          i = curr - 1
        }
        if (!isIncreasing && wasIncreasing) {
          if (curr - 1 - i >= longestIncreasing[1] - longestIncreasing[0]) {
            longestIncreasing = [i, curr - 1]
          }
          i = curr - 1
        }
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
        wasIncreasing = isIncreasing
      }
    return [longestIncreasing, longestDecreasing]

}

After the I am done traversing the sequence, I return both **longestIncreasing** and **longestDecreasing**.

# Time Complexity **Θ**(n)

Overall the time complexity of this algorithm is just some $n$.
We first initialize **5** variables which would be created in constant time.
We traverse the sequence in $n-1$ because we are skipping the first element of the sequence.

Each time the loop runs, there are at least 8 operations running:

1. increasing the value of curr
2. condition to check if curr is less than the length of the sequence
3. the check to see if the sequence is running
4. then updating the value
5. initializing wasIncreasing value the first time through
6. the check to see if we completed a decreasing sequence
7. the check to see if we completed an increasing sequence
8. the check to see if the loop is about to end
9. finally setting the value of wasIncreasin to isIncreasing

Our best case scenario is if our whole sequence is only increasing or decreasing throughout.
In which case, only the last conditional statement would be met, which has two nested conditionals with one more conditions inside.

So the time complexity is at best $9(n-1) + 11$.
(+7 for the first variables initialized before the loop, and the next +4 for the last checks at the end of a loop)

$Θ(9n - 9 + 11) = Θ(9n + 2)$
