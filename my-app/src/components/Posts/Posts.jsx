import { Component } from "react";
import { connect } from "react-redux";
import { createPostAction } from "../../store/actions/PostActions";

class Posts extends Component {
  onCreatePost() {
    this.props.createPost();
  }

  render() {
    const posts = [];

    // for (let post of this.props.posts) {
    //   posts.push(<div key={post.id}>{post.title}</div>);
    // }
    return (
      <div>
        <h2 className="bold">Post</h2>
        <button onClick={this.onCreatePost.bind(this)} />
        <div>{posts}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    posts: state.posts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: () => dispatch(createPostAction()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Posts);
