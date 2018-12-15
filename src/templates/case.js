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
  introImage,
  cardImage,
  svgImage,
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
            <PreviewCompatibleImage imageInfo={introImage} />
            <PreviewCompatibleImage imageInfo={svgImage} /> 

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
  // image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  image1: PropTypes.shape({
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  intro: PropTypes.shape({
    image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
  plans: PropTypes.shape({
    image3: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  }),
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
        cardImage={post.frontmatter.image1}
        introImage={post.frontmatter.intro.image2}
        svgImage={post.frontmatter.intro.plans.image3}
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
          templateKey
          title
          image1 {
            alt
            image {
              id
            }
          }
          description
          heading
          date(formatString: "MMMM DD, YYYY")
          intro {
            image2 {
              alt
              image {
                id
              }
            }
            description
            heading
            intro
            plans {
              image3 {
                alt
                image {
                  id
                }
              }
              description
              heading
            }
          }
          tags
        }
    }
  }
`
