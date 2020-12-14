---
path: "/integer-partitions-doc"
date: 2020-12-12T17:12:33.962Z
title: "Generate N partitions of an Integer"
---

# Algorithm 1: Generate n partitions of an Integer

For this problem, I wanted to find a way to generate all unique partitions of an integer. By unique I mean that any permutation of a partition is still the same partition. For example, the $5$ partition of $12$ can be $4 + 4 + 2 + 1 + 1 = 12$ or $1 + 2 + 4 + 1 + 4 = 12$ but those are the same partitions, but reordered in some other way.

Now, I do not want to include zeros in the partition of any integer because I did not want to test for zeros. Instead, I knew I could spread out 1s throughout the given partitions and add the rest of the numbers onto the first partition. For example, if I wanted the $4$ partitions of the number $22$, I would create an array of size 4, fill it up with 1s

    // 4 partitions of 22
    [1, 1, 1, 1]
    // left with 21 - 4 = 18 numbers to spread out through the partitions

Now I just want to add the left over numbers into the first partition.

    [19, 1, 1, 1]
    // 19 + 1 + 1 + 1 = 22

This will be our starting off point for every integer partition. The way I have seen it before starting to create the algorithm, I have 19 stacked blocks on the left hand side, and my goal is to spread all these blocks to create a flat surface. The first case looks like right-triangle with its back against the left wall, and the goal would be to turn that triangle into a flat rectangle.

Thats the visualization that helped me generate the unique integer partitions.

It may be hard to read through the code, so I will walk you through it.

The important function to take a look at is the **breakUpPartitions** function, it takes in the main partition I want to break up, called **partition**.The second parameter is another partition that I append to the start of another partition is called the **appendPartition**. The last parameter this function takes is the **noPrint** boolean which helps the function decide when to print a partition.

This function recursively breaks up the partition at a point in the partition that can be broken up.

I always focus on the first part of a partition. Once this part cannot be broken up further, or if all the parts are the same size as this part, I are finished. I have reached all unique partitions.

So this function starts by looking for the next partition that is not equal to our main/first part. Once I found it, I can decide whether to add more to it or break it apart. This part will be called **smallest**. In my code it will be **j**

if the neighbor next to smallest is the same size as our main/first part, I need to call this function again but with a new set of parameters.

    if (smallest != 1 && partition[smallest - 1] == partition[0]) {
      breakUpPartition(
        partition.slice(smallest - 1),
        [...appendPartition, ...partition.slice(0, smallest - 1)],
        true
      )
    }

This will break up the partition in a way that can only be reached if I break down the partition into a smaller partition. You can see that I break up the partition starting from the smaller's neighbor all the way to the end, and breaking up that new shorter partition. Just as long as the **smallest** part I found is not the neighbor to the main/first part I focus on.

Moving along, if when I encounter **smallest** and if it is greater than 2, then I break up the partition from smallest all the way to the end.

    if (partition[smallest] > 2) {
      // lets break up this partition[smallest] into smaller partitions if its greater than 2
      breakUpPartition(
        partition.slice(smallest),
        [...appendPartition, ...partition.slice(0, smallest)],
        true
      )
    }

The reason I check for if the **smallest** part is greater than 2 is because I can't break down the two any further. If I take one from the 2, and add it to the next one, I just swapped the order of the two parts, which is not unique. Checking whether a part and its next neighber have difference by 1 is an important check that I make later in the function.

Now the last part of the function. This part of the function removes 1 from the leftmost neighbor of smallest, and adds that one to the next part that is less than the leftmost neighbr of smallest - 1.

This check is important because I want to make sure Im not adding a one to a partition that will become larger or equal to the part that i removed a one from. It would miss out on a partition

    if(partition[smallest-1] == partition[0]) {
      let i = smallest;
      while(i < partition.length) {
        if(partition[i] + 1 >= partition[smallest-1]) {
          i++
        } else {
          partition[smallest - 1]--;
          partition[i]++;
          return breakUpPartition([...partition], [...appendPartition]);
        }
      }
    }

# Time Complexity

The function breaks up the partition n-1 times, so at an average case would have the function iterated some (n-1)! amount of times.

# Results

Unfortunately, due to the placement of the print function, some partitions are printed more than once. That is because of the recursive calls jumping back to the last time they were called.

As far as generating unique function, I do not know if it truly generates unique partitions of size n. Anything past the target sum of 15 would generate a lot of partitions for me to check.

Also, the print function does not behave properly when used in the app.
The best way to get more accurate results would be to run the app hosted on my repl <a href="https://repl.it/@aisu_kurimu/integerPartitions-finallySOLVED#index.js" class="text-orange-500 text-3xl">LINK</a>
