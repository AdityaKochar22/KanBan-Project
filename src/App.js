import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  AppBar,
  Toolbar,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import { RiArrowUpSLine, RiArrowDownSLine } from 'react-icons/ri';

const BASE_API_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [groupingOption, setGroupingOption] = useState('status');
  const [sortingOption, setSortingOption] = useState('priority');

  useEffect(() => {
    fetchData();
  }, [groupingOption, sortingOption]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${BASE_API_URL}/tickets`);
      setTickets(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleGroupingChange = (option) => {
    setGroupingOption(option);
  };

  const handleSortingChange = (option) => {
    setSortingOption(option);
  };

  const groupAndSortTickets = () => {
    let groupedTickets = [...tickets];

    if (groupingOption === 'status') {
      groupedTickets.sort((a, b) => a.status.localeCompare(b.status));
    } else if (groupingOption === 'user') {
      groupedTickets.sort((a, b) => a.user.localeCompare(b.user));
    } else if (groupingOption === 'priority') {
      groupedTickets.sort((a, b) => a.priority - b.priority);
    }

    if (sortingOption === 'priority') {
      groupedTickets.sort((a, b) => b.priority - a.priority);
    } else if (sortingOption === 'title') {
      groupedTickets.sort((a, b) => a.title.localeCompare(b.title));
    }

    return groupedTickets;
  };

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Kanban Board</Typography>
        </Toolbar>
      </AppBar>
      <Grid container spacing={2} style={{ marginTop: '20px' }}>
        <Grid item xs={12}>
          <div style={{ marginBottom: '20px' }}>
            <Button onClick={() => handleGroupingChange('status')}>Group by Status</Button>
            <Button onClick={() => handleGroupingChange('user')}>Group by User</Button>
            <Button onClick={() => handleGroupingChange('priority')}>Group by Priority</Button>
          </div>
          <div>
            <Button onClick={() => handleSortingChange('priority')}>
              Sort by Priority <RiArrowUpSLine />
            </Button>
            <Button onClick={() => handleSortingChange('title')}>
              Sort by Title <RiArrowDownSLine />
            </Button>
          </div>
        </Grid>
        {groupAndSortTickets().map((ticket) => (
          <Grid key={ticket.id} item xs={12} sm={6} md={4} lg={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">{ticket.title}</Typography>
                <Typography variant="subtitle1">Assigned to: {ticket.user}</Typography>
                <Typography variant="body2">Status: {ticket.status}</Typography>
                <Typography variant="body2">Priority: {ticket.priority}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default KanbanBoard;
