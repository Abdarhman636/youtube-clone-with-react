import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import Videos  from "./Videos";
import ChannelCard from "./ChannelCard";
import { fetchFromAPI } from "../utils/FetchFromApi";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState(null)
  const [videos, setVideos] = useState([])
  
  const {id} = useParams()

  console.log(channelDetail)

  // const options = {
  //   method: 'GET',
  //   headers: {
  //     'X-RapidAPI-Key': '96b2a1043dmsh48fbba061c41e20p1bf2f4jsn67c54943429c',
  //     'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com'
  //   }
  // };
  

  useEffect(() => {
    fetchFromAPI(`channels?part=snippet%2Cstatistics&id=${id}`)
    .then(response => setChannelDetail(response?.items[0]))
    .catch(err => console.error(err));


    fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`)
    .then(response => setVideos(response?.items))
    .catch(err => console.error(err));

  }, [id]);
  

  return (
    <Box minHeight="95vh">
            <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
        <Box  sx={{ mr: { sm: '100px' } }} />
        <Videos videos={videos} />
      </Box>
    </Box>
  )
}

export default ChannelDetail