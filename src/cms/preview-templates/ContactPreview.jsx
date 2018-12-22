import React from 'react'
import PropTypes from 'prop-types'
import { ContactTemplate } from '../../templates/contact'

const ContactPreview = ({ entry, widgetFor }) => (
  <ContactTemplate
    title={entry.getIn(['data', 'title'])}
    content={widgetFor('body')}
  />
)

ContactPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default ContactPreview
