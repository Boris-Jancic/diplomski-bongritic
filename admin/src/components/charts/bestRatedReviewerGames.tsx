import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { Box, Divider, Heading, HStack, VStack } from '@chakra-ui/react';
import { getTopRatedUserGames } from '../../api/blogs/blogService';
import { Blog } from '../../interface/post';
import { string } from 'yup';

ChartJS.register(ArcElement, Tooltip, Legend);


export function BestReviewerGamesPieChart() {
  const [games, setGames] = useState<any>()
  let dataReviewerGames = {labels: [''], datasets: [{label: '', data: [], backgroundColor: [''], borderColor: [''], borderWidth: 3}]}
  let dataUserGames = {labels: [''], datasets: [{label: '', data: [], backgroundColor: [''], borderColor: [''], borderWidth: 3}]}

  useEffect(() => {
    getTopRatedUserGames().then(res => setGames(res.data))
  }, [])
    console.log(games)
  if (games) {
    dataReviewerGames = {
      labels: games.reviewerTopGames.map((item: any) => item.game),
      datasets: [
        {
          label: 'Best games',
          data: games.reviewerTopGames.map((item: any) => item.criticGrade),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 3,
        },
      ],
    };
    dataUserGames = {
      labels: games.userTopGames.map((item: any) => item.game),
      datasets: [
        {
          label: 'Best games',
          data: games.userTopGames.map((item: any) => item.userGrade), 
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 3,
        },
      ],
    };
  }

  return (
        <Box my={16} border='1px' rounded={25} padding={5}>
          <HStack>
            <Box>
              <Heading fontSize='h1'>Top rated reviewer games</Heading>
              <Pie data={dataReviewerGames} />
            </Box>
            <Box my={10}>
              <Heading fontSize='h1'>Top rated user games</Heading>
              <Pie data={dataUserGames} />
            </Box>
          </HStack>
        </Box>
    );
}
