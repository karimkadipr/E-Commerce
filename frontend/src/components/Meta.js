import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keyword }) => {
  return (
    <div>
      <Helmet>
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta name='keyword' content={keyword} />
      </Helmet>
    </div>
  )
}
Meta.defaultProps = {
  title: 'Welcome to MyShop',
  description: 'best Shop !',
  keyword: 'High Quality , lower Price',
}

export default Meta
