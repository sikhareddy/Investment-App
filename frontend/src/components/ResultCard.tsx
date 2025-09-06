import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export default function ResultCard({ title, value }:{title:string,value:string}){
  return (
    <Card sx={{minWidth:240, bgcolor:'background.paper', boxShadow:2}}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">{title}</Typography>
        <Typography variant="h4" sx={{mt:1, fontWeight:700, color:'primary.main'}}>{value}</Typography>
      </CardContent>
    </Card>
  )
}
