export interface IArtist {
  id_artist_contract: number
  fk_id_user: number
  creative_pseudonym: string
  name_2: string
  name_1: string
  name_3: string
  document: string
  address: string
  email: string
  inn: string
  snils: string
  bank_details: string
  contract_number: string
  contract_agreement: string
  contract_fee: string
  contract_fee_in_words: string
  contract_expiration_date: string
  deleted: boolean
}
