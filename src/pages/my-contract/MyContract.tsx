import React, { useEffect } from "react";
import { getAboutMe } from "@/redux/artist/getAboutMe";
import { Card, Space, Typography } from "antd";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import Loading from "@/components/Loading";
const { Title } = Typography;

const MyContract = () => {
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
/*  bank_details(pin):"to phone number 8034523124"
  contract_number(pin):"DMG 61/21"
  contract_agreement(pin):"2022-01-01T00:00:00.000Z"
  contract_fee(pin):"50"
  contract_fee_in_words(pin):"50 procent"
  contract_expiration_date(pin):"2025-01-01T00:00:00.000Z"
  deleted(pin):false*/
  return <div>
    <Space direction="vertical" size="middle" style={{ display: 'flex', margin: '10px' }}>
      <Card title={`ЛИЦЕНЗИОННЫЙ ДОГОВОР № ${about.contract_number}`} size="default">
        <p>contract agreement: <b>{about.contract_agreement}</b>  </p>
        <p>contract fee: {about.contract_fee}</p>
        <p>contract fee_in_words: {about.contract_fee_in_words}</p>
        <p>contract expiration_date: {about.contract_expiration_date}</p>
      </Card>
    </Space>
  </div>
}

export default MyContract
