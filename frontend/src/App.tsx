import React, {useState} from 'react';
import InvestForm from './components/InvestForm';
import ResultCard from './components/ResultCard';
import AllocationChart from './components/AllocationChart';
import axios from 'axios';
import { Container, Box, Grid, Typography, Button, IconButton, AppBar, Toolbar, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

function Navbar() {
  return (
    <AppBar position="static" color="inherit" elevation={0} sx={{borderBottom:'1px solid #e0e0e0', bgcolor:'#fff'}}>
      <Toolbar sx={{display:'flex', justifyContent:'space-between'}}>
        <Box sx={{display:'flex', alignItems:'center', gap:1}}>
          <Typography variant="h6" sx={{fontWeight:700, color:'#0b5cff'}}>Investify</Typography>
        </Box>
        <Box sx={{display:'flex', gap:2}}>
          <Link href="#" underline="none" sx={{color:'#333', fontWeight:500}}>Home</Link>
          <Link href="#" underline="none" sx={{color:'#333', fontWeight:500}}>Features</Link>
          <Link href="#" underline="none" sx={{color:'#333', fontWeight:500}}>About</Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

function Footer() {
  return (
    <Box sx={{bgcolor:'#f5f7fb', py:4, mt:8, borderTop:'1px solid #e0e0e0'}}>
      <Container sx={{display:'flex', flexDirection:'column', alignItems:'center'}}>
        <Typography variant="body2" color="text.secondary">© 2025 Investify. All rights reserved.</Typography>
        <Box sx={{mt:1, display:'flex', gap:2}}>
          <Link href="https://twitter.com/_groww" target="_blank" sx={{color:'#0b5cff'}}>Twitter</Link>
          <Link href="https://www.instagram.com/groww_official/" target="_blank" sx={{color:'#0b5cff'}}>Instagram</Link>
          <Link href="https://www.facebook.com/growwapp" target="_blank" sx={{color:'#0b5cff'}}>Facebook</Link>
        </Box>
      </Container>
    </Box>
  );
}

function App(){
  const [result,setResult] = useState<any>(null);
  const [loading,setLoading] = useState(false);
  const submit = async(amount:number, durationMonths:number)=>{
    try{
      setLoading(true);
      const res = await axios.post('/api/suggest',{amount, durationMonths});
      setResult(res.data);
    }catch(err){
      console.error(err);
      alert('Failed to get suggestions from backend');
    }finally{setLoading(false)}
  }
  const goHome = ()=>{ setResult(null) }
  return (
    <Box sx={{bgcolor:'#f5f7fb', minHeight:'100vh'}}>
      <Navbar />
      {/* Hero / Home */}
      {!result ? (
        <Box sx={{
          minHeight: '70vh',
          display: 'flex',
          alignItems: 'center',
          backgroundImage: `linear-gradient(90deg, #eaf6ff 0%, #f5f7fb 100%), url('https://assets-netstorage.groww.in/web-assets/billion_groww_desktop/prod/_next/static/media/cityScape.63faad02.svg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          color: '#222',
          p: {xs:2, md:6}
        }}>
          <Container>
            <Typography variant="h2" sx={{fontWeight:700, color:'#0b5cff', letterSpacing:'-1px'}}>Investify</Typography>
            <Typography variant="h5" sx={{mt:2, maxWidth:700, color:'#222'}}>
              India's smart investment advisor. Enter an amount in INR and duration to get a detailed, visual suggestion for maximizing your returns.
            </Typography>
            <Box sx={{mt:4, maxWidth:500}}>
              <InvestForm onSubmit={submit} />
            </Box>
            <Box sx={{mt:6, display:'flex', gap:3, flexWrap:'wrap'}}>
              <Box sx={{bgcolor:'#fff', p:3, borderRadius:2, boxShadow:1, maxWidth:340}}>
                <Typography variant="h6" color="primary">Fast suggestions</Typography>
                <Typography variant="body2" sx={{mt:1}}>Quick allocation based on simple risk heuristics.</Typography>
              </Box>
              <Box sx={{bgcolor:'#fff', p:3, borderRadius:2, boxShadow:1, maxWidth:340}}>
                <Typography variant="h6" color="primary">Clear visualizations</Typography>
                <Typography variant="body2" sx={{mt:1}}>See allocation and projected returns instantly.</Typography>
              </Box>
              <Box sx={{bgcolor:'#fff', p:3, borderRadius:2, boxShadow:1, maxWidth:340}}>
                <Typography variant="h6" color="primary">Professional design</Typography>
                <Typography variant="body2" sx={{mt:1}}>Modern, responsive UI inspired by India's top investment platforms.</Typography>
              </Box>
            </Box>
          </Container>
        </Box>
      ) : (
        <Container sx={{mt:4}}>
          <Box sx={{display:'flex', alignItems:'center', gap:2, mb:2}}>
            <IconButton onClick={goHome}><ArrowBackIcon /></IconButton>
            <Typography variant="h5">Suggestions for ₹{Number(result.total).toLocaleString('en-IN')}</Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <ResultCard title="Projected Value (INR)" value={`₹${Number(result.projected).toLocaleString('en-IN')}`} />
            </Grid>
            <Grid item xs={12} md={8}>
              <AllocationChart data={result.allocation} />
            </Grid>
          </Grid>
        </Container>
      )}
      <Footer />
    </Box>
  );
}

export default App;
