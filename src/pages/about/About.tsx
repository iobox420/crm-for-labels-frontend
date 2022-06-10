import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAboutMe } from '@/redux/artist/getAboutMe'
const About = () => {
  const artist = useSelector(state => {
    // @ts-ignore
    return state.artist
  })
  const dispatch = useDispatch()
  useEffect(() => {
    // @ts-ignore
    dispatch(getAboutMe())
  }, [])
  if (!artist.isLoadingAboutMe) {
    return <>Loading</>
  }

  return <div>{JSON.stringify(artist.aboutMe)}</div>
}

export default About
