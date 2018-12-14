import React from 'react'
import PropTypes from 'prop-types'
import { CaseTemplate } from '../../templates/case.js'

const CasePreview = ({ entry, widgetFor }) => (
  <CaseTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
  />
)

CasePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default CasePreview
