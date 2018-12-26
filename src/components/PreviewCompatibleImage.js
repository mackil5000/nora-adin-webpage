import React from 'react'
import PropTypes from 'prop-types'
import Img from 'gatsby-image'

const PreviewCompatibleImage = ({ imageInfo }) => {
  const { childImageSharp, image } = imageInfo

  if (!!image && !!image.childImageSharp) {
    return (
      <Img fluid={image.childImageSharp.fluid} className="img-fluid" alt="Nora Adin" />
    )
  }

  if (!!childImageSharp) {
    return <Img fluid={childImageSharp.fluid} className="img-fluid" alt="Nora Adin" />
  }

  if (!!image && typeof image === 'string')
    return <img src={image} className="img-fluid" alt="Nora Adin" />

  return null
}

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
    style: PropTypes.object,
  }).isRequired,
}

export default PreviewCompatibleImage
