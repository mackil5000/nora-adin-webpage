import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  description,
  tags,
  title,
  helmet,
  image
}) => {
  const PostContent = contentComponent || Content;

  return (
    <div className="container-fluid">
      {helmet || ""}
      <div className="row">
        <div className="col-xl-6">
          <div
            className="heading-wrapper"
            style={{ marginLeft: "auto", width: "500px" }}
          >
            <h1 className="blog-heading">{title}</h1>
            <p className="intro-text">{description}</p>
          </div>
        </div>
        <div
          style={{
            backgroundImage: `url(${image})`,
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "contain"
          }}
          className="col-xl-6"
        />
        <div
          style={{ marginTop: "100px" }}
          className="col-md-9 col-lg-8 col-xl-5 mx-auto"
        >
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
  );
};

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  image: PropTypes.string,
  helmet: PropTypes.object
};

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        image={post.frontmatter.image}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  );
};

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object
  })
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 730, quality: 64) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        tags
      }
    }
  }
`;
