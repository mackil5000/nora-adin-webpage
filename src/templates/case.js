import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'
import Content, { HTMLContent } from '../components/Content'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'


export const CaseTemplate = ({
  content,
  contentComponent,
  description,
  heading,
  tags,
  title,
  helmet,
  introDescription,
  introHeading,
  cardImage,
}) => {
  const PostContent = contentComponent || Content

  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
        <div className="columns">
          <div className="column is-10 is-offset-1">
         <h2>{heading}</h2>
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p>{description}</p>
            <p>{introDescription}</p>
            <p>{introHeading}</p>
            <PreviewCompatibleImage imageInfo={cardImage} />
            <PostContent content={content} />
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag + `tag`}>
                      <Link to={`/tags/${kebabCase(tag)}/`}>{tag}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

CaseTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const Case = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <CaseTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        heading={post.frontmatter.heading}
        introDescription={post.frontmatter.intro.description}
        introHeading={post.frontmatter.intro.heading}
        cardImage={post.frontmatter.image}
        helmet={
          <Helmet
            titleTemplate="%s | Blog"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

Case.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default Case

export const pageQuery = graphql`
  query CaseByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
          image {
            id
          }
          title
          templateKey
          description
          heading
          date(formatString: "MMMM DD, YYYY")
          intro {
            image
            alt
            heading
            description
            intro
            plans {
              heading
              description
            }
          }
          tags
        }
    }
  }
`
