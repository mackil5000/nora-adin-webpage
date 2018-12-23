import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import PreviewCompatibleImage from "../components/PreviewCompatibleImage";




export default class IndexPage extends React.Component {



  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    const $magganLinks = document.querySelectorAll(`${post.frontmatter.id}`);
// Check if there are any navbar burgers
if ($magganLinks.length > 0) {
  // Add a click event on each of them
  $magganLinks.forEach(el => {
    el.addEventListener("mouseover", () => {
      el.classList.add("is-active");
    });
  });
    $magganLinks.forEach(el => {
    el.addEventListener("mouseout", () => {
      el.classList.remove("is-active");
    });
  });
}
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
                  <div
                    className="col-12 post-list"
                    
                    key={post.id}
                  >
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
              <div
                className="card-columns" // row
              >
                {posts.map(({ node: post }) => (
                  <div
                    className="card post-tile" //col-x-x
                    key={post.id}
                  >
                    <Link to={post.fields.slug}>
                      {/* <img
                        className="img-fluid"
                        style={{ borderRadius: "5px" }}
                        src={post.frontmatter.image}
                      /> */}
<PreviewCompatibleImage imageInfo={post.frontmatter.image} />

                    </Link>
                    <h4 className="card-heading">
                      <Link className="" to={post.fields.slug}>
                        {post.frontmatter.title}
                      </Link>
                      {/* <small>{post.frontmatter.date}</small> */}
                    </h4>
                    <p className="d-none d-md-block">
                      {/* {post.excerpt} */}
                      {/* <br />
                        <br /> */}
                      {/* <Link className="" to={post.fields.slug}> */}
                      {/* </Link> */}
                    </p>
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
      sort: { order: DESC, fields: [frontmatter___date] }
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
