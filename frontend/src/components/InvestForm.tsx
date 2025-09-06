import React, { useState } from 'react';
import { TextField, Button, Stack, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

type Props = { onSubmit: (amount: number, durationMonths:number) => void };

export default function InvestForm({ onSubmit }: Props) {
  const [value, setValue] = useState('');
  const [duration, setDuration] = useState('12');
  return (
    <Stack spacing={2} direction="row" sx={{alignItems:'center', flexWrap:'wrap'}}>
      <TextField label="Amount (INR)" value={value} onChange={e=>setValue(e.target.value)} sx={{minWidth:200}} />
      <FormControl sx={{minWidth:140}}>
        <InputLabel id="dur-label">Duration</InputLabel>
        <Select labelId="dur-label" value={duration} label="Duration" onChange={e=>setDuration(String(e.target.value))}>
          <MenuItem value={'6'}>6 months</MenuItem>
          <MenuItem value={'12'}>1 year</MenuItem>
          <MenuItem value={'36'}>3 years</MenuItem>
          <MenuItem value={'60'}>5 years</MenuItem>
        </Select>
      </FormControl>
      <Button variant="contained" onClick={()=>onSubmit(Number(value) || 0, Number(duration))}>Suggest</Button>
    </Stack>
  );
}
