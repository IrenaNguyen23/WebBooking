import { Grid } from '@mui/material'
import React from 'react'
import Achivement from './Achivement'
import MonthlyOverview from './MonthlyOverview'
import PopularRoom from './PopularRoom'

const AdminDashBoard = () => {
  return (
    <div className='p-5'>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Achivement/>
        </Grid>
        <Grid item xs={12} md={8}>
          <MonthlyOverview/>
        </Grid>
        <Grid item xs={12} md={12}>
          <PopularRoom/>
        </Grid>
      </Grid>
    </div>
  )
}

export default AdminDashBoard
