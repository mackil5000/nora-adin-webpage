import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        <div
          className="container-fluid"
          style={{
            marginTop: "80px"
          }}
        >
          <div className="row">
            <div
              className="col-lg-3 d-none d-lg-block"
              style={{
                position: "fixed",
                left: "0"
              }}
            >
              <div className="row">
                <div className="col-12">
                  <h1 className="text-white">Senaste inläggen</h1>
                </div>
                {posts.map(({ node: post }) => (
                  <div className="col-12 post-list" key={post.id}>
                    <ul>
                      <li>
                        <Link
                          className="has-text-primary"
                          id={post.fields.slug}
                          to={post.fields.slug}
                        >
                          {post.frontmatter.title}
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="col-lg-9"
              style={{
                position: "absolute",
                right: "0"
              }}
            >
              <div className="card-columns">
                {posts.map(({ node: post }) => (
                  <div className="card post-tile" key={post.id}>
                    <Link to={post.fields.slug}>
                      <PreviewCompatibleImage
                        imageInfo={post.frontmatter.image}
                      />
                    </Link>
                    <p className="card-heading">
                      <Link style={{ fontSize: '16px'}} className="" to={post.fields.slug}>
                        {post.frontmatter.title}
                      </Link>
                    </p>
                    <p className="d-none d-md-block" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: ASC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            image {
              childImageSharp {
                fluid(maxWidth: 730, quality: 64) {
                  ...GatsbyImageSharpFluid
                }
              }
              id
            }
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`;
