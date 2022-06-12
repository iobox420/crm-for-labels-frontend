import React, { useEffect } from "react";
import { getAboutMe } from "@/redux/artist/getAboutMe";
import { Card, Space, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Loading from "@/components/Loading";

const { Title } = Typography;
const About = () => {
  const dispatch = useAppDispatch()
  const artist = useAppSelector(state => {
    return state.artist
  })
  const about = artist.aboutMe
  useEffect(() => {
    // @ts-ignore
    dispatch(getAboutMe())
  }, [])

  if (!artist.isLoadingAboutMe) {
    return <Loading />  }

  return <div>
    <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
      <Card title={about.creative_pseudonym} size="default">
        <Title level={5}>{about.name_2} {about.name_1} {about.name_3}</Title>
        <p>email: <b>{about.email}</b>  </p>
        <p>document: {about.document}</p>
        <p>address: {about.address}</p>
        <p>inn: {about.inn}</p>
        <p>snils: {about.snils}</p>
      </Card>

    </Space>
    </div>
}

export default About
