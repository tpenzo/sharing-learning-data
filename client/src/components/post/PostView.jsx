import React from "react";
import CommentList from "./CommentList";
function PostView(){
    return (
        <div className="h-full scroll-smooth">
            <section id="post" className="post-content h-screen">

            </section>
            <hr />
            <section id="comment" className="comment h-screen">
                <CommentList />
            </section>
        </div>
    )
}

export default PostView;