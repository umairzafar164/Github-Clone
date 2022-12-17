import { Router, Request, Response } from 'express';
import fetch from 'node-fetch';
import jsonData from '../../data/repos.json';

export const repos = Router();

repos.get('/', async (_: Request, res: Response) => {
  res.header('Cache-Control', 'no-store');
  // TODO: See README.md Task (A). Return repo data here. You’ve got this!
  const url = 'https://api.github.com/users/silverorange/repos';
  const options = {
    method: 'GET',
  };
  const response = await fetch(url, options)
    .then((data: any) => data.json())
    .catch((e: any) => {
      const error = new Error('Error fetching data');
      throw error;
    });
  if (response.length > 0) {
    const aggregatedData = response.concat(jsonData);
    const filteredData = aggregatedData.filter((d: any) => d.fork === false);
    res.status(200).json(filteredData);
  } else {
    res.status(401).json({ message: 'Could not fetch repos data' });
  }
});
