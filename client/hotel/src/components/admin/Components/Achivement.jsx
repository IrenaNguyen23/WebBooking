import { Button, Card, CardContent, Typography, styled } from '@mui/material'
import React from 'react'

const TrignleImg = styled("img")({
    right: 0,
    bottom: 0,
    height: 170,
    position: "absolute"
})

const TrophyImg = styled("img")({
    right: 36,
    bottom: 20,
    height: 98,
    position: "absolute"
})

const Achivement = () => {
    return (
        <Card sx={{ position: "relative", bgcolor:"#242B2E",color:"white" }}>
            <CardContent>
                <Typography variant='h6' sx={{ letterSpacing: ".25px" }}>
                    Irene Hotel
                </Typography>
                <Typography variant='body2' >
                    Congratulations 😘
                </Typography>
                <Typography variant='h5' sx={{my:3.1}}>
                    429.8k
                </Typography>
                <Button size='small' variant='contained'>View Sales </Button>
                <TrignleImg src=''></TrignleImg>
                <TrophyImg src='https://static.vecteezy.com/system/resources/previews/026/772/685/large_2x/trophy-with-ai-generated-free-png.png'/>
            </CardContent>
        </Card>
    )
}

export default Achivement
