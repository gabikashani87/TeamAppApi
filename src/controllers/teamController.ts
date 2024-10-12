import Team, { ITeam } from "../models/Team";
import { Request, Response } from "express";
import { ceil } from "lodash";
import User from "../models/User";

interface Player {
  rank: number;
  name: string;
}

const splitArrayIntoGroups = (
  arr: Array<{ rank: number; name: string }>,
  numGroups
) => {
  arr.sort((a, b) => b.rank - a.rank);

  const groupMaxSize = arr.length / numGroups;
  const groups: Array<Array<Player>> = Array.from(
    { length: numGroups },
    () => []
  );
  const groupSums: Array<number> = Array(numGroups).fill(0);

  for (let i = 0; i < arr.length; i++) {
    groups.forEach((it, i) => {
      if (it.length === groupMaxSize) {
        groupSums[i] = Infinity;
      }
    });
    let minGroupIndex = groupSums.indexOf(Math.min(...groupSums));

    groups[minGroupIndex].push(arr[i]);

    groupSums[minGroupIndex] += arr[i].rank;
  }

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

  const teamsCreation: Array<Promise<any>> = result.groups.map((team) => {
    return addTeamToDB({ players: team, userID: req.body.userID });
  });

  await Promise.all(teamsCreation);

  console.log("Groups:", result.groups);
  console.log("Averages:", result.averages);

  return res.status(200).json(result);
};

const addTeamToDB = async ({
  players,
  userID,
}: {
  players: Array<Player>;
  userID: string;
}) => {
  const user = await User.findById(userID);

  const createdTeam = new Team({ players, user });
  debugger;
  let result = await createdTeam.save();
  return result;
};

const TeamController = {
  createTeams,
};

export default TeamController;
