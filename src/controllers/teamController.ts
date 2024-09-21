import Team, { ITeam } from "../models/Team";
import { Request, Response } from "express";
import { ceil } from "lodash";

const splitArrayIntoGroups = (
  arr: Array<{ rank: number; name: string }>,
  numGroups
) => {
  // Sort the array in descending order
  arr.sort((a, b) => b.rank - a.rank);

  const groupMaxSize = arr.length / numGroups;
  // Create an empty array of groups and their sums
  const groups = Array.from({ length: numGroups }, () => []);
  const groupSums = Array(numGroups).fill(0);

  // Distribute digits to minimize the difference between group sums
  for (let i = 0; i < arr.length; i++) {
    // Find the group with the smallest current sum
    groups.forEach((it, i) => {
      if (it.length === groupMaxSize) {
        groupSums[i] = Infinity;
      }
    });
    let minGroupIndex = groupSums.indexOf(Math.min(...groupSums));
    // let allGroupsWithMinSum = groupSums.filter(
    //   (it, i) => it === groupSums[minGroupIndex]
    // );

    // console.log(groupSums);

    // console.log("min sums :", allGroupsWithMinSum);

    // Add the current digit to that group
    groups[minGroupIndex].push(arr[i]);

    // Update the sum of that group
    groupSums[minGroupIndex] += arr[i].rank;
  }

  // Calculate the averages of each group
  let averages = groups.map((group) => {
    let sum = (group as Array<{ rank: number; name: string }>).reduce(
      (acc, val) => ({
        rank: acc.rank + val.rank,
      }),
      { rank: 0 }
    );
    return ceil(sum.rank / group.length, 2);
  });

  return { groups, averages };
};

const createTeams = async (req: Request, res: Response) => {
  const { players, userID, numberOfTeams } = req.body;
  if (players.length % numberOfTeams !== 0) {
    throw new Error(
      "the amount of players cant be equally divide in the selected number of teams"
    );
  }
  let result = splitArrayIntoGroups(players, numberOfTeams);

  console.log("Groups:", result.groups);
  console.log("Averages:", result.averages);

  return res.status(200).json(result);
};

const TeamController = {
  createTeams,
};

export default TeamController;
