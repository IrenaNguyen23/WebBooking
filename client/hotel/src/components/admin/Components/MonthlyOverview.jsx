import React from 'react';
import { Card, CardHeader, CardContent, Grid, Box, Avatar, Typography, IconButton } from '@mui/material';
import { TrendingUp, AccountCircle, AttachMoneyOutlined, MoreVert as MoreVertIcon } from '@mui/icons-material';
import ApartmentIcon from '@mui/icons-material/Apartment';

const salesData = [
    {
        stats: "245K",
        title: "Sales",
        color: 'primary.main',
        icon: <TrendingUp sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: "12.5K",
        title: "Customer",
        color: 'success.main',
        icon: <AccountCircle sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: "1.54K",
        title: "Rooms",
        color: 'warning.main',
        icon: <ApartmentIcon sx={{ fontSize: "1.75rem" }} />
    },
    {
        stats: "48K",
        title: "Revenue",
        color: 'info.main',
        icon: <AttachMoneyOutlined sx={{ fontSize: "1.75rem" }} />
    }
];

const renderStats = () => {
    return salesData.map((item, index) => (
        <Grid item xs={12} sm={3} key={index}>
            <Box sx={{ display: "flex", alignItems: "center", mb:3.5 }}>
                <Avatar variant='rounded' sx={{
                    mr: 3,
                    width: 44,
                    height: 44,
                    boxShadow: 3,
                    color: "white",
                    backgroundColor: item.color
                }}>
                    {item.icon}
                </Avatar>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                    <Typography variant='caption' >{item.title}</Typography>
                    <Typography variant='h6'>{item.stats}</Typography>
                </Box>
            </Box>
        </Grid>
    ));
};

const MonthlyOverview = () => {
    return (
        <Card sx={{bgcolor:"#242B2E",color:"white" }}>
            <CardHeader
                title='Monthly Overview'
                action={
                    <IconButton size='small' color="inherit">
                        <MoreVertIcon />
                    </IconButton>
                }
                subheader={
                    <Typography variant='body2'>
                        <Box component="span" sx={{ fontWeight: 600}}>
                            Total 48.5% growth
                        </Box>
                        this Month
                    </Typography>
                }
                titleTypographyProps={{
                    sx: {
                        lineHeight: '2rem !important',
                        letterSpacing: '.15px !important'
                    }
                }}
            />
            <CardContent>
                <Grid container spacing={4}>
                    {renderStats()}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MonthlyOverview;
