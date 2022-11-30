import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import  SideBar from './SideBar'
import  Videos from './Videos'

import {fetchFromAPI} from '../utils/FetchFromApi'


const Feed = () => {

  const [videos, setVideos] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('New')

  useEffect(() => {
    fetchFromAPI(`search?part=snippet&q=${selectedCategory}`).then(data => setVideos(data.items))
  }, [selectedCategory])

  return (
    <Stack sx={{ flexDirection: { sx: 'colum', md: 'row'}}}>
      <Box sx={{ height: {sx: 'auto', md: '92vh'}, borderRight: '1px solid #3d3d3d', px: {sx: 0, md: 2}}}>
        <SideBar selectedCategory={selectedCategory} setSelectedCategory ={setSelectedCategory} />
        <Typography className="copyright" variant="body2" sx={{ mt: 1.5, color: "#fff", }}>
        Copyright © 2022 Youtube
        </Typography>
      </Box>

      <Box p={2} sx={{ overflowY: "auto", height: "90vh", flex: 2 }}>
        <Typography variant="h4" fontWeight="bold" mb={2} sx={{ color: "white" }}>
          {selectedCategory} <span style={{ color: "#FC1503" }}>videos</span>
        </Typography>

        <Videos videos={videos} />
      </Box>
    </Stack>
  )
}

export default Feed